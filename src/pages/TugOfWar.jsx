import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import TeamPanel from '../components/TeamPanel'
import TugCharacter from '../components/TugCharacter'
import { saveToLeaderboard, saveGameHistory } from '../utils/storage'
import { FaPlay, FaCog, FaTrophy, FaRedo, FaHome, FaFire } from 'react-icons/fa'

// ============ QUESTION GENERATOR ============
function generateMathQuestion(difficulty = 'medium') {
  const ops = ['+', '−', '×', '÷']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a, b, answer

  const range = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 25 : 50

  switch (op) {
    case '+':
      a = Math.floor(Math.random() * range) + 1
      b = Math.floor(Math.random() * range) + 1
      answer = a + b
      break
    case '−':
      a = Math.floor(Math.random() * range) + 1
      b = Math.floor(Math.random() * a) + 1
      answer = a - b
      break
    case '×':
      a = Math.floor(Math.random() * 12) + 1
      b = Math.floor(Math.random() * 12) + 1
      answer = a * b
      break
    case '÷':
      b = Math.floor(Math.random() * 11) + 2
      answer = Math.floor(Math.random() * 12) + 1
      a = b * answer
      break
  }

  return { question: `${a} ${op} ${b} = ?`, answer }
}

// ============ CHARACTER EMOJIS ============
const CHARACTERS = ['🦁', '🐯', '🐻', '🦊', '🐼', '🦄', '🐲', '🦅']
const CELEBRATIONS = ['🎉', '🎊', '✨', '💫', '⭐', '🌟', '🏆', '💯']

