import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaChartBar, FaGamepad, FaUsers, FaTrophy, FaBullseye,
  FaPlay, FaDownload, FaTrash, FaCalendarAlt
} from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi'
import { getAnalytics, getGameHistory, getLeaderboard, clearAllData } from '../utils/storage'

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0)

  const analytics = useMemo(() => getAnalytics(), [refreshKey])
  const history = useMemo(() => getGameHistory(), [refreshKey])
  const leaderboard = useMemo(() => getLeaderboard(), [refreshKey])

  const handleClearData = () => {
    if (window.confirm('Are you sure? This will clear all game data.')) {
      clearAllData()
      setRefreshKey(k => k + 1)
    }
  }

  const handleExport = () => {
    const data = {
      exportDate: new Date().toISOString(),
      analytics,
      gameHistory: history,
      leaderboard,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smartmath-arena-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const statCards = [
    { label: 'Total Games', value: analytics.totalGames, icon: <FaGamepad />, color: '#00f0ff' },
    { label: 'Total Players', value: analytics.totalPlayers, icon: <FaUsers />, color: '#a855f7' },
    { label: 'Avg Accuracy', value: `${analytics.avgAccuracy}%`, icon: <FaBullseye />, color: '#22c55e' },
    { label: 'Top Scorer', value: analytics.topScorer?.name || '—', icon: <FaTrophy />, color: '#f59e0b' },
  ]

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  }

  // Difficulty distribution for mini chart
  const totalDiff = analytics.difficultyCount.easy + analytics.difficultyCount.medium + analytics.difficultyCount.hard || 1
  const diffData = [
    { label: 'Easy', value: analytics.difficultyCount.easy, color: '#22c55e', pct: Math.round((analytics.difficultyCount.easy / totalDiff) * 100) },
    { label: 'Medium', value: analytics.difficultyCount.medium, color: '#f59e0b', pct: Math.round((analytics.difficultyCount.medium / totalDiff) * 100) },
    { label: 'Hard', value: analytics.difficultyCount.hard, color: '#ef4444', pct: Math.round((analytics.difficultyCount.hard / totalDiff) * 100) },
  ]

  return (
    <div className="page-enter pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-3 text-sm text-arena-green font-medium">
              <HiAcademicCap />
              Teacher Dashboard
            </div>
            <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white">
              Dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <Link to="/setup" className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
              <FaPlay /> New Game
            </Link>
            <button onClick={handleExport} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
              <FaDownload /> Export
            </button>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="glass-card p-5 group hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 transition-all duration-300"
                style={{ backgroundColor: `${card.color}15`, color: card.color }}
              >
                {card.icon}
              </div>
              <div className="font-outfit font-black text-2xl text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Difficulty Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-outfit font-bold text-white mb-4 flex items-center gap-2">
              <FaChartBar className="text-arena-purple" />
              Difficulty Distribution
            </h3>
            <div className="space-y-4">
              {diffData.map(d => (
                <div key={d.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium" style={{ color: d.color }}>{d.label}</span>
                    <span className="text-sm text-gray-500">{d.value} games ({d.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-arena-card overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${d.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mini donut */}
            <div className="flex items-center justify-center mt-6">
              <svg width="100" height="100" viewBox="0 0 100 100">
                {diffData.reduce((acc, d, i) => {
                  const prevOffset = acc.offset
                  const dashLen = (d.pct / 100) * 251.3 // circumference = 2 * PI * 40
                  acc.elements.push(
                    <circle
                      key={d.label}
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={d.color}
                      strokeWidth="8"
                      strokeDasharray={`${dashLen} ${251.3 - dashLen}`}
                      strokeDashoffset={-prevOffset}
                      transform="rotate(-90 50 50)"
                      opacity={0.8}
                    />
                  )
                  acc.offset += dashLen
                  return acc
                }, { elements: [], offset: 0 }).elements}
                <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="font-outfit font-bold" fill="white" fontSize="16">
                  {analytics.totalGames}
                </text>
                <text x="50" y="65" textAnchor="middle" fill="#64748b" fontSize="8">
                  games
                </text>
              </svg>
            </div>
          </motion.div>

          {/* Recent Games */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <h3 className="font-outfit font-bold text-white mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-arena-neon" />
              Recent Games
            </h3>
            {history.length === 0 ? (
              <div className="text-center py-10">
                <FaGamepad className="text-4xl text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">No games played yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-arena-border">
                      <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                      <th className="text-left py-2 text-gray-500 font-medium">Teams</th>
                      <th className="text-left py-2 text-gray-500 font-medium">Score</th>
                      <th className="text-left py-2 text-gray-500 font-medium">Difficulty</th>
                      <th className="text-left py-2 text-gray-500 font-medium">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 10).map((game, i) => (
                      <tr key={game.id || i} className="border-b border-arena-border/30 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 text-gray-400">
                          {game.date ? new Date(game.date).toLocaleDateString() : '—'}
                        </td>
                        <td className="py-3 text-white font-medium">
                          {game.team1?.name} vs {game.team2?.name}
                        </td>
                        <td className="py-3">
                          <span className="text-arena-neon font-bold">{game.team1?.score}</span>
                          <span className="text-gray-600 mx-1">-</span>
                          <span className="text-arena-purple font-bold">{game.team2?.score}</span>
                        </td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            game.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                            game.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {game.difficulty}
                          </span>
                        </td>
                        <td className="py-3 font-outfit font-bold text-arena-gold">
                          {game.winner}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Stats + Danger Zone */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="font-outfit font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Questions Asked</span>
                <span className="font-outfit font-bold text-white">{analytics.totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Correct Answers</span>
                <span className="font-outfit font-bold text-arena-green">{analytics.totalCorrect}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Overall Accuracy</span>
                <span className="font-outfit font-bold text-arena-neon">{analytics.avgAccuracy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Top Scorer Points</span>
                <span className="font-outfit font-bold text-arena-gold">{analytics.topScorer?.score || 0}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-outfit font-bold text-white mb-4">Data Management</h3>
            <p className="text-gray-400 text-sm mb-4">
              Export your data as JSON or clear all saved data. This action cannot be undone.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-arena-neon/10 text-arena-neon border border-arena-neon/20 hover:border-arena-neon/40 transition-all font-medium text-sm cursor-pointer"
              >
                <FaDownload /> Export Report (JSON)
              </button>
              <button
                onClick={handleClearData}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all font-medium text-sm cursor-pointer"
              >
                <FaTrash /> Clear All Data
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
