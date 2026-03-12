import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaChevronDown, FaChevronRight, FaCopy, FaCheck, FaBook, FaLaptopCode, FaRocket, FaSearch } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'
import { SiCplusplus } from 'react-icons/si'

// ===== C++ TOPICS DATA =====
const cppTopics = [
  {
    id: 1,
    title: 'Introduction to C++',
    icon: <SiCplusplus />,
    color: '#00599c',
    description: 'C++ is a high-performance, general-purpose programming language. It is an extension of C and is used in games, system software, and high-performance applications.',
    subtopics: [
      {
        title: 'What is C++?',
        content: 'C++ was created by Bjarne Stroustrup in 1979 as "C with Classes". It is a statically typed, compiled, multi-paradigm language that supports procedural, object-oriented, and generic programming.',
        code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
        output: 'Hello, World!'
      },
      {
        title: 'Why Learn C++?',
        content: 'C++ gives you low-level memory control and high-level abstractions. It is the language of choice for game engines (Unreal Engine), OS kernels, and performance-critical systems.',
        code: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string name = "SmartMath Arena";\n    std::cout << "Welcome to " << name << "!" << std::endl;\n    return 0;\n}`,
        output: 'Welcome to SmartMath Arena!'
      }
    ]
  },
  {
    id: 2,
    title: 'Variables & Data Types',
    icon: <FaCode />,
    color: '#3b82f6',
    description: 'Variables are containers for storing data. In C++, you must declare the type of a variable before using it.',
    subtopics: [
      {
        title: 'Basic Data Types',
        content: 'C++ has several built-in types: int, float, double, char, bool. You also use strings from the standard library.',
        code: `#include <iostream>\n#include <string>\n\nint main() {\n    int age = 15;\n    double price = 19.99;\n    char grade = 'A';\n    bool isActive = true;\n    std::string name = "Alice";\n\n    std::cout << "Age: " << age << "\\nPrice: " << price << std::endl;\n    return 0;\n}`,
        output: 'Age: 15\nPrice: 19.99'
      },
      {
        title: 'Constants',
        content: 'Use the "const" keyword to declare variables whose value cannot be changed.',
        code: `#include <iostream>\n\nint main() {\n    const double PI = 3.14159;\n    // PI = 3.14; // ERROR! Cannot modify a const\n    std::cout << "PI: " << PI << std::endl;\n    return 0;\n}`,
        output: 'PI: 3.14159'
      }
    ]
  },
  {
    id: 3,
    title: 'Conditionals (if/else)',
    icon: <HiLightningBolt />,
    color: '#f59e0b',
    description: 'Use conditional statements to perform different actions based on different conditions.',
    subtopics: [
      {
        title: 'if-else Statements',
        content: 'The if statement executes a block of code if a condition is true. Else if and else handle other cases.',
        code: `#include <iostream>\n\nint main() {\n    int age = 15;\n    if (age >= 18) {\n        std::cout << "Adult" << std::endl;\n    } else if (age >= 13) {\n        std::cout << "Teenager" << std::endl;\n    } else {\n        std::cout << "Child" << std::endl;\n    }\n    return 0;\n}`,
        output: 'Teenager'
      }
    ]
  },
  {
    id: 4,
    title: 'Loops',
    icon: <FaRocket />,
    color: '#ef4444',
    description: 'Loops repeat a block of code as long as a specified condition is reached.',
    subtopics: [
      {
        title: 'for and while Loops',
        content: 'Use "for" when you know the number of iterations, and "while" when you don\'t.',
        code: `#include <iostream>\n\nint main() {\n    // for loop\n    for (int i = 0; i < 3; i++) {\n        std::cout << i << " ";\n    }\n    std::cout << "\\n";\n\n    // while loop\n    int j = 0;\n    while (j < 3) {\n        std::cout << j << " ";\n        j++;\n    }\n    return 0;\n}`,
        output: '0 1 2 \n0 1 2'
      }
    ]
  },
  {
    id: 5,
    title: 'Functions',
    icon: <FaLaptopCode />,
    color: '#14b8a6',
    description: 'Functions are blocks of code that only run when called. You can pass data (parameters) and return data.',
    subtopics: [
      {
        title: 'Defining Functions',
        content: 'A function in C++ must be declared or defined before use. It specifies a return type.',
        code: `#include <iostream>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(10, 20);\n    std::cout << "Sum: " << result << std::endl;\n    return 0;\n}`,
        output: 'Sum: 30'
      }
    ]
  },
  {
    id: 6,
    title: 'Arrays & Strings',
    icon: <FaBook />,
    color: '#ec4899',
    description: 'Arrays are used to store multiple values of the same type. Strings are sequences of characters.',
    subtopics: [
      {
        title: 'Arrays in C++',
        content: 'Arrays have a fixed size. Access elements using indices starting from 0.',
        code: `#include <iostream>\n\nint main() {\n    int nums[3] = {10, 20, 30};\n    std::cout << nums[1] << std::endl; // 20\n    return 0;\n}`,
        output: '20'
      }
    ]
  },
  {
    id: 7,
    title: 'OOP Classes',
    icon: <FaRocket />,
    color: '#6366f1',
    description: 'Object-Oriented Programming (OOP) is a paradigm based on objects and classes.',
    subtopics: [
      {
        title: 'Classes and Objects',
        content: 'A class is a blueprint. An object is an instance of a class.',
        code: `#include <iostream>\n#include <string>\n\nclass Student {\npublic:\n    std::string name;\n    void greet() {\n        std::cout << "Hi, I am " << name << std::endl;\n    }\n};\n\nint main() {\n    Student s1;\n    s1.name = "Alice";\n    s1.greet();\n    return 0;\n}`,
        output: 'Hi, I am Alice'
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
            <SiCplusplus className="text-blue-400" /> C++
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
export default function LearnCPP() {
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
  const filteredTopics = cppTopics.filter(topic =>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm font-medium" style={{ color: '#00599c' }}>
            <SiCplusplus className="text-blue-500 text-lg" />
            Learn C++ Programming
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl mb-4">
            <span className="text-blue-500">C++</span>{' '}
            <span className="text-white">Tutorial</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Deep dive into C++ with {cppTopics.length} core topics, real-world examples, and syntax guides. Master performance programming!
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-blue-400">{cppTopics.length}</div>
              <div className="text-xs text-gray-500">Modules</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-purple-400">{cppTopics.reduce((a, t) => a + t.subtopics.length, 0)}</div>
              <div className="text-xs text-gray-500">Lessons</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-green-400">50+</div>
              <div className="text-xs text-gray-500">Snippets</div>
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
              placeholder="Search C++ topics... (e.g. pointers, classes, STL)"
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
              <p className="text-gray-500 font-outfit">No C++ topics found for "{searchQuery}"</p>
            </div>
        )}
      </div>
    </div>
  )
}
