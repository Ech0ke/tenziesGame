import { Dice } from "./models/DiceModel"

export default function Die({
  value,
  isHeld,
  holdDice,
}: {
  value: number
  isHeld: boolean
  holdDice: () => void
}) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  }
  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <h2 className="die-num">{value}</h2>
    </div>
  )
}
