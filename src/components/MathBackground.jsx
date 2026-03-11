import { useMemo } from 'react'

const SYMBOLS = ['+', '−', '×', '÷', '=', '%', '√', 'π', '∑', '∞', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function MathBackground() {
  const items = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 1 + Math.random() * 2,
    }))
  }, [])

  return (
    <div className="math-bg">
      {items.map((item, i) => (
        <span
          key={i}
          className="math-symbol"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}rem`,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  )
}
