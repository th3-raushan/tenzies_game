import { useState, useEffect } from "react"



export default function App(){
  const [diceData, setDiceData]= useState([
    { id:0, value:3, shouldRoll: true},
    { id:1, value:3, shouldRoll: true},
    { id:2, value:3, shouldRoll: true},
    { id:3, value:3, shouldRoll: true},
    { id:4, value:3, shouldRoll: true},
    { id:5, value:3, shouldRoll: true},
    { id:6, value:3, shouldRoll: true},
    { id:7, value:3, shouldRoll: true},
    { id:8, value:3, shouldRoll: true},
    { id:9, value:3, shouldRoll: true}
  ]);
  
  function roll(){
    setDiceData( prevData=>( prevData.map( data=>(
      data.shouldRoll? {...data, value: Math.floor(Math.random()*6+1)}:data
    ))))
    
  }
  let count=0;

  function toggle(id){
    setDiceData( prevData=>(
      prevData.map( data=>(
        data.id==id? {...data, shouldRoll: !data.shouldRoll}: data
      ))
    ))
    count++;
  }

  if( count==4){
    console.log("game completed");
  }
  

  const diceHtml= diceData.map( data=>(
    <button key={data.id} onClick={()=>toggle(data.id)} className={ data.shouldRoll? "":"naah"}>{data.value}</button>
  ))

  return(
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click<br />each dice to freeze it at its current value<br />between rolls.</p>
      <div className="dice-container">
        {diceHtml}
      </div>
      <button id="roll-button" onClick={roll}>Roll</button>
    </main>
  )
}