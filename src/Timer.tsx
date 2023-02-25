import { useEffect, useMemo, useState } from "react"
import { Dice } from "./models/DiceModel"
interface Props {
  tenzies: boolean
  dice: Dice[]
  saveTime: (time: number) => void
  time: number
  setTime: React.Dispatch<React.SetStateAction<number>>
  running: boolean
  setRunning: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Timer({
  tenzies,
  dice,
  saveTime,
  time,
  setTime,
  running,
  setRunning,
}: Props) {
  useEffect(() => {
    console.log("hu")
    if (tenzies) {
      setRunning(false)
      saveTime(time)
    }

    if (!running && dice.some((el) => el.isHeld === true)) {
      setRunning(true)
    }
  }, [tenzies, dice])

  let interval: ReturnType<typeof setInterval>
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
