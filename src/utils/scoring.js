/**
 * Scoring System
 * Base points + speed bonus + streak multiplier
 */

const BASE_POINTS = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const WRONG_PENALTY = {
  easy: 3,
  medium: 5,
  hard: 5,
};

const MAX_SPEED_BONUS = {
  easy: 10,
  medium: 15,
  hard: 25,
};

const STREAK_MULTIPLIERS = [1, 1, 1.2, 1.5, 2, 2.5, 3];

export function calculateScore(isCorrect, difficulty, timeLeft, maxTime, streak) {
  if (!isCorrect) {
    return {
      points: -WRONG_PENALTY[difficulty] || -3,
      speedBonus: 0,
      streakMultiplier: 1,
      totalPoints: -WRONG_PENALTY[difficulty] || -3,
    };
  }

  const base = BASE_POINTS[difficulty] || 10;
  const speedRatio = timeLeft / maxTime;
  const speedBonus = Math.round(MAX_SPEED_BONUS[difficulty] * speedRatio);
  const streakIdx = Math.min(streak, STREAK_MULTIPLIERS.length - 1);
  const multiplier = STREAK_MULTIPLIERS[streakIdx];
  const totalPoints = Math.round((base + speedBonus) * multiplier);

  return {
    points: base,
    speedBonus,
    streakMultiplier: multiplier,
    totalPoints,
  };
}

export function getStreakLabel(streak) {
  if (streak >= 6) return '🔥 UNSTOPPABLE!';
  if (streak >= 4) return '⚡ ON FIRE!';
  if (streak >= 3) return '💫 Great Streak!';
  if (streak >= 2) return '✨ Nice!';
  return '';
}
