import { motion } from 'framer-motion'
import { getCategoryIcon, getCategoryColor } from '../utils/questionGenerator'

export default function QuestionCard({ question, category, difficulty, questionNumber, totalQuestions }) {
  const color = getCategoryColor(category)
  const icon = getCategoryIcon(category)

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-card p-6 sm:p-8 text-center"
    >
      {/* Header badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </span>
          <span className="text-sm font-medium text-gray-400 capitalize">{category}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {questionNumber}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="py-4">
        <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed">
          {question}
        </h2>
      </div>
    </motion.div>
  )
}
