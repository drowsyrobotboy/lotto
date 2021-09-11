import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';

export default function Home(): JSX.Element {

  if (process.browser) {
    // Client-side-only code
    window.onbeforeunload = function() {
      return "Data will be lost if you leave the page, are you sure?";
    };
  }

  const [lottoNumber, setLottoNumber] = useState(0);
  const [marked, setMarked] = useState([0]);

  function assignRandomNumber():number{
    let randomNumber = (Math.round(Math.random()*100))%91;
    let newMarkedArray = marked.slice(0);
    if(marked.indexOf(randomNumber)==-1 && randomNumber!=-1){
      newMarkedArray.push(randomNumber);
      setMarked(newMarkedArray);
      return randomNumber;
    } else if(marked.length<91) {
      console.log("wrong Random Number Generated");
      return assignRandomNumber();
    } else { 
      console.log("Game Over");
      return -1;
    }
  }

  function isMarked(num:number):boolean{
    return ((marked.indexOf(num)==-1)? false : true);
  }

  function handlePick():void{
    let ln:number = assignRandomNumber();
    setLottoNumber(ln);
    console.log(marked);
  }

  function LtRows(props: { index: number; }){
    let j:number = props.index;
        return(
            <tr key={j}>
                <td className={(isMarked(j))?"has-text-light has-background-dark":""}>{j}</td>
                <td className={(isMarked(j+1))?"has-text-light has-background-dark":""}>{j+1}</td>
                <td className={(isMarked(j+2))?"has-text-light has-background-dark":""}>{j+2}</td>
                <td className={(isMarked(j+3))?"has-text-light has-background-dark":""}>{j+3}</td>
                <td className={(isMarked(j+4))?"has-text-light has-background-dark":""}>{j+4}</td>
                <td className={(isMarked(j+5))?"has-text-light has-background-dark":""}>{j+5}</td>
                <td className={(isMarked(j+6))?"has-text-light has-background-dark":""}>{j+6}</td>
                <td className={(isMarked(j+7))?"has-text-light has-background-dark":""}>{j+7}</td>
                <td className={(isMarked(j+8))?"has-text-light has-background-dark":""}>{j+8}</td>
                <td className={(isMarked(j+9))?"has-text-light has-background-dark":""}>{j+9}</td>
            </tr>
        );
  }
  
  function LottoTable() {
    return(
        <table className="table is-fullwidth lt-table">
            <tbody>
                <LtRows index={1}/>
                <LtRows index={11}/>
                <LtRows index={21}/>
                <LtRows index={31}/>
                <LtRows index={41}/>
                <LtRows index={51}/>
                <LtRows index={61}/>
                <LtRows index={71}/>
                <LtRows index={81}/>
            </tbody>
        </table>   
    )
  }

  return (
    <div className="lt-container">
      <Head>
        <title>Lotto</title>
        <meta name="description" content="Quick Lotto Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item has-text-info is-size-4" href=".">
            Lotto
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-info is-size-3" onClick={() => handlePick()}>
                <strong>{(lottoNumber==0)?'Pick Number':(lottoNumber==-1)?'Game Over':'Current Number: ' + lottoNumber}</strong>
              </a>
            </div>
          </div>
    </div>
      </nav>
      <section className="section">
        <div className="container is-fluid has-text-centered">
        <div className="table-container">
            <LottoTable />
        </div>
        </div>
      </section>
    </div>
  )
}
