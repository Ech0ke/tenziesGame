import { useEffect, useMemo, useState } from "react"
import { Dice } from "./models/DiceModel"
import TimeDisplay from "./TimeDisplay"
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
    if (tenzies) {
      setRunning(false)
      saveTime(time)
    }

    if (!running && dice.some((el) => el.isHeld === true)) {
      setRunning(true)
    }
  }, [tenzies, dice, time])

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
      <TimeDisplay time={time} />
    </div>
  )
}
