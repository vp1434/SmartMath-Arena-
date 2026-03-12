import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDatabase, FaChevronDown, FaChevronRight, FaCopy, FaCheck, FaBook, FaLaptopCode, FaRocket, FaSearch, FaTable, FaShieldAlt, FaSitemap } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'

// ===== DBMS TOPICS DATA =====
const dbmsTopics = [
  {
    id: 1,
    title: 'Introduction to DBMS',
    icon: <FaDatabase />,
    color: '#0ea5e9',
    description: 'A Database Management System (DBMS) is software for storing and retrieving users\' data while considering appropriate security measures.',
    subtopics: [
      {
        title: 'What is a DBMS?',
        content: 'DBMS stands for Database Management System. It is a collection of programs that enables users to access databases, manipulate data, and help in the representation of data.',
        code: `-- Example: Database Overview\n-- A database is a collection of related data.\n-- Example: Student Database, Employee Database.`,
        output: null
      },
      {
        title: 'Characteristics of DBMS',
        content: 'Provides a data-sharing environment, manages large amounts of data, provides security and removes redundancy using Normalization.',
        code: `-- Key Features:\n-- 1. Self-describing nature\n-- 2. Insulation between programs and data\n-- 3. Support of multiple views of the data\n-- 4. Sharing of data and multi-user transaction processing`,
        output: null
      }
    ]
  },
  {
    id: 2,
    title: 'Relational Model',
    icon: <FaTable />,
    color: '#3b82f6',
    description: 'The relational model represents data as relations (tables), which are composed of rows and columns.',
    subtopics: [
      {
        title: 'Tables, Rows & Columns',
        content: 'In RDBMS, data is organized in tables (Relations). Rows are called Tuples, and Columns are called Attributes.',
        code: `CREATE TABLE Students (\n    ID INT PRIMARY KEY,\n    Name VARCHAR(50),\n    Age INT\n);`,
        output: 'Table "Students" created successfully.'
      }
    ]
  },
  {
    id: 3,
    title: 'SQL Basics',
    icon: <FaCode />,
    color: '#f59e0b',
    description: 'Structured Query Language (SQL) is the standard language for relational database management.',
    subtopics: [
      {
        title: 'Data Definition Language (DDL)',
        content: 'DDL commands are used to define the database schema. Commands: CREATE, ALTER, DROP, TRUNCATE.',
        code: `CREATE TABLE Employees (\n    EmpID INT PRIMARY KEY,\n    Name TEXT NOT NULL,\n    Salary REAL\n);`,
        output: 'Table created.'
      },
      {
        title: 'Data Manipulation Language (DML)',
        content: 'DML commands are used for managing data within tables. Commands: SELECT, INSERT, UPDATE, DELETE.',
        code: `INSERT INTO Students (ID, Name, Age) VALUES (1, 'Alice', 15);\nSELECT * FROM Students WHERE Age > 13;`,
        output: '1 row inserted.\n1. Alice | 15'
      }
    ]
  },
  {
    id: 4,
    title: 'Database Keys',
    icon: <FaShieldAlt />,
    color: '#ef4444',
    description: 'Keys are used to establish and identify relationships between tables.',
    subtopics: [
      {
        title: 'Primary & Foreign Keys',
        content: 'Primary Key uniquely identifies a record. Foreign Key links two tables together by referencing the primary key of another table.',
        code: `-- Order table linking to Customers\nCREATE TABLE Orders (\n    OrderID INT PRIMARY KEY,\n    CustomerID INT,\n    FOREIGN KEY (CustomerID) REFERENCES Customers(ID)\n);`,
        output: 'FK Constraint added.'
      }
    ]
  },
  {
    id: 5,
    title: 'Normalization',
    icon: <FaSitemap />,
    color: '#14b8a6',
    description: 'Normalization is the process of organizing data in a database to reduce redundancy.',
    subtopics: [
      {
        title: '1NF, 2NF, 3NF',
        content: '1NF: Atomic values. 2NF: No partial dependency. 3NF: No transitive dependency. These steps ensure data integrity.',
        code: `-- Before Normalization (Mixed Data)\n-- [Student, Course, Teacher, Teacher_Phone]\n\n-- After 3NF (Split into tables)\n-- [Student_Course]\n-- [Course_Teacher]\n-- [Teacher_Phone]`,
        output: 'Redundancy Reduced.'
      }
    ]
  },
  {
    id: 6,
    title: 'SQL Joins',
    icon: <HiLightningBolt />,
    color: '#ec4899',
    description: 'Joins combine rows from two or more tables based on a related column.',
    subtopics: [
      {
        title: 'Inner, Left, Right Joins',
        content: 'Inner Join: Matches in both tables. Left Join: All from left + matches from right. Right Join: All from right + matches from left.',
        code: `SELECT Students.Name, Grades.Score\nFROM Students\nINNER JOIN Grades ON Students.ID = Grades.StudentID;`,
        output: 'Alice | 95\nBob   | 88'
      }
    ]
  },
  {
    id: 7,
    title: 'ACID Properties',
    icon: <FaShieldAlt />,
    color: '#8b5cf6',
    description: 'ACID properties ensure reliable database transactions.',
    subtopics: [
      {
        title: 'Atomicity, Consistency, Isolation, Durability',
        content: 'Atomicity: All or nothing. Consistency: Valid state. Isolation: Concurrent transactions don\'t interfere. Durability: Saved permanently.',
        code: `BEGIN TRANSACTION;\nUPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;\nUPDATE Accounts SET Balance = Balance + 100 WHERE ID = 2;\nCOMMIT;`,
        output: 'Transaction Completed.'
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
            <FaDatabase className="text-blue-400" /> SQL / DBMS
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
            ▶ Result
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
export default function LearnDBMS() {
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

  const filteredTopics = dbmsTopics.filter(topic =>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm font-medium" style={{ color: '#0ea5e9' }}>
            <FaDatabase className="text-blue-500 text-lg" />
            Learn Database Systems
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl mb-4">
            <span className="text-blue-500">DBMS</span>{' '}
            <span className="text-white">Tutorial</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Master the art of data management. Explore Relational Models, SQL queries, Normalization, and advanced database concepts.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-blue-400">{dbmsTopics.length}</div>
              <div className="text-xs text-gray-500">Modules</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-purple-400">{dbmsTopics.reduce((a, t) => a + t.subtopics.length, 0)}</div>
              <div className="text-xs text-gray-500">Lessons</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-green-400">30+</div>
              <div className="text-xs text-gray-500">SQL Examples</div>
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
              placeholder="Search DBMS topics... (e.g. SQL, joins, ACID, index)"
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
              <p className="text-gray-500 font-outfit">No DBMS topics found for "{searchQuery}"</p>
            </div>
        )}
      </div>
    </div>
  )
}
