import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGamepad, FaUsers, FaCog, FaPlay, FaPlus, FaMinus } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'

export default function GameSetup() {
  const navigate = useNavigate()
  const [config, setConfig] = useState({
    team1Name: 'Team Alpha',
    team2Name: 'Team Beta',
    difficulty: 'medium',
    rounds: 10,
    timePerQuestion: 15,
  })

  const difficulties = [
    { value: 'easy', label: 'Easy', desc: 'Single digit numbers', color: '#22c55e', emoji: '🌱' },
    { value: 'medium', label: 'Medium', desc: 'Double digit numbers', color: '#f59e0b', emoji: '⚡' },
    { value: 'hard', label: 'Hard', desc: 'Triple digits + word problems', color: '#ef4444', emoji: '🔥' },
  ]

  const handleStart = () => {
    // Store config in sessionStorage so GameArena can read it
    sessionStorage.setItem('gameConfig', JSON.stringify(config))
    navigate('/play')
  }

  return (
    <div className="page-enter pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm text-arena-neon font-medium">
            <FaCog className="animate-spin" style={{ animationDuration: '3s' }} />
            Game Setup
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl text-white mb-3">
            Configure Your <span className="gradient-text">Battle</span>
          </h1>
          <p className="text-gray-400">Set up teams, difficulty, and rounds to begin</p>
        </motion.div>

        <div className="space-y-6">
          {/* Team Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaUsers className="text-arena-neon" />
              <h3 className="font-outfit font-bold text-white">Team Names</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Team 1</label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.team1Name}
                    onChange={(e) => setConfig({ ...config, team1Name: e.target.value })}
                    className="w-full bg-arena-deeper border-2 border-arena-neon/30 rounded-xl px-4 py-3 text-white font-outfit font-semibold focus:outline-none focus:border-arena-neon focus:shadow-neon transition-all duration-300"
                    placeholder="Enter team name"
                    maxLength={20}
                  />
                  <div className="absolute left-0 top-0 w-1 h-full bg-arena-neon rounded-l-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Team 2</label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.team2Name}
                    onChange={(e) => setConfig({ ...config, team2Name: e.target.value })}
                    className="w-full bg-arena-deeper border-2 border-arena-purple/30 rounded-xl px-4 py-3 text-white font-outfit font-semibold focus:outline-none focus:border-arena-purple focus:shadow-purple transition-all duration-300"
                    placeholder="Enter team name"
                    maxLength={20}
                  />
                  <div className="absolute left-0 top-0 w-1 h-full bg-arena-purple rounded-l-xl" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <HiLightningBolt className="text-arena-gold" />
              <h3 className="font-outfit font-bold text-white">Difficulty Level</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {difficulties.map(d => (
                <button
                  key={d.value}
                  onClick={() => setConfig({ ...config, difficulty: d.value })}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${
                    config.difficulty === d.value
                      ? 'border-opacity-100 scale-105'
                      : 'border-arena-border hover:border-opacity-50 opacity-60 hover:opacity-80'
                  }`}
                  style={{
                    borderColor: config.difficulty === d.value ? d.color : undefined,
                    backgroundColor: config.difficulty === d.value ? `${d.color}10` : 'transparent',
                    boxShadow: config.difficulty === d.value ? `0 0 20px ${d.color}30` : 'none',
                  }}
                >
                  <span className="text-2xl block mb-1">{d.emoji}</span>
                  <span className="font-outfit font-bold text-sm text-white block">{d.label}</span>
                  <span className="text-xs text-gray-500 block mt-1">{d.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Rounds & Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaGamepad className="text-arena-pink" />
              <h3 className="font-outfit font-bold text-white">Game Settings</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Rounds */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block">Number of Rounds</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setConfig({ ...config, rounds: Math.max(3, config.rounds - 1) })}
                    className="w-10 h-10 rounded-lg bg-arena-card border border-arena-border flex items-center justify-center text-gray-400 hover:text-white hover:border-arena-neon transition-all cursor-pointer"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="font-outfit font-black text-3xl text-white w-12 text-center">
                    {config.rounds}
                  </span>
                  <button
                    onClick={() => setConfig({ ...config, rounds: Math.min(30, config.rounds + 1) })}
                    className="w-10 h-10 rounded-lg bg-arena-card border border-arena-border flex items-center justify-center text-gray-400 hover:text-white hover:border-arena-neon transition-all cursor-pointer"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block">Seconds Per Question</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setConfig({ ...config, timePerQuestion: Math.max(5, config.timePerQuestion - 5) })}
                    className="w-10 h-10 rounded-lg bg-arena-card border border-arena-border flex items-center justify-center text-gray-400 hover:text-white hover:border-arena-neon transition-all cursor-pointer"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="font-outfit font-black text-3xl text-white w-12 text-center">
                    {config.timePerQuestion}
                  </span>
                  <button
                    onClick={() => setConfig({ ...config, timePerQuestion: Math.min(60, config.timePerQuestion + 5) })}
                    className="w-10 h-10 rounded-lg bg-arena-card border border-arena-border flex items-center justify-center text-gray-400 hover:text-white hover:border-arena-neon transition-all cursor-pointer"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleStart}
              className="w-full btn-primary text-xl py-5 flex items-center justify-center gap-3 rounded-2xl"
            >
              <FaPlay />
              Start Battle!
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
