import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaChevronDown, FaChevronRight, FaCopy, FaCheck, FaBook, FaLaptopCode, FaRocket, FaSearch, FaJs } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'

// ===== JAVASCRIPT TOPICS DATA =====
const jsTopics = [
  {
    id: 1,
    title: 'Introduction to JS',
    icon: <FaJs />,
    color: '#f0db4f',
    description: 'JavaScript is the most popular programming language in the world. It is the language of the web, used for interactivity, logic, and building full-stack applications.',
    subtopics: [
      {
        title: 'What is JavaScript?',
        content: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. It is best known as the scripting language for Web pages.',
        code: `// Your first JavaScript code\nconsole.log("Hello, World!");\n\n// Basic logic\nlet name = "SmartMath Arena";\nconsole.log(\`Welcome to \${name}!\`);`,
        output: 'Hello, World!\nWelcome to SmartMath Arena!'
      },
      {
        title: 'Running JavaScript',
        content: 'You can run JS in any modern web browser using the console, or on your machine using environments like Node.js.',
        code: `// Try this in your browser console!\nalert("JavaScript is running!");\n\n// Math operations\nconsole.log(2 + 2 * 10); // 22`,
        output: '22'
      }
    ]
  },
  {
    id: 2,
    title: 'Variables (let, const, var)',
    icon: <FaCode />,
    color: '#3b82f6',
    description: 'Variables are containers for storing information. Modern JS uses let and const for better scope management.',
    subtopics: [
      {
        title: 'let vs const',
        content: '"let" allows you to reassign values, while "const" is for variables that stay constant.',
        code: `let score = 100;\nscore = 150; // OK\n\nconst PI = 3.14159;\n// PI = 3.15; // Error: Assignment to constant variable.\n\nconsole.log(score);\nconsole.log(PI);`,
        output: '150\n3.14159'
      },
      {
        title: 'Data Types',
        content: 'JS has primitive types like strings, numbers, booleans, and null, as well as complex types like objects and arrays.',
        code: `let text = "Hello";     // String\nlet count = 42;         // Number\nlet isActive = true;    // Boolean\nlet user = { name: "Bob" }; // Object\nlet items = [1, 2, 3];  // Array\n\nconsole.log(typeof text);\nconsole.log(typeof count);`,
        output: 'string\nnumber'
      }
    ]
  },
  {
    id: 3,
    title: 'Functions & Arrows',
    icon: <FaLaptopCode />,
    color: '#10b981',
    description: 'Functions are reusable blocks of code. ES6 introduced arrow functions for cleaner syntax.',
    subtopics: [
      {
        title: 'Arrows & Regular Functions',
        content: 'Arrow functions provide a more concise way to write function expressions.',
        code: `// Regular function\nfunction add(a, b) {\n    return a + b;\n}\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\nconsole.log(add(5, 5));\nconsole.log(multiply(4, 5));`,
        output: '10\n20'
      }
    ]
  },
  {
    id: 4,
    title: 'Arrays & Methods',
    icon: <FaBook />,
    color: '#8b5cf6',
    description: 'Arrays are used to store lists of data. JS provides many built-in methods to manipulate them.',
    subtopics: [
      {
        title: 'Higher Order Methods',
        content: 'Methods like map, filter, and forEach are essential for modern JS development.',
        code: `const nums = [1, 2, 3, 4, 5];\n\nconst doubled = nums.map(n => n * 2);\nconst evens = nums.filter(n => n % 2 === 0);\n\nconsole.log(doubled); // [2, 4, 6, 8, 10]\nconsole.log(evens);   // [2, 4]`,
        output: '[2, 4, 6, 8, 10]\n[2, 4]'
      }
    ]
  },
  {
    id: 5,
    title: 'Promises & Async',
    icon: <HiLightningBolt />,
    color: '#f97316',
    description: 'Handle asynchronous operations like fetching data from an API using Promises and Async/Await.',
    subtopics: [
      {
        title: 'Async / Await',
        content: 'Async/await makes asynchronous code look and behave a bit more like synchronous code.',
        code: `const fetchData = async () => {\n    console.log("Fetching...");\n    // Simulate API call\n    const data = await new Promise(res => {\n        setTimeout(() => res("User Found!"), 1000);\n    });\n    console.log(data);\n};\n\nfetchData();`,
        output: 'Fetching...\n(Wait 1 second)\nUser Found!'
      }
    ]
  },
  {
    id: 6,
    title: 'DOM Manipulation',
    icon: <FaRocket />,
    color: '#ec4899',
    description: 'The DOM (Document Object Model) allows JS to interact with and change HTML/CSS on a webpage.',
    subtopics: [
      {
        title: 'Selecting & Changing',
        content: 'Use querySelector to select elements and textContent or style to change them.',
        code: `// Select an element\nconst title = document.querySelector("#title");\n\n// Change its content\ntitle.textContent = "New Heading";\n\n// Change its style\ntitle.style.color = "#3b82f6";\n\nconsole.log("UI Updated!");`,
        output: 'UI Updated!'
      }
    ]
  }
]

