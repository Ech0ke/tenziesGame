import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import { Dice } from "./models/DiceModel"
import "./style.css"
import Lottie from "lottie-react"
import Hand from "./models/hand.json"
import Timer from "./Timer"
import TimeDisplay from "./TimeDisplay"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState<boolean>(false)
  const [rolls, setRolls] = useState<number>(0)
  const [bestTime, setBestTime] = useState<number>(999999999999)

  const [time, setTime] = useState(0)
  const [running, setRunning] = useState<boolean>(false)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  useEffect(() => {})
  function randomDieValue(): number {
    return Math.ceil(Math.random() * 6)
  }
  function allNewDice() {
    const diceArray: Dice[] = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: randomDieValue(),
        isHeld: false,
        id: i + 1,
      })
    }
    return diceArray
  }

  function rollDice() {
    if (!tenzies && dice.every((die) => die.isHeld === false) && time == 0) {
      setRolls(0)
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: randomDieValue() }
        )
      )
    } else if (!tenzies) {
      setRolls(rolls + 1)

      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: randomDieValue() }
        )
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
    }
  }

  function holdDice(id: number) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    )
  }

  function saveTime(time: number) {
    setTimeout(() => {
      if (time < bestTime) {
        setBestTime(time)
      }
    }, 100)
  }

  function resetTime() {
    setTime(0)
  }

  function restartGame() {
    setRunning(false)
    setTime(0)
    setDice(allNewDice())
    setRolls(0)
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti className="confetti" />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the <u>same</u>. Click each die to freeze it at
        its current value between rolls.
      </p>
      <div className="win-wrapper">
        <div className="dice-container">{diceElements}</div>
        <div>
          {tenzies && (
            <>
              <span className="win">You won!</span>{" "}
              <Lottie className="hand" animationData={Hand} loop={true} />{" "}
            </>
          )}
        </div>
      </div>
      <div className="buttons">
        <button onClick={rollDice} className="roll-dice">
          {tenzies ? (
            <span onClick={resetTime}>New Game</span>
          ) : (
            <span>Roll dice</span>
          )}
        </button>
        {!tenzies && time != 0 && (
          <button onClick={restartGame} className="reset-dice">
            <span>Restart</span>
          </button>
        )}
      </div>
      <div className="details">
        <div className="rolls">
          Number of rolls: <b>{rolls}</b>
        </div>
        <div className="stopwatch">
          <Timer
            tenzies={tenzies}
            dice={dice}
            saveTime={(e) => saveTime(e)}
            time={time}
            setTime={setTime}
            running={running}
            setRunning={setRunning}
          />
        </div>
        <div className="bestTime">
          {bestTime === 999999999999 ? (
            <>Best time: 00:00:00 </>
          ) : (
            <>
              Best time: <TimeDisplay time={bestTime} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
