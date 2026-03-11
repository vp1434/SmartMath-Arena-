import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaStar, FaBolt, FaCrown } from 'react-icons/fa'
import { getLeaderboard } from '../utils/storage'

const tabs = [
  { id: 'all', label: 'All Time', icon: <FaStar /> },
  { id: 'today', label: 'Today', icon: <FaBolt /> },
  { id: 'week', label: 'This Week', icon: <FaTrophy /> },
]

const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32'] // gold, silver, bronze
const rankIcons = [
  <FaCrown className="text-lg" />,
  <FaMedal className="text-lg" />,
  <FaMedal className="text-lg" />,
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('all')
  const leaderboard = getLeaderboard()

  const filtered = useMemo(() => {
    const now = new Date()
    return leaderboard.filter(entry => {
      if (activeTab === 'all') return true
      const date = new Date(entry.date)
      if (activeTab === 'today') {
        return date.toDateString() === now.toDateString()
      }
      if (activeTab === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return date >= weekAgo
      }
      return true
    })
  }, [leaderboard, activeTab])

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  }

  return (
    <div className="page-enter pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm text-arena-gold font-medium">
            <FaTrophy />
            Rankings
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl text-white mb-2">
            <span className="gradient-text-gold">Leaderboard</span>
          </h1>
          <p className="text-gray-400">See who's dominating the arena</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-outfit font-semibold text-sm transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-arena-gold/10 text-arena-gold border border-arena-gold/30 shadow-gold'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-12 text-center"
            >
              <FaTrophy className="text-5xl text-gray-700 mx-auto mb-4" />
              <h3 className="font-outfit font-bold text-xl text-gray-400 mb-2">No Rankings Yet</h3>
              <p className="text-gray-600 text-sm">Play a game to appear on the leaderboard!</p>
            </motion.div>
          ) : (
            filtered.map((entry, i) => (
              <motion.div
                key={entry.id || i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className={`glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${
                  i < 3 ? 'neon-border' : ''
                }`}
                style={i < 3 ? {
                  borderColor: `${rankColors[i]}40`,
                  boxShadow: `0 0 20px ${rankColors[i]}15`,
                } : {}}
              >
                {/* Rank */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-black text-sm shrink-0"
                  style={i < 3 ? {
                    backgroundColor: `${rankColors[i]}20`,
                    color: rankColors[i],
                  } : {
                    backgroundColor: 'rgba(30,41,59,0.5)',
                    color: '#64748b',
                  }}
                >
                  {i < 3 ? rankIcons[i] : i + 1}
                </div>

                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-arena-dark text-sm shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${
                      i === 0 ? '#f59e0b, #d97706' :
                      i === 1 ? '#94a3b8, #64748b' :
                      i === 2 ? '#cd7f32, #a0522d' :
                      '#00f0ff, #a855f7'
                    })`,
                  }}
                >
                  {entry.name?.charAt(0)?.toUpperCase() || '?'}
                </div>

                {/* Name & date */}
                <div className="flex-1 min-w-0">
                  <div className="font-outfit font-bold text-white truncate">{entry.name}</div>
                  <div className="text-xs text-gray-500">
                    {entry.date ? new Date(entry.date).toLocaleDateString() : '—'}
                  </div>
                </div>

                {/* Accuracy */}
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-400">{entry.accuracy ?? 0}%</div>
                  <div className="text-xs text-gray-600">accuracy</div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="font-outfit font-black text-xl" style={{ color: i < 3 ? rankColors[i] : '#e2e8f0' }}>
                    {entry.score}
                  </div>
                  <div className="text-xs text-gray-600">pts</div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