// ===== CODE BLOCK COMPONENT =====
function CodeBlock({ code, output }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(30,41,59,0.5)' }}>
      {/* Code */}
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-2" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
          <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
            <FaJs className="text-yellow-400" /> JavaScript
          </span>
          <button
            onClick={handleCopy}
            className="text-xs text-gray-500 hover:text-arena-neon transition-colors flex items-center gap-1"
          >
            {copied ? <><FaCheck className="text-green-400" /> Copied!</> : <><FaCopy /> Copy</>}
          </button>
        </div>
        <pre className="px-4 py-3 text-sm font-mono overflow-x-auto leading-relaxed" style={{ background: 'rgba(10, 14, 26, 0.9)', color: '#e2e8f0' }}>
          <code>{code}</code>
        </pre>
      </div>
      {/* Output */}
      {output && (
        <div>
          <div className="px-4 py-1.5 text-xs text-green-400 font-mono font-bold" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            ▶ Output
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-green-300/80 overflow-x-auto" style={{ background: 'rgba(5, 10, 20, 0.9)' }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}

// ===== MAIN COMPONENT =====
export default function LearnJS() {
  const [expandedTopic, setExpandedTopic] = useState(null)
  const [expandedSub, setExpandedSub] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const toggleTopic = (id) => {
    setExpandedTopic(expandedTopic === id ? null : id)
  }

  const toggleSub = (topicId, subIdx) => {
    const key = `${topicId}-${subIdx}`
    setExpandedSub(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Filter topics by search
  const filteredTopics = jsTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.subtopics.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="page-enter pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm font-medium" style={{ color: '#f0db4f' }}>
            <FaJs className="text-yellow-400 text-lg" />
            Learn JavaScript Programming
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl mb-4">
            <span className="text-yellow-400">JavaScript</span>{' '}
            <span className="text-white">Tutorial</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interactive guide to JavaScript development. Master ECMA Script, DOM, and async logic with {jsTopics.length} modules!
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-yellow-400">{jsTopics.length}</div>
              <div className="text-xs text-gray-500">Topics</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-purple-400">{jsTopics.reduce((a, t) => a + t.subtopics.length, 0)}</div>
              <div className="text-xs text-gray-500">Lessons</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-green-400">75+</div>
              <div className="text-xs text-gray-500">Examples</div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search JavaScript topics... (e.g. async, arrays, DOM)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl font-outfit text-sm bg-transparent outline-none text-white placeholder-gray-600"
            style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(30, 41, 59, 0.5)' }}
          />
        </motion.div>

        {/* Topics List */}
        <div className="space-y-3">
          {filteredTopics.map((topic, idx) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="glass-card overflow-hidden"
            >
              {/* Topic Header */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${topic.color}15`, color: topic.color }}
                >
                  {topic.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-outfit font-bold text-white text-base sm:text-lg">
                    <span className="text-gray-600 mr-2 text-sm">{String(topic.id).padStart(2, '0')}.</span>
                    {topic.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5 truncate">{topic.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-600 hidden sm:block">{topic.subtopics.length} lessons</span>
                  <motion.div
                    animate={{ rotate: expandedTopic === topic.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-500"
                  >
                    <FaChevronDown />
                  </motion.div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedTopic === topic.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-5 space-y-2" style={{ borderTop: '1px solid rgba(30,41,59,0.3)' }}>
                      <div className="pt-3" />
                      {topic.subtopics.map((sub, subIdx) => {
                        const subKey = `${topic.id}-${subIdx}`
                        const isOpen = expandedSub[subKey]
                        return (
                          <div key={subIdx} className="rounded-xl overflow-hidden" style={{ background: 'rgba(17,24,39,0.3)', border: '1px solid rgba(30,41,59,0.3)' }}>
                            <button
                              onClick={() => toggleSub(topic.id, subIdx)}
                              className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-white/[0.02] transition-colors"
                            >
                              <FaChevronRight
                                className="text-xs transition-transform flex-shrink-0"
                                style={{ color: topic.color, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                              />
                              <span className="font-outfit font-semibold text-sm text-white/90">{sub.title}</span>
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-3 sm:px-4 pb-4">
                                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">{sub.content}</p>
                                    <CodeBlock code={sub.code} output={sub.output} />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 font-outfit">No JavaScript topics found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
