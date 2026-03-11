import { motion } from 'framer-motion'

export default function ScoreBar({ team1, team2 }) {
  const total = Math.max(team1.score + team2.score, 1)
  const t1Pct = (team1.score / total) * 100
  const t2Pct = (team2.score / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-arena-neon shadow-green" />
          <span className="font-outfit font-bold text-arena-neon text-sm sm:text-base">{team1.name}</span>
          <motion.span
            key={team1.score}
            initial={{ scale: 1.5, color: '#00f0ff' }}
            animate={{ scale: 1, color: '#e2e8f0' }}
            className="font-outfit font-bold text-lg sm:text-xl"
          >
            {team1.score}
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={team2.score}
            initial={{ scale: 1.5, color: '#a855f7' }}
            animate={{ scale: 1, color: '#e2e8f0' }}
            className="font-outfit font-bold text-lg sm:text-xl"
          >
            {team2.score}
          </motion.span>
          <span className="font-outfit font-bold text-arena-purple text-sm sm:text-base">{team2.name}</span>
          <div className="w-3 h-3 rounded-full bg-arena-purple shadow-purple" />
        </div>
      </div>

      {/* Score bar */}
      <div className="relative w-full h-3 rounded-full overflow-hidden bg-arena-card border border-arena-border">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-l-full"
          style={{ background: 'linear-gradient(90deg, #00f0ff, #0ea5e9)' }}
          animate={{ width: `${t1Pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full rounded-r-full"
          style={{ background: 'linear-gradient(90deg, #8b5cf6, #a855f7)' }}
          animate={{ width: `${t2Pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
