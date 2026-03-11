import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AnswerButtons({ options, correctAnswer, onAnswer, disabled }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const handleClick = (option) => {
    if (disabled || revealed) return
    setSelected(option)
    setRevealed(true)

    const isCorrect = option === correctAnswer
    
    // Small delay for visual feedback before moving to next question
    setTimeout(() => {
      onAnswer(option, isCorrect)
      setSelected(null)
      setRevealed(false)
    }, 800)
  }

  const getButtonStyle = (option) => {
    if (!revealed) {
      return 'bg-arena-card border-arena-border hover:border-arena-neon/50 hover:bg-arena-neon/5 hover:shadow-neon/10 text-white'
    }
    if (option === correctAnswer) {
      return 'bg-green-500/20 border-green-500 text-green-400 shadow-green'
    }
    if (option === selected && option !== correctAnswer) {
      return 'bg-red-500/20 border-red-500 text-red-400 shadow-red animate-shake'
    }
    return 'bg-arena-card/50 border-arena-border/50 text-gray-600'
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {options.map((option, index) => (
        <motion.button
          key={`${option}-${index}`}
          whileHover={!disabled && !revealed ? { scale: 1.03 } : {}}
          whileTap={!disabled && !revealed ? { scale: 0.97 } : {}}
          onClick={() => handleClick(option)}
          disabled={disabled || revealed}
          className={`
            relative p-4 sm:p-6 rounded-xl border-2 font-outfit font-bold text-xl sm:text-2xl
            transition-all duration-300 cursor-pointer
            ${getButtonStyle(option)}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {/* Option letter */}
          <span className="absolute top-2 left-3 text-xs font-inter font-medium text-gray-500">
            {String.fromCharCode(65 + index)}
          </span>
          {option}
          
          {/* Correct/Wrong icon */}
          {revealed && option === correctAnswer && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-3 text-green-400"
            >
              ✓
            </motion.span>
          )}
          {revealed && option === selected && option !== correctAnswer && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-3 text-red-400"
            >
              ✗
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  )
}
