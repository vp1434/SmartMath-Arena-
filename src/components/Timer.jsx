import { useEffect, useState } from 'react'

export default function Timer({ timeLeft, maxTime, onTimeout, size = 120 }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const progress = timeLeft / maxTime
  const offset = circumference * (1 - progress)

  const getColor = () => {
    if (progress > 0.5) return '#22c55e'
    if (progress > 0.25) return '#f59e0b'
    return '#ef4444'
  }

  const getGlow = () => {
    if (progress > 0.5) return 'drop-shadow(0 0 8px rgba(34,197,94,0.5))'
    if (progress > 0.25) return 'drop-shadow(0 0 8px rgba(245,158,11,0.5))'
    return 'drop-shadow(0 0 12px rgba(239,68,68,0.7))'
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90" style={{ filter: getGlow() }}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(30,41,59,0.5)"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="timer-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-outfit font-bold transition-colors duration-300"
          style={{ fontSize: size * 0.3, color: getColor() }}
        >
          {timeLeft}
        </span>
        <span className="text-gray-500 text-xs font-medium">sec</span>
      </div>
    </div>
  )
}
