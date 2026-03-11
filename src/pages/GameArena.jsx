import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Timer from '../components/Timer'
import ScoreBar from '../components/ScoreBar'
import QuestionCard from '../components/QuestionCard'
import AnswerButtons from '../components/AnswerButtons'
import GameOverModal from '../components/GameOverModal'
import { generateQuestion, getAdaptiveDifficulty } from '../utils/questionGenerator'
import { calculateScore, getStreakLabel } from '../utils/scoring'
import { saveToLeaderboard, saveGameHistory } from '../utils/storage'

export default function GameArena() {
  const navigate = useNavigate()
  const timerRef = useRef(null)

  // Load config from session
  const [config] = useState(() => {
    try {
      const stored = sessionStorage.getItem('gameConfig')
      if (stored) return JSON.parse(stored)
    } catch {}
    return {
      team1Name: 'Team Alpha',
      team2Name: 'Team Beta',
      difficulty: 'medium',
      rounds: 10,
      timePerQuestion: 15,
    }
  })

  // Game state
  const [gameState, setGameState] = useState('countdown') // countdown | playing | gameover
  const [countdownValue, setCountdownValue] = useState(3)
  const [currentRound, setCurrentRound] = useState(1)
  const [currentTeam, setCurrentTeam] = useState(1) // 1 or 2
  const [question, setQuestion] = useState(null)
  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion)
  const [difficulty, setDifficulty] = useState(config.difficulty)
  const [feedback, setFeedback] = useState(null) // { type: 'correct'|'wrong', points, streak }
  const [disabled, setDisabled] = useState(false)

  // Team data
  const [team1, setTeam1] = useState({
    name: config.team1Name,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    totalAnswered: 0,
    results: [],
  })
  const [team2, setTeam2] = useState({
    name: config.team2Name,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    totalAnswered: 0,
    results: [],
  })

  // Total questions = rounds * 2 (each team answers once per round)
  const totalQuestions = config.rounds * 2
  const questionNumber = (currentRound - 1) * 2 + currentTeam

  // Countdown before game starts
  useEffect(() => {
    if (gameState !== 'countdown') return
    if (countdownValue <= 0) {
      setGameState('playing')
      setQuestion(generateQuestion(difficulty))
      return
    }
    const timer = setTimeout(() => setCountdownValue(v => v - 1), 1000)
    return () => clearTimeout(timer)
  }, [gameState, countdownValue, difficulty])

  // Question timer
  useEffect(() => {
    if (gameState !== 'playing' || disabled) return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timerRef.current)
  }, [gameState, timeLeft, disabled])

  const handleTimeout = useCallback(() => {
    setDisabled(true)
    setFeedback({ type: 'timeout', points: 0 })

    const setTeam = currentTeam === 1 ? setTeam1 : setTeam2
    setTeam(prev => ({
      ...prev,
      wrong: prev.wrong + 1,
      streak: 0,
      totalAnswered: prev.totalAnswered + 1,
      results: [...prev.results, { correct: false }],
    }))

    setTimeout(() => advanceGame(), 1200)
  }, [currentTeam, currentRound])

  const handleAnswer = useCallback((option, isCorrect) => {
    setDisabled(true)
    clearTimeout(timerRef.current)

    const currentTeamData = currentTeam === 1 ? team1 : team2
    const newStreak = isCorrect ? currentTeamData.streak + 1 : 0
    const scoreResult = calculateScore(isCorrect, difficulty, timeLeft, config.timePerQuestion, newStreak)

    setFeedback({
      type: isCorrect ? 'correct' : 'wrong',
      points: scoreResult.totalPoints,
      streakLabel: isCorrect ? getStreakLabel(newStreak) : '',
    })

    const setTeam = currentTeam === 1 ? setTeam1 : setTeam2
    setTeam(prev => ({
      ...prev,
      score: Math.max(0, prev.score + scoreResult.totalPoints),
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      streak: newStreak,
      totalAnswered: prev.totalAnswered + 1,
      results: [...prev.results, { correct: isCorrect }],
    }))

    setTimeout(() => advanceGame(), 1200)
  }, [currentTeam, team1, team2, difficulty, timeLeft, config.timePerQuestion])

  const advanceGame = useCallback(() => {
    setFeedback(null)
    setDisabled(false)

    if (currentTeam === 1) {
      // Switch to team 2 for same round
      setCurrentTeam(2)
      const newDiff = getAdaptiveDifficulty(team2.results, difficulty)
      setDifficulty(newDiff)
      setQuestion(generateQuestion(newDiff))
      setTimeLeft(config.timePerQuestion)
    } else {
      // Both teams answered — move to next round or end
      if (currentRound >= config.rounds) {
        endGame()
        return
      }
      setCurrentRound(r => r + 1)
      setCurrentTeam(1)
      const newDiff = getAdaptiveDifficulty(team1.results, difficulty)
      setDifficulty(newDiff)
      setQuestion(generateQuestion(newDiff))
      setTimeLeft(config.timePerQuestion)
    }
  }, [currentTeam, currentRound, config, difficulty, team1.results, team2.results])

  const endGame = () => {
    setGameState('gameover')

    // Save to leaderboard
    saveToLeaderboard({ name: team1.name, score: team1.score, accuracy: team1.totalAnswered > 0 ? Math.round((team1.correct / team1.totalAnswered) * 100) : 0 })
    saveToLeaderboard({ name: team2.name, score: team2.score, accuracy: team2.totalAnswered > 0 ? Math.round((team2.correct / team2.totalAnswered) * 100) : 0 })

    // Save game history
    saveGameHistory({
      team1: { name: team1.name, score: team1.score },
      team2: { name: team2.name, score: team2.score },
      difficulty: config.difficulty,
      rounds: config.rounds,
      totalQuestions: totalQuestions,
      totalCorrect: team1.correct + team2.correct,
      winner: team1.score > team2.score ? team1.name : team2.score > team1.score ? team2.name : 'Draw',
    })
  }

  const handlePlayAgain = () => {
    navigate('/setup')
  }

  // ========== RENDER ==========

  // Countdown screen
  if (gameState === 'countdown') {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <motion.div
          key={countdownValue}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="text-center"
        >
          {countdownValue > 0 ? (
            <div className="font-outfit font-black text-9xl gradient-text">
              {countdownValue}
            </div>
          ) : (
            <div className="font-outfit font-black text-6xl text-arena-neon animate-pulse">
              GO!
            </div>
          )}
          <p className="text-gray-400 mt-4 font-medium">Get ready...</p>
        </motion.div>
      </div>
    )
  }

  // Game Over
  if (gameState === 'gameover') {
    return <GameOverModal team1={team1} team2={team2} onPlayAgain={handlePlayAgain} />
  }

  // Playing
  return (
    <div className="pt-20 pb-10 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Current Team Indicator */}
        <motion.div
          key={currentTeam}
          initial={{ opacity: 0, x: currentTeam === 1 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-outfit font-bold text-sm"
            style={{
              backgroundColor: currentTeam === 1 ? 'rgba(0,240,255,0.1)' : 'rgba(168,85,247,0.1)',
              color: currentTeam === 1 ? '#00f0ff' : '#a855f7',
              border: `1px solid ${currentTeam === 1 ? 'rgba(0,240,255,0.3)' : 'rgba(168,85,247,0.3)'}`,
            }}
          >
            🎯 {currentTeam === 1 ? team1.name : team2.name}'s Turn
          </span>
        </motion.div>

        {/* Score Bar */}
        <ScoreBar team1={team1} team2={team2} />

        {/* Round Progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Round {currentRound}/{config.rounds}</span>
          <div className="flex-1 h-1.5 rounded-full bg-arena-card overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-arena-neon to-arena-purple"
              animate={{ width: `${(currentRound / config.rounds) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Timer + Question */}
        <div className="flex flex-col items-center gap-6">
          <Timer timeLeft={timeLeft} maxTime={config.timePerQuestion} />

          {question && (
            <QuestionCard
              question={question.question}
              category={question.category}
              difficulty={question.difficulty}
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
            />
          )}
        </div>

        {/* Feedback popup */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {feedback.type === 'correct' && (
                <div>
                  <span className="text-green-400 font-outfit font-bold text-xl">✓ Correct! +{feedback.points}</span>
                  {feedback.streakLabel && (
                    <div className="text-arena-gold text-sm font-bold mt-1">{feedback.streakLabel}</div>
                  )}
                </div>
              )}
              {feedback.type === 'wrong' && (
                <span className="text-red-400 font-outfit font-bold text-xl">✗ Wrong! {feedback.points}</span>
              )}
              {feedback.type === 'timeout' && (
                <span className="text-yellow-400 font-outfit font-bold text-xl">⏱ Time's Up!</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Buttons */}
        {question && (
          <AnswerButtons
            options={question.options}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
            disabled={disabled}
          />
        )}

        {/* Streak indicator */}
        {((currentTeam === 1 && team1.streak >= 2) || (currentTeam === 2 && team2.streak >= 2)) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-sm text-arena-gold font-bold"
          >
            {getStreakLabel(currentTeam === 1 ? team1.streak : team2.streak)}
          </motion.div>
        )}
      </div>
    </div>
  )
}
