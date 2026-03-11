/**
 * AI Question Generator
 * Generates math questions with adaptive difficulty
 */

const CATEGORIES = ['addition', 'subtraction', 'multiplication', 'division', 'word'];

const WORD_TEMPLATES = [
  { template: (a, b) => `If you have ${a} apples and get ${b} more, how many do you have?`, op: '+' },
  { template: (a, b) => `A shop has ${a} toys. ${b} are sold. How many are left?`, op: '-' },
  { template: (a, b) => `There are ${a} boxes with ${b} pencils each. How many pencils in total?`, op: '*' },
  { template: (a, b) => `${a} candies are shared equally among ${b} children. How many does each get?`, op: '/' },
  { template: (a, b) => `A train has ${a} cars with ${b} passengers each. How many passengers total?`, op: '*' },
  { template: (a, b) => `You have ${a} stickers and give away ${b}. How many are left?`, op: '-' },
  { template: (a, b) => `${a} students each bring ${b} books. How many books in all?`, op: '*' },
  { template: (a, b) => `A garden has ${a} flowers in ${b} equal rows. How many flowers per row?`, op: '/' },
];

function getRange(difficulty) {
  switch (difficulty) {
    case 'easy': return { min: 1, max: 10 };
    case 'medium': return { min: 10, max: 50 };
    case 'hard': return { min: 20, max: 100 };
    default: return { min: 1, max: 10 };
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWrongAnswers(correct, count = 3) {
  const wrongs = new Set();
  const spread = Math.max(5, Math.abs(correct) * 0.3);
  
  while (wrongs.size < count) {
    let wrong;
    const r = Math.random();
    if (r < 0.3) wrong = correct + randInt(1, Math.ceil(spread));
    else if (r < 0.6) wrong = correct - randInt(1, Math.ceil(spread));
    else if (r < 0.8) wrong = correct + randInt(1, 3);
    else wrong = correct - randInt(1, 3);
    
    if (wrong !== correct && wrong >= 0) wrongs.add(wrong);
  }
  
  return [...wrongs];
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuestion(difficulty = 'easy', preferredCategory = null) {
  const category = preferredCategory || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const { min, max } = getRange(difficulty);
  
  let question, correctAnswer, a, b;

  switch (category) {
    case 'addition':
      a = randInt(min, max);
      b = randInt(min, max);
      question = `${a} + ${b} = ?`;
      correctAnswer = a + b;
      break;

    case 'subtraction':
      a = randInt(min, max);
      b = randInt(min, a); // ensure non-negative result
      question = `${a} - ${b} = ?`;
      correctAnswer = a - b;
      break;

    case 'multiplication':
      a = randInt(Math.max(1, Math.floor(min / 2)), Math.min(12, max));
      b = randInt(Math.max(1, Math.floor(min / 2)), Math.min(12, max));
      question = `${a} × ${b} = ?`;
      correctAnswer = a * b;
      break;

    case 'division':
      b = randInt(Math.max(1, Math.floor(min / 2)), Math.min(12, max));
      correctAnswer = randInt(1, Math.min(12, max));
      a = b * correctAnswer; // ensure clean division
      question = `${a} ÷ ${b} = ?`;
      break;

    case 'word': {
      const tpl = WORD_TEMPLATES[Math.floor(Math.random() * WORD_TEMPLATES.length)];
      if (tpl.op === '/') {
        b = randInt(Math.max(2, Math.floor(min / 2)), Math.min(10, max));
        correctAnswer = randInt(2, Math.min(10, max));
        a = b * correctAnswer;
      } else if (tpl.op === '-') {
        a = randInt(min, max);
        b = randInt(min, a);
        correctAnswer = a - b;
      } else if (tpl.op === '*') {
        a = randInt(Math.max(2, Math.floor(min / 2)), Math.min(10, max));
        b = randInt(Math.max(2, Math.floor(min / 2)), Math.min(10, max));
        correctAnswer = a * b;
      } else {
        a = randInt(min, max);
        b = randInt(min, max);
        correctAnswer = a + b;
      }
      question = tpl.template(a, b);
      break;
    }

    default:
      a = randInt(min, max);
      b = randInt(min, max);
      question = `${a} + ${b} = ?`;
      correctAnswer = a + b;
  }

  const wrongAnswers = generateWrongAnswers(correctAnswer);
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);

  return {
    question,
    options,
    correctAnswer,
    category,
    difficulty,
  };
}

/**
 * Adaptive difficulty adjustment based on recent performance
 */
export function getAdaptiveDifficulty(recentResults, currentDifficulty) {
  if (recentResults.length < 3) return currentDifficulty;
  
  const last5 = recentResults.slice(-5);
  const accuracy = last5.filter(r => r.correct).length / last5.length;
  
  if (accuracy >= 0.8 && currentDifficulty === 'easy') return 'medium';
  if (accuracy >= 0.8 && currentDifficulty === 'medium') return 'hard';
  if (accuracy <= 0.3 && currentDifficulty === 'hard') return 'medium';
  if (accuracy <= 0.3 && currentDifficulty === 'medium') return 'easy';
  
  return currentDifficulty;
}

export function getCategoryIcon(category) {
  switch (category) {
    case 'addition': return '+';
    case 'subtraction': return '−';
    case 'multiplication': return '×';
    case 'division': return '÷';
    case 'word': return '📝';
    default: return '🔢';
  }
}

export function getCategoryColor(category) {
  switch (category) {
    case 'addition': return '#22c55e';
    case 'subtraction': return '#ef4444';
    case 'multiplication': return '#a855f7';
    case 'division': return '#f59e0b';
    case 'word': return '#00f0ff';
    default: return '#64748b';
  }
}
