import { useEffect, useMemo, useState } from "react"
import { Dice } from "./models/DiceModel"
interface Props {
  tenzies: boolean
  dice: Dice[]
  saveTime: (time: number) => void
  setRolls: React.Dispatch<React.SetStateAction<number>>
}

export default function Timer({ tenzies, dice, saveTime, setRolls }: Props) {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [gameStart, setGameStart] = useState(false)

  useEffect(() => {
    console.log("hu")
    if (tenzies) {
      setRunning(false)
      setGameStart(false)
      saveTime(time)
    } else if (!tenzies && dice.every((el) => el.isHeld === false)) {
      setTime(0)
      setRolls(0)
      setRunning(false)
      setGameStart(false)
    }

    if (!gameStart && dice.some((el) => el.isHeld === true)) {
      setRunning(true)
      setGameStart(true)
    }
  }, [tenzies, dice])

  let interval: number
  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running])
  return (
    <div>
      <span>
        <i>Time: </i>
      </span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
    </div>
  )
}
