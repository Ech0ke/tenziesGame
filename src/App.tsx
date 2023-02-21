import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import { Dice } from "./models/DiceModel"
import "./style.css"
import Lottie from "lottie-react"
import Hand from "./models/hand.json"
import Timer from "./Timer"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState<boolean>(false)
  const [rolls, setRolls] = useState<number>(0)
  const [bestTime, setBestTime] = useState<number>(999999999999)

  const [time, setTime] = useState(0)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won")
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
    if (!tenzies) {
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
    console.log(id)
  }

  function saveTime(time: number) {
    if (time < bestTime) {
      setBestTime(time)
    }
  }

  function resetTime() {
    setTime(0)
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
      {tenzies && <Confetti />}
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

      <button onClick={rollDice} className="roll-dice">
        {tenzies ? (
          <span onClick={resetTime}>New Game</span>
        ) : (
          <span>Roll dice</span>
        )}
      </button>
      <div className="details">
        <div className="rolls">
          Number of rolls: <b>{rolls}</b>
        </div>
        <div className="stopwatch">
          <Timer
            tenzies={tenzies}
            dice={dice}
            saveTime={saveTime}
            setRolls={setRolls}
            time={time}
            setTime={setTime}
          />
        </div>
        <div className="bestTime">
          {bestTime === 999999999999 ? (
            <>Best time: 00:00:00 </>
          ) : (
            <>
              Best time:{" "}
              <span>
                {("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
              </span>
              <span>
                {("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:
              </span>
              <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
