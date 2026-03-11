import { motion, AnimatePresence } from 'framer-motion'
import { FaTrophy, FaMedal, FaStar, FaRedo, FaHome, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function GameOverModal({ team1, team2, onPlayAgain }) {
  const winner = team1.score > team2.score ? team1 : team2.score > team1.score ? team2 : null
  const isDraw = team1.score === team2.score

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(6, 11, 22, 0.9)', backdropFilter: 'blur(10px)' }}
      >
        {/* Confetti particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#00f0ff', '#a855f7', '#f59e0b', '#ec4899', '#22c55e'][i % 5],
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
            animate={{
              y: [0, window.innerHeight + 20],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, Math.random() * 720],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: 'easeIn',
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="glass-card neon-border p-8 sm:p-10 max-w-md w-full text-center relative"
        >
          {/* Trophy */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl mb-4"
          >
            <FaTrophy className="mx-auto text-arena-gold" />
          </motion.div>

          {/* Result Text */}
          <h2 className="font-outfit font-black text-3xl sm:text-4xl mb-2">
            {isDraw ? (
              <span className="gradient-text">It's a Draw!</span>
            ) : (
              <>
                <span className="gradient-text">{winner?.name}</span>
                <br />
                <span className="text-white/80 text-2xl">Wins!</span>
              </>
            )}
          </h2>

          {/* Scores */}
          <div className="flex justify-center items-center gap-8 my-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 font-medium mb-1">{team1.name}</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-4xl font-outfit font-black text-arena-neon"
              >
                {team1.score}
              </motion.div>
            </div>
            <div className="text-2xl text-gray-600 font-outfit font-bold">VS</div>
            <div className="text-center">
              <div className="text-sm text-gray-400 font-medium mb-1">{team2.name}</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="text-4xl font-outfit font-black text-arena-purple"
              >
                {team2.score}
              </motion.div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="glass-card-light px-4 py-2 flex items-center gap-2">
              <FaStar className="text-arena-gold text-sm" />
              <span className="text-xs text-gray-400">
                {team1.correct + team2.correct} correct
              </span>
            </div>
            <div className="glass-card-light px-4 py-2 flex items-center gap-2">
              <FaMedal className="text-arena-neon text-sm" />
              <span className="text-xs text-gray-400">
                {team1.totalAnswered + team2.totalAnswered} answered
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onPlayAgain} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <FaRedo /> Play Again
            </button>
            <Link to="/leaderboard" className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <FaChartBar /> Leaderboard
            </Link>
          </div>
          <Link to="/" className="block mt-3 text-sm text-gray-500 hover:text-gray-300 transition-colors">
            <FaHome className="inline mr-1" /> Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
