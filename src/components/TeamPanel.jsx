import { motion, AnimatePresence } from 'framer-motion'

export default function TeamPanel({ team, question, answer, onKeyPress, onSubmit, onClear, disabled, feedback, isLeft }) {
  const teamColor = isLeft ? '#3b82f6' : '#ef4444'
  const teamGradient = isLeft
    ? 'from-blue-600 via-blue-500 to-cyan-400'
    : 'from-red-600 via-red-500 to-orange-400'
  const teamBg = isLeft
    ? 'rgba(59, 130, 246, 0.05)'
    : 'rgba(239, 68, 68, 0.05)'
  const teamBorder = isLeft
    ? 'rgba(59, 130, 246, 0.2)'
    : 'rgba(239, 68, 68, 0.2)'
  const teamGlow = isLeft
    ? '0 0 40px rgba(59, 130, 246, 0.15)'
    : '0 0 40px rgba(239, 68, 68, 0.15)'

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null]

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center h-full p-3 sm:p-4 md:p-6 rounded-2xl relative overflow-hidden"
      style={{
        background: teamBg,
        border: `1px solid ${teamBorder}`,
        boxShadow: teamGlow,
      }}
    >
      {/* Decorative gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${teamGradient}`} />

      {/* Team Name */}
      <motion.h2
        className={`font-outfit font-black text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 bg-gradient-to-r ${teamGradient} bg-clip-text text-transparent`}
      >
        {team.name}
      </motion.h2>

      {/* Score */}
      <motion.div
        key={team.score}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className="mb-3 sm:mb-4"
      >
        <span className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl" style={{ color: teamColor }}>
          {team.score}
        </span>
        <span className="text-gray-500 text-xs sm:text-sm ml-2">pts</span>
      </motion.div>

      {/* Question Box */}
      <div
        className="w-full rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-center"
        style={{
          background: 'rgba(17, 24, 39, 0.6)',
          border: `1px solid ${teamBorder}`,
        }}
      >
        <span className="text-xs text-gray-500 block mb-1">Question</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={question?.question}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-outfit font-bold text-xl sm:text-2xl md:text-3xl text-white"
          >
            {question?.question || '—'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Display Box */}
      <div
        className={`w-full rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-center relative overflow-hidden transition-all duration-300 ${
          feedback === 'correct' ? 'ring-2 ring-green-500' :
          feedback === 'wrong' ? 'ring-2 ring-red-500 animate-shake' : ''
        }`}
        style={{
          background: feedback === 'correct' ? 'rgba(34, 197, 94, 0.1)' :
                      feedback === 'wrong' ? 'rgba(239, 68, 68, 0.1)' :
                      'rgba(17, 24, 39, 0.8)',
          border: `2px solid ${
            feedback === 'correct' ? '#22c55e' :
            feedback === 'wrong' ? '#ef4444' :
            teamBorder
          }`,
        }}
      >
        <span className="text-xs text-gray-500 block mb-1">Your Answer</span>
        <div className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl min-h-[2.5rem] sm:min-h-[3rem]" style={{ color: answer ? 'white' : 'rgba(100,116,139,0.3)' }}>
          {answer || '?'}
        </div>

        {/* Feedback overlay */}
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1 right-2 text-green-400 text-lg sm:text-2xl font-bold"
            >
              ✓ Correct!
            </motion.div>
          )}
          {feedback === 'wrong' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1 right-2 text-red-400 text-lg sm:text-2xl font-bold"
            >
              ✗ Wrong!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Number Keypad */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full mb-3 sm:mb-4">
        {keys.map((key, i) => (
          key !== null ? (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="py-2.5 sm:py-3 md:py-4 rounded-xl font-outfit font-bold text-lg sm:text-xl md:text-2xl transition-all duration-200 cursor-pointer"
              style={{
                background: 'rgba(17, 24, 39, 0.7)',
                border: `1px solid ${teamBorder}`,
                color: disabled ? '#4a5568' : 'white',
                opacity: disabled ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.borderColor = teamColor
                  e.currentTarget.style.boxShadow = `0 0 15px ${teamColor}30`
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = teamBorder
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {key}
            </motion.button>
          ) : (
            <div key={`empty-${i}`} />
          )
        ))}
      </div>

      {/* Submit & Cancel Buttons */}
      <div className="flex gap-2 sm:gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          disabled={disabled}
          className="flex-1 py-2.5 sm:py-3 md:py-4 rounded-xl font-outfit font-bold text-base sm:text-lg flex items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          ❌ <span className="hidden sm:inline">Clear</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          disabled={disabled || !answer}
          className="flex-[2] py-2.5 sm:py-3 md:py-4 rounded-xl font-outfit font-bold text-base sm:text-lg flex items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer"
          style={{
            background: disabled || !answer ? 'rgba(34, 197, 94, 0.05)' : `linear-gradient(135deg, ${teamColor}, ${isLeft ? '#06b6d4' : '#f97316'})`,
            border: `1px solid ${disabled || !answer ? 'rgba(34, 197, 94, 0.2)' : teamColor}`,
            color: disabled || !answer ? '#4a5568' : '#0a0e1a',
            opacity: disabled || !answer ? 0.5 : 1,
          }}
        >
          ✔️ <span className="hidden sm:inline">Submit</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
