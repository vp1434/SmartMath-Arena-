import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaChevronDown, FaChevronRight, FaCopy, FaCheck, FaBook, FaLaptopCode, FaRocket, FaSearch } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'
import { SiC } from 'react-icons/si'

// ===== C TOPICS DATA =====
const cTopics = [
  {
    id: 1,
    title: 'Introduction to C',
    icon: <SiC />,
    color: '#00599c',
    description: 'C is a powerful general-purpose programming language. It is fast, portable and available on all platforms.',
    subtopics: [
      {
        title: 'What is C?',
        content: 'C was developed by Dennis Ritchie at Bell Labs in 1972. It is a procedural language and provides low-level access to memory. Most modern languages like C++, Java, and Python are based on C.',
        code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
        output: 'Hello, World!'
      },
      {
        title: 'Basic Structure of C Program',
        content: 'A C program consists of Header files (#include), Main function (entry point), Variable declarations, Statements, and Return statement.',
        code: `#include <stdio.h> // Preprocessor directive\n\nint main() {       // Main function\n    /* My first C program */\n    printf("SmartMath Arena Learning C!\\n");\n    return 0;      // Terminate program\n}`,
        output: 'SmartMath Arena Learning C!'
      }
    ]
  },
  {
    id: 2,
    title: 'Variables & Data Types',
    icon: <FaCode />,
    color: '#3b82f6',
    description: 'Variables are containers for storing data values. C has a rich set of data types.',
    subtopics: [
      {
        title: 'Fundamental Data Types',
        content: 'Common types include: int (integer), float (decimal), double (precise decimal), and char (character). Memory size depends on the compiler.',
        code: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float score = 85.5;\n    char grade = 'A';\n\n    printf("Age: %d\\nScore: %.1f\\nGrade: %c\\n", age, score, grade);\n    return 0;\n}`,
        output: 'Age: 20\nScore: 85.5\nGrade: A'
      },
      {
        title: 'Format Specifiers',
        content: 'Used for input and output. %d for integers, %f for floats, %c for characters, %s for strings, and %p for pointers.',
        code: `#include <stdio.h>\n\nint main() {\n    double pi = 3.14159;\n    printf("Value of PI: %lf\\n", pi);\n    return 0;\n}`,
        output: 'Value of PI: 3.14159'
      }
    ]
  },
  {
    id: 3,
    title: 'Conditionals (if/else, switch)',
    icon: <HiLightningBolt />,
    color: '#f59e0b',
    description: 'Control flow structures allow the program to make decisions based on conditions.',
    subtopics: [
      {
        title: 'if-else Statements',
        content: 'The if statement executes code if a condition is true. Else handles the false case. Use else if for multiple conditions.',
        code: `#include <stdio.h>\n\nint main() {\n    int num = 10;\n    if (num > 0) {\n        printf("Positive\\n");\n    } else if (num < 0) {\n        printf("Negative\\n");\n    } else {\n        printf("Zero\\n");\n    }\n    return 0;\n}`,
        output: 'Positive'
      },
      {
        title: 'Switch Statement',
        content: 'Switch allows a variable to be tested for equality against a list of values (cases).',
        code: `#include <stdio.h>\n\nint main() {\n    int Day = 2;\n    switch(Day) {\n        case 1: printf("Monday\\n"); break;\n        case 2: printf("Tuesday\\n"); break;\n        default: printf("Other day\\n");\n    }\n    return 0;\n}`,
        output: 'Tuesday'
      }
    ]
  },
  {
    id: 4,
    title: 'Loops (for & while)',
    icon: <FaRocket />,
    color: '#ef4444',
    description: 'Loops repeat a block of code multiple times.',
    subtopics: [
      {
        title: 'For Loop',
        content: 'Used when the number of iterations is known. Syntax: for(initialization; condition; increment/decrement).',
        code: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=3; i++) {\n        printf("Count: %d\\n", i);\n    }\n    return 0;\n}`,
        output: 'Count: 1\nCount: 2\nCount: 3'
      },
      {
        title: 'While Loop',
        content: 'Repeats a statement as long as a given condition is true. The condition is checked before execution.',
        code: `#include <stdio.h>\n\nint main() {\n    int i = 3;\n    while(i > 0) {\n        printf("%d... ", i);\n        i--;\n    }\n    printf("Go!\\n");\n    return 0;\n}`,
        output: '3... 2... 1... Go!'
      }
    ]
  },
  {
    id: 5,
    title: 'Functions',
    icon: <FaLaptopCode />,
    color: '#14b8a6',
    description: 'Functions are modular blocks of code that perform specific tasks.',
    subtopics: [
      {
        title: 'User-Defined Functions',
        content: 'Breaking code into functions makes it readable and reusable. A function has a return type, name, parameters, and body.',
        code: `#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int result = square(5);\n    printf("Square of 5 is: %d\\n", result);\n    return 0;\n}`,
        output: 'Square of 5 is: 25'
      }
    ]
  },
  {
    id: 6,
    title: 'Arrays & Strings',
    icon: <FaBook />,
    color: '#ec4899',
    description: 'Data structures to store multiple items of the same type.',
    subtopics: [
      {
        title: 'Arrays',
        content: 'An array stores multiple values of the same type in contiguous memory locations.',
        code: `#include <stdio.h>\n\nint main() {\n    int marks[3] = {90, 85, 95};\n    printf("First mark: %d\\n", marks[0]);\n    return 0;\n}`,
        output: 'First mark: 90'
      },
      {
        title: 'Strings',
        content: 'In C, a string is a sequence of characters terminated by a null character (\\0).',
        code: `#include <stdio.h>\n\nint main() {\n    char name[] = "C-Prog";\n    printf("Language: %s\\n", name);\n    return 0;\n}`,
        output: 'Language: C-Prog'
      }
    ]
  },
  {
    id: 7,
    title: 'Pointers',
    icon: <HiLightningBolt />,
    color: '#8b5cf6',
    description: 'One of C\'s most powerful features. Pointers store memory addresses.',
    subtopics: [
      {
        title: 'Pointer Basics',
        content: 'A pointer variable points to a data type (like int) and is created with the * operator. The & operator gets the address of a variable.',
        code: `#include <stdio.h>\n\nint main() {\n    int val = 42;\n    int *ptr = &val;\n\n    printf("Value: %d\\n", val);\n    printf("Address: %p\\n", ptr);\n    printf("Value via pointer: %d\\n", *ptr);\n    return 0;\n}`,
        output: 'Value: 42\nAddress: 0x7ffee... (variable)\nValue via pointer: 42'
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
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-2" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
          <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
            <SiC className="text-blue-400" /> C Language
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
export default function LearnC() {
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

  const filteredTopics = cTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.subtopics.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="page-enter pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm font-medium" style={{ color: '#00599c' }}>
            <SiC className="text-blue-500 text-lg" />
            Learn C Programming
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl mb-4">
            <span className="text-blue-500">C</span>{' '}
            <span className="text-white">Programming</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The foundation of modern computer science. Master C with detailed examples, theory, and professional code snippets.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-blue-400">{cTopics.length}</div>
              <div className="text-xs text-gray-500">Modules</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-purple-400">{cTopics.reduce((a, t) => a + t.subtopics.length, 0)}</div>
              <div className="text-xs text-gray-500">Lessons</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-green-400">40+</div>
              <div className="text-xs text-gray-500">Snippets</div>
            </div>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8"
        >
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
              type="text"
              placeholder="Search C topics... (e.g. pointers, recursion, memory)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl font-outfit text-sm bg-transparent outline-none text-white placeholder-gray-600"
              style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(30, 41, 59, 0.5)' }}
          />
        </motion.div>

        <div className="space-y-3">
          {filteredTopics.map((topic, idx) => (
              <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="glass-card overflow-hidden"
              >
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

        {filteredTopics.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500 font-outfit">No C topics found for "{searchQuery}"</p>
            </div>
        )}
      </div>
    </div>
  )
}