export default function TugOfWar() {
  // ======= GAME STATES =======
  const [gamePhase, setGamePhase] = useState('setup') // setup | countdown | playing | gameover
  const [difficulty, setDifficulty] = useState('medium')
  const [totalRounds, setTotalRounds] = useState(10)
  const [currentRound, setCurrentRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(30)
  const [maxTime, setMaxTime] = useState(30)
  const [countdownValue, setCountdownValue] = useState(3)
  const timerRef = useRef(null)

  // Team state
  const [team1, setTeam1] = useState({ name: 'Team 1', score: 0, correct: 0, wrong: 0 })
  const [team2, setTeam2] = useState({ name: 'Team 2', score: 0, correct: 0, wrong: 0 })

  // Questions (each team gets their own)
  const [q1, setQ1] = useState(null)
  const [q2, setQ2] = useState(null)

  // Answer input
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  // Lock after submit
  const [locked1, setLocked1] = useState(false)
  const [locked2, setLocked2] = useState(false)

  // Visual feedback
  const [feedback1, setFeedback1] = useState(null)
  const [feedback2, setFeedback2] = useState(null)

  // Who answered first this round (for speed bonus)
  const firstAnswerRef = useRef(null)

  // Tug position (-50 to +50 range, beyond = instant win)
  const [tugPosition, setTugPosition] = useState(0)
  const TUG_WIN_THRESHOLD = 50

  // Win reason
  const [winReason, setWinReason] = useState('') // 'flag' | 'rounds' | 'time'

  // Celebration particles
  const [particles, setParticles] = useState([])

  // ======= SETUP CONFIG =======
  const [setupTeam1Name, setSetupTeam1Name] = useState('Team 1')
  const [setupTeam2Name, setSetupTeam2Name] = useState('Team 2')

  // ======= START GAME =======
  const startGame = () => {
    setTeam1({ name: setupTeam1Name || 'Team 1', score: 0, correct: 0, wrong: 0 })
    setTeam2({ name: setupTeam2Name || 'Team 2', score: 0, correct: 0, wrong: 0 })
    setCurrentRound(1)
    setTugPosition(0)
    setWinReason('')
    setGamePhase('countdown')
    setCountdownValue(3)
  }

  // ======= COUNTDOWN =======
  useEffect(() => {
    if (gamePhase !== 'countdown') return
    if (countdownValue <= 0) {
      setGamePhase('playing')
      newRound()
      return
    }
    const t = setTimeout(() => setCountdownValue(v => v - 1), 1000)
    return () => clearTimeout(t)
  }, [gamePhase, countdownValue])

  // ======= NEW ROUND =======
  const newRound = useCallback(() => {
    const question1 = generateMathQuestion(difficulty)
    const question2 = generateMathQuestion(difficulty)
    setQ1(question1)
    setQ2(question2)
    setAnswer1('')
    setAnswer2('')
    setLocked1(false)
    setLocked2(false)
    setFeedback1(null)
    setFeedback2(null)
    firstAnswerRef.current = null
    setTimeLeft(maxTime)
  }, [difficulty, maxTime])

  // ======= TIMER =======
  useEffect(() => {
    if (gamePhase !== 'playing') return
    if (timeLeft <= 0) {
      handleTimeUp()
      return
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timerRef.current)
  }, [gamePhase, timeLeft])

  const handleTimeUp = () => {
    // If team hasn't answered, mark as wrong
    if (!locked1) {
      setFeedback1('wrong')
      setTeam1(prev => ({ ...prev, wrong: prev.wrong + 1 }))
    }
    if (!locked2) {
      setFeedback2('wrong')
      setTeam2(prev => ({ ...prev, wrong: prev.wrong + 1 }))
    }
    setLocked1(true)
    setLocked2(true)

    setTimeout(() => advanceRound(), 2000)
  }

  // ======= KEY PRESS =======
  const handleKeyPress1 = (key) => {
    if (locked1) return
    setAnswer1(prev => {
      if (prev.length >= 5) return prev
      return prev + key.toString()
    })
  }
  const handleKeyPress2 = (key) => {
    if (locked2) return
    setAnswer2(prev => {
      if (prev.length >= 5) return prev
      return prev + key.toString()
    })
  }

  // ======= CLEAR =======
  const handleClear1 = () => { if (!locked1) setAnswer1('') }
  const handleClear2 = () => { if (!locked2) setAnswer2('') }

  // ======= SUBMIT =======
  const handleSubmit1 = () => {
    if (locked1 || !answer1) return
    setLocked1(true)

    const isCorrect = parseInt(answer1) === q1.answer
    setFeedback1(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      const isFirst = !firstAnswerRef.current
      firstAnswerRef.current = firstAnswerRef.current || 1
      const points = isFirst ? 2 : 1
      setTeam1(prev => ({ ...prev, score: prev.score + points, correct: prev.correct + 1 }))
      setTugPosition(prev => {
        const newPos = prev - points * 7
        return Math.max(-TUG_WIN_THRESHOLD, newPos)
      })
      spawnParticles('left')
    } else {
      setTeam1(prev => ({ ...prev, wrong: prev.wrong + 1 }))
      setTugPosition(prev => {
        const newPos = prev + 4
        return Math.min(TUG_WIN_THRESHOLD, newPos)
      })
    }

    // If both teams submitted, advance
    if (locked2) {
      setTimeout(() => advanceRound(), 2000)
    }
  }

  const handleSubmit2 = () => {
    if (locked2 || !answer2) return
    setLocked2(true)

    const isCorrect = parseInt(answer2) === q2.answer
    setFeedback2(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      const isFirst = !firstAnswerRef.current
      firstAnswerRef.current = firstAnswerRef.current || 2
      const points = isFirst ? 2 : 1
      setTeam2(prev => ({ ...prev, score: prev.score + points, correct: prev.correct + 1 }))
      setTugPosition(prev => {
        const newPos = prev + points * 7
        return Math.min(TUG_WIN_THRESHOLD, newPos)
      })
      spawnParticles('right')
    } else {
      setTeam2(prev => ({ ...prev, wrong: prev.wrong + 1 }))
      setTugPosition(prev => {
        const newPos = prev - 4
        return Math.max(-TUG_WIN_THRESHOLD, newPos)
      })
    }

    if (locked1) {
      setTimeout(() => advanceRound(), 2000)
    }
  }

  // ======= FLAG PULL WIN CHECK =======
  useEffect(() => {
    if (gamePhase !== 'playing') return
    if (tugPosition <= -TUG_WIN_THRESHOLD) {
      // Team 1 pulled the flag to their side!
      setWinReason('flag')
      endGame()
    } else if (tugPosition >= TUG_WIN_THRESHOLD) {
      // Team 2 pulled the flag to their side!
      setWinReason('flag')
      endGame()
    }
  }, [tugPosition, gamePhase])

  // ======= ADVANCE ROUND =======
  const advanceRound = useCallback(() => {
    if (currentRound >= totalRounds) {
      setWinReason('rounds')
      endGame()
      return
    }
    setCurrentRound(r => r + 1)
    newRound()
  }, [currentRound, totalRounds, newRound])

  // ======= END GAME =======
  const endGame = () => {
    clearTimeout(timerRef.current)
    setGamePhase('gameover')

    // Save data
    saveToLeaderboard({ name: team1.name, score: team1.score, accuracy: (team1.correct + team1.wrong) > 0 ? Math.round((team1.correct / (team1.correct + team1.wrong)) * 100) : 0 })
    saveToLeaderboard({ name: team2.name, score: team2.score, accuracy: (team2.correct + team2.wrong) > 0 ? Math.round((team2.correct / (team2.correct + team2.wrong)) * 100) : 0 })
    saveGameHistory({
      team1: { name: team1.name, score: team1.score },
      team2: { name: team2.name, score: team2.score },
      difficulty,
      rounds: totalRounds,
      totalQuestions: totalRounds * 2,
      totalCorrect: team1.correct + team2.correct,
      winner: team1.score > team2.score ? team1.name : team2.score > team1.score ? team2.name : 'Draw',
    })
  }

  // ======= PARTICLES =======
  const spawnParticles = (side) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      emoji: CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)],
      x: side === 'left' ? 20 + Math.random() * 20 : 60 + Math.random() * 20,
      delay: Math.random() * 0.3,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 2000)
  }

  // Timer color
  const timerColor = timeLeft > maxTime * 0.5 ? '#22c55e' : timeLeft > maxTime * 0.25 ? '#f59e0b' : '#ef4444'
  const timerGlow = timeLeft > maxTime * 0.5 ? 'rgba(34,197,94,0.3)' : timeLeft > maxTime * 0.25 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.5)'

  // ==================== SETUP SCREEN ====================
  if (gamePhase === 'setup') {
    return (
      <div className="page-enter pt-20 sm:pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="text-6xl mb-4"
            >
              🔥
            </motion.div>
            <h1 className="font-outfit font-black text-4xl sm:text-5xl mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                Tug of War
              </span>
            </h1>
            <p className="text-gray-400">Two teams. One arena. Who's the math champion?</p>
          </div>

          <div className="glass-card p-6 space-y-5">
            {/* Team Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-blue-400 font-medium mb-1 block">🔵 Team 1</label>
                <input
                  type="text"
                  value={setupTeam1Name}
                  onChange={e => setSetupTeam1Name(e.target.value)}
                  className="w-full bg-arena-deeper border-2 border-blue-500/30 rounded-xl px-4 py-3 text-white font-outfit font-semibold focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Team 1"
                  maxLength={15}
                />
              </div>
              <div>
                <label className="text-sm text-red-400 font-medium mb-1 block">🔴 Team 2</label>
                <input
                  type="text"
                  value={setupTeam2Name}
                  onChange={e => setSetupTeam2Name(e.target.value)}
                  className="w-full bg-arena-deeper border-2 border-red-500/30 rounded-xl px-4 py-3 text-white font-outfit font-semibold focus:outline-none focus:border-red-500 transition-all"
                  placeholder="Team 2"
                  maxLength={15}
                />
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-sm text-gray-400 font-medium mb-2 block">Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'easy', emoji: '🌱', label: 'Easy' },
                  { val: 'medium', emoji: '⚡', label: 'Medium' },
                  { val: 'hard', emoji: '🔥', label: 'Hard' },
                ].map(d => (
                  <button
                    key={d.val}
                    onClick={() => setDifficulty(d.val)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${
                      difficulty === d.val
                        ? 'border-arena-neon bg-arena-neon/10 scale-105'
                        : 'border-arena-border opacity-60 hover:opacity-80'
                    }`}
                  >
                    <span className="text-xl block">{d.emoji}</span>
                    <span className="text-xs font-outfit font-bold text-white">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rounds & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 font-medium mb-1 block">Rounds</label>
                <div className="flex items-center gap-3 justify-center">
                  <button onClick={() => setTotalRounds(r => Math.max(3, r - 1))} className="w-8 h-8 rounded-lg bg-arena-card border border-arena-border text-gray-400 hover:text-white transition-colors cursor-pointer">−</button>
                  <span className="font-outfit font-black text-2xl text-white w-8 text-center">{totalRounds}</span>
                  <button onClick={() => setTotalRounds(r => Math.min(30, r + 1))} className="w-8 h-8 rounded-lg bg-arena-card border border-arena-border text-gray-400 hover:text-white transition-colors cursor-pointer">+</button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 font-medium mb-1 block">Time (sec)</label>
                <div className="flex items-center gap-3 justify-center">
                  <button onClick={() => { setMaxTime(t => Math.max(10, t - 5)); setTimeLeft(t => Math.max(10, t - 5)) }} className="w-8 h-8 rounded-lg bg-arena-card border border-arena-border text-gray-400 hover:text-white transition-colors cursor-pointer">−</button>
                  <span className="font-outfit font-black text-2xl text-white w-8 text-center">{maxTime}</span>
                  <button onClick={() => { setMaxTime(t => Math.min(60, t + 5)); setTimeLeft(t => Math.min(60, t + 5)) }} className="w-8 h-8 rounded-lg bg-arena-card border border-arena-border text-gray-400 hover:text-white transition-colors cursor-pointer">+</button>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startGame}
              className="w-full py-4 rounded-xl font-outfit font-black text-xl text-white cursor-pointer flex items-center justify-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ef4444)',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
              }}
            >
              <FaPlay /> Start Battle!
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ==================== COUNTDOWN ====================
  if (gamePhase === 'countdown') {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={countdownValue}
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {countdownValue > 0 ? (
              <div className="font-outfit font-black text-9xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {countdownValue}
              </div>
            ) : (
              <div className="font-outfit font-black text-7xl text-arena-neon animate-pulse">FIGHT!</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // ==================== GAME OVER ====================
  if (gamePhase === 'gameover') {
    const winner = team1.score > team2.score ? team1 : team2.score > team1.score ? team2 : null
    const isDraw = team1.score === team2.score
    const winnerColor = winner === team1 ? '#3b82f6' : winner === team2 ? '#ef4444' : '#a855f7'

    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        {/* Confetti */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="fixed text-2xl"
            style={{ left: `${Math.random() * 100}%`, top: '-30px' }}
            animate={{
              y: [0, window.innerHeight + 50],
              x: [(Math.random() - 0.5) * 300],
              rotate: [0, Math.random() * 720],
              opacity: [1, 0],
            }}
            transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 1 }}
          >
            {CELEBRATIONS[i % CELEBRATIONS.length]}
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="glass-card p-8 sm:p-10 max-w-md w-full text-center relative"
          style={{ border: `1px solid ${winnerColor}40`, boxShadow: `0 0 40px ${winnerColor}20` }}
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-7xl mb-4"
          >
            🏆
          </motion.div>

          <h2 className="font-outfit font-black text-3xl sm:text-4xl mb-2">
            {isDraw ? (
              <span style={{ color: '#a855f7' }}>It's a Draw!</span>
            ) : (
              <>
                <span style={{ color: winnerColor }}>{winner?.name}</span>
                <br />
                <span className="text-white/70 text-2xl">Wins!</span>
              </>
            )}
          </h2>
          {/* Win reason badge */}
          {winReason === 'flag' && !isDraw && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-outfit font-bold"
              style={{ background: `${winnerColor}20`, color: winnerColor, border: `1px solid ${winnerColor}40` }}
            >
              🚩 Flag Pulled! Instant Victory!
            </motion.div>
          )}
          {winReason === 'rounds' && !isDraw && (
            <div className="text-sm text-gray-500 mb-4 font-outfit">All {totalRounds} rounds completed</div>
          )}

          {/* Score comparison */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-blue-400 font-medium mb-1">{team1.name}</div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="font-outfit font-black text-4xl text-blue-400">{team1.score}</motion.div>
              <div className="text-xs text-gray-500 mt-1">{team1.correct} correct</div>
            </div>
            <div className="font-outfit font-bold text-xl text-gray-600">VS</div>
            <div className="text-center">
              <div className="text-sm text-red-400 font-medium mb-1">{team2.name}</div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="font-outfit font-black text-4xl text-red-400">{team2.score}</motion.div>
              <div className="text-xs text-gray-500 mt-1">{team2.correct} correct</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setGamePhase('setup')} className="flex-1 py-3 rounded-xl font-outfit font-bold flex items-center justify-center gap-2 cursor-pointer" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ef4444)', color: 'white' }}>
              <FaRedo /> Play Again
            </button>
            <Link to="/leaderboard" className="flex-1 py-3 rounded-xl font-outfit font-bold flex items-center justify-center gap-2 border border-arena-gold/30 text-arena-gold hover:bg-arena-gold/10 transition-colors">
              <FaTrophy /> Leaderboard
            </Link>
          </div>
          <Link to="/" className="block mt-4 text-sm text-gray-500 hover:text-gray-300 transition-colors">
            <FaHome className="inline mr-1" /> Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  // ==================== PLAYING ====================
  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Celebration particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="fixed text-3xl pointer-events-none z-50"
            style={{ left: `${p.x}%`, bottom: '30%' }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -200 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: p.delay }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main 3-column layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 max-w-[1600px] mx-auto w-full">

        {/* ===== LEFT: Team 1 ===== */}
        <div className="flex-1 min-w-0">
          <TeamPanel
            team={team1}
            question={q1}
            answer={answer1}
            onKeyPress={handleKeyPress1}
            onSubmit={handleSubmit1}
            onClear={handleClear1}
            disabled={locked1}
            feedback={feedback1}
            isLeft={true}
          />
        </div>

        {/* ===== CENTER: Arena ===== */}
        <div className="lg:w-72 xl:w-80 flex lg:flex-col items-center justify-center gap-3 sm:gap-4 py-2 lg:py-4 order-first lg:order-none">
          
          {/* Round */}
          <div className="glass-card-light px-3 py-1.5 sm:px-4 sm:py-2 text-center">
            <span className="text-xs text-gray-500">Round</span>
            <div className="font-outfit font-black text-lg sm:text-xl text-white">
              {currentRound}<span className="text-gray-600">/{totalRounds}</span>
            </div>
          </div>

          {/* Timer */}
          <div className="relative">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(30,41,59,0.5)" strokeWidth="5" />
              <circle
                cx="50" cy="50" r="42"
                fill="none" stroke={timerColor} strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - timeLeft / maxTime)}
                className="transform -rotate-90 origin-center transition-all duration-1000 linear"
                style={{ filter: `drop-shadow(0 0 10px ${timerGlow})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-outfit font-black text-2xl sm:text-3xl" style={{ color: timerColor }}>{timeLeft}</span>
              <span className="text-[10px] text-gray-500">sec</span>
            </div>
          </div>

          {/* ====== TUG OF WAR CHARACTER SCENE ====== */}
          <div className="w-full relative overflow-hidden rounded-xl" style={{ background: 'rgba(17, 24, 39, 0.4)', minHeight: '180px' }}>
            
            {/* Center dashed line (stays fixed) */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] border-l-2 border-dashed border-gray-600/30 z-20" />

            {/* Ground surface */}
            <div className="absolute bottom-3 left-4 right-4 h-[3px] rounded-full" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.3), rgba(100,116,139,0.3), rgba(239,68,68,0.3))' }} />

            {/* The entire scene shifts based on tugPosition */}
            <motion.div
              className="relative flex items-end justify-center px-4 py-2"
              animate={{ x: tugPosition * 2.5 }}
              transition={{ type: 'spring', damping: 10, stiffness: 80 }}
              style={{ minHeight: '170px' }}
            >
              {/* Team 1 Character (left side, pulls LEFT) */}
              <div className="relative">
                <TugCharacter
                  teamColor="#3b82f6"
                  isLeft={true}
                  isWinning={team1.score > team2.score}
                  isPulling={gamePhase === 'playing'}
                />
                {/* Floating +points for Team 1 */}
                <AnimatePresence>
                  {feedback1 === 'correct' && (
                    <motion.div
                      key={`fb1-${currentRound}-${team1.score}`}
                      initial={{ opacity: 1, y: 10, scale: 0.5 }}
                      animate={{ opacity: 0, y: -50, scale: 2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-green-400 font-outfit font-black text-xl z-30"
                      style={{ textShadow: '0 0 15px rgba(34,197,94,0.6)' }}
                    >
                      +{firstAnswerRef.current === 1 ? '2' : '1'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* === ROPE between characters === */}
              <div className="relative flex items-center" style={{ width: '100px', marginLeft: '-15px', marginRight: '-15px', marginBottom: '45px' }}>
                {/* Rope texture */}
                <motion.div
                  className="w-full h-3 rounded-full"
                  style={{
                    background: 'repeating-linear-gradient(90deg, #92400e 0px, #b45309 4px, #a16207 8px, #92400e 12px)',
                    boxShadow: '0 2px 8px rgba(146, 64, 14, 0.4), inset 0 1px 2px rgba(255,255,255,0.1)',
                  }}
                  animate={{ scaleY: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
                {/* Red flag in center of rope */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-7"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  {/* Flag pole */}
                  <div className="w-[2px] h-9 bg-gray-400 mx-auto rounded-full" />
                  {/* Flag fabric */}
                  <motion.div
                    className="absolute top-0 left-[2px]"
                    style={{
                      width: '18px',
                      height: '14px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      clipPath: 'polygon(0 0, 100% 15%, 85% 50%, 100% 85%, 0 100%)',
                      boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                    }}
                    animate={{ scaleX: [1, 1.1, 0.95, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </motion.div>

                {/* Rope end frays (left) */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                  <div className="w-3 h-1 bg-amber-800 rounded-full -rotate-12 mb-[1px]" />
                  <div className="w-4 h-1 bg-amber-700 rounded-full" />
                  <div className="w-3 h-1 bg-amber-800 rounded-full rotate-12 mt-[1px]" />
                </div>
                {/* Rope end frays (right) */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                  <div className="w-3 h-1 bg-amber-800 rounded-full rotate-12 mb-[1px]" />
                  <div className="w-4 h-1 bg-amber-700 rounded-full" />
                  <div className="w-3 h-1 bg-amber-800 rounded-full -rotate-12 mt-[1px]" />
                </div>
              </div>

              {/* Team 2 Character (right side, pulls RIGHT) */}
              <div className="relative">
                <TugCharacter
                  teamColor="#ef4444"
                  isLeft={false}
                  isWinning={team2.score > team1.score}
                  isPulling={gamePhase === 'playing'}
                />
                {/* Floating +points for Team 2 */}
                <AnimatePresence>
                  {feedback2 === 'correct' && (
                    <motion.div
                      key={`fb2-${currentRound}-${team2.score}`}
                      initial={{ opacity: 1, y: 10, scale: 0.5 }}
                      animate={{ opacity: 0, y: -50, scale: 2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-green-400 font-outfit font-black text-xl z-30"
                      style={{ textShadow: '0 0 15px rgba(34,197,94,0.6)' }}
                    >
                      +{firstAnswerRef.current === 2 ? '2' : '1'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Pulling direction labels */}
            <AnimatePresence>
              {tugPosition < -10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-1 left-3 text-[10px] text-blue-400 font-outfit font-bold"
                >
                  ← {team1.name} pulling!
                </motion.div>
              )}
              {tugPosition > 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-1 right-3 text-[10px] text-red-400 font-outfit font-bold"
                >
                  {team2.name} pulling! →
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scores mini display */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <motion.div
                key={`t1-${team1.score}`}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="font-outfit font-black text-2xl sm:text-3xl text-blue-400"
              >
                {team1.score}
              </motion.div>
              <div className="text-[10px] text-gray-500 font-medium">{team1.name}</div>
            </div>
            <div className="text-gray-600 font-outfit font-bold text-sm">⚔️</div>
            <div className="text-center">
              <motion.div
                key={`t2-${team2.score}`}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="font-outfit font-black text-2xl sm:text-3xl text-red-400"
              >
                {team2.score}
              </motion.div>
              <div className="text-[10px] text-gray-500 font-medium">{team2.name}</div>
            </div>
          </div>

          {/* Speed bonus info */}
          <div className="glass-card-light px-3 py-1.5 text-center">
            <div className="text-[10px] text-gray-500">⚡ First correct = <span className="text-arena-gold font-bold">+2 pts</span></div>
          </div>

          {/* Round progress dots */}
          <div className="flex flex-wrap justify-center gap-1 max-w-[150px]">
            {Array.from({ length: totalRounds }, (_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i < currentRound - 1 ? '#a855f7' : i === currentRound - 1 ? '#00f0ff' : 'rgba(30,41,59,0.5)',
                  boxShadow: i === currentRound - 1 ? '0 0 8px rgba(0,240,255,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== RIGHT: Team 2 ===== */}
        <div className="flex-1 min-w-0">
          <TeamPanel
            team={team2}
            question={q2}
            answer={answer2}
            onKeyPress={handleKeyPress2}
            onSubmit={handleSubmit2}
            onClear={handleClear2}
            disabled={locked2}
            feedback={feedback2}
            isLeft={false}
          />
        </div>
      </div>
    </div>
  )
}
