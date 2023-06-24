
import { useEffect, useState } from "react";
import Die from "./Die";

export default function App()
{
    const [dice,setDice] = useState(allnewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rollCount, setRollCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        const firstValue = dice[0].value
        const allHeld = dice.every(die => die.isHeld)
        const allSameNumber = dice.every(die => die.value === firstValue)
        if(allHeld && allSameNumber) {
            setTenzies(true)
            setEndTime(Date.now());
        }
    },[dice])

    function generatenewDie()
    {
        return{
            value:Math.ceil(Math.random()*6),
            id: crypto.randomUUID(),
            isHeld : false
        }
    }
    function allnewDice()
    {
        const newArray = []
        for(let i=0;i<10;i++)
        {
            newArray.push(generatenewDie())
        }
        return newArray
    }

    function rollDice()
    {
        if(!tenzies)
        {
            if (rollCount === 0) {
                setStartTime(Date.now());
              }

            setDice(oldDice => oldDice.map(die =>
                {
                    return die.isHeld ? die : generatenewDie()
                }))
                setRollCount(prevCount => prevCount+1)
        }
        else
        {
            setDice(allnewDice())
            setTenzies(false)
            setRollCount(1)
            setStartTime(null);
            setEndTime(null);
        }
    }
    function holdDice(id)
    {
        setDice(prevDice => (
            prevDice.map((die) =>{
                return die.id === id ?
                {...die, isHeld: !die.isHeld} : die
        })
        ))
    }

    const calculateTimeToWin = () => {
        if (startTime && endTime) {
          const timeInSeconds = Math.floor((endTime - startTime) / 1000);
          const minutes = Math.floor(timeInSeconds / 60);
          const seconds = timeInSeconds % 60;
          return `${minutes} minutes and ${seconds} seconds`;
        }
      };

    const diceElements = dice.map((die)=>
    (
       <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        hold={()=> holdDice(die.id)}
       />
    ))
    return(
        <>
        <main>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceElements}
            </div> 
            {tenzies ? <h5>Total number of rolls: {rollCount}</h5> : ""}
            {tenzies ? <h5>Time taken to win: {calculateTimeToWin()}</h5> : ""}       
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "Reset Game" : "Roll"}
            </button>
        </main>
        </>
    )
} 