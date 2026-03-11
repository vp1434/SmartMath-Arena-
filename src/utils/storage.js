/**
 * LocalStorage persistence for leaderboard and game history
 */

const LEADERBOARD_KEY = 'smartmath_leaderboard';
const HISTORY_KEY = 'smartmath_history';

export function getLeaderboard() {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToLeaderboard(entry) {
  const board = getLeaderboard();
  board.push({
    ...entry,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    date: new Date().toISOString(),
  });
  // Keep top 100
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 100)));
}

export function getGameHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveGameHistory(game) {
  const history = getGameHistory();
  history.unshift({
    ...game,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    date: new Date().toISOString(),
  });
  // Keep last 50 games
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

export function clearAllData() {
  localStorage.removeItem(LEADERBOARD_KEY);
  localStorage.removeItem(HISTORY_KEY);
}

export function getAnalytics() {
  const history = getGameHistory();
  const leaderboard = getLeaderboard();

  const totalGames = history.length;
  const totalPlayers = new Set(leaderboard.map(e => e.name)).size;
  
  let totalQuestions = 0;
  let totalCorrect = 0;
  let difficultyCount = { easy: 0, medium: 0, hard: 0 };

  history.forEach(game => {
    totalQuestions += game.totalQuestions || 0;
    totalCorrect += game.totalCorrect || 0;
    if (game.difficulty) difficultyCount[game.difficulty] = (difficultyCount[game.difficulty] || 0) + 1;
  });

  const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const topScorer = leaderboard.length > 0 ? leaderboard[0] : null;

  return {
    totalGames,
    totalPlayers,
    avgAccuracy,
    topScorer,
    difficultyCount,
    totalQuestions,
    totalCorrect,
  };
}
