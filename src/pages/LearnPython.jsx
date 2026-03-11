import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPython, FaChevronDown, FaChevronRight, FaCopy, FaCheck, FaBook, FaCode, FaLaptopCode, FaRocket, FaSearch } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'

// ===== PYTHON TOPICS DATA =====
const pythonTopics = [
  {
    id: 1,
    title: 'Introduction to Python',
    icon: <FaPython />,
    color: '#3b82f6',
    description: 'Python is a powerful, easy-to-learn programming language. It has efficient high-level data structures and a simple approach to object-oriented programming.',
    subtopics: [
      {
        title: 'What is Python?',
        content: 'Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It emphasizes code readability and allows programmers to express concepts in fewer lines of code.',
        code: `# Your first Python program\nprint("Hello, World!")\n\n# Python is easy to read\nname = "SmartMath Arena"\nprint(f"Welcome to {name}!")`,
        output: 'Hello, World!\nWelcome to SmartMath Arena!'
      },
      {
        title: 'Why Learn Python?',
        content: 'Python is used in web development, data science, AI/ML, automation, game development, and more. It has a huge community and thousands of libraries.',
        code: `# Python can do many things!\n\n# Math\nresult = 10 + 20\nprint(result)  # 30\n\n# Strings\nmessage = "Python is awesome!"\nprint(message.upper())  # PYTHON IS AWESOME!`,
        output: '30\nPYTHON IS AWESOME!'
      },
      {
        title: 'Installing Python',
        content: 'Download Python from python.org. After installation, open terminal/command prompt and type "python" to start the interactive shell.',
        code: `# Check Python version in terminal\n# python --version\n# Python 3.12.0\n\n# Run a Python file\n# python my_script.py\n\n# Interactive mode\n>>> 2 + 3\n5\n>>> print("Hello")\nHello`,
        output: 'Python 3.12.0\n5\nHello'
      }
    ]
  },
  {
    id: 2,
    title: 'Variables & Data Types',
    icon: <FaCode />,
    color: '#a855f7',
    description: 'Variables store data values. Python has no command for declaring a variable — it is created the moment you assign a value to it.',
    subtopics: [
      {
        title: 'Creating Variables',
        content: 'Python variables don\'t need explicit declaration. The type is automatically assigned based on the value.',
        code: `# Variables in Python\nname = "Alice"          # str (string)\nage = 14                # int (integer)\nheight = 5.4            # float (decimal)\nis_student = True       # bool (boolean)\n\nprint(name)       # Alice\nprint(age)        # 14\nprint(height)     # 5.4\nprint(is_student) # True\n\n# Check type\nprint(type(name))   # <class 'str'>\nprint(type(age))    # <class 'int'>`,
        output: "Alice\n14\n5.4\nTrue\n<class 'str'>\n<class 'int'>"
      },
      {
        title: 'Data Types',
        content: 'Python has several built-in data types: str, int, float, bool, list, tuple, dict, set, NoneType.',
        code: `# String\ntext = "Hello Python"\n\n# Integer\nnum = 42\n\n# Float\npi = 3.14159\n\n# Boolean\nis_active = True\n\n# None (no value)\nresult = None\n\n# Type conversion\nnum_str = "100"\nnum_int = int(num_str)     # Convert string to int\nnum_float = float(num_str) # Convert to float\nback_to_str = str(num_int) # Convert to string\n\nprint(num_int)      # 100\nprint(num_float)    # 100.0\nprint(back_to_str)  # "100"`,
        output: '100\n100.0\n100'
      },
      {
        title: 'Multiple Assignment',
        content: 'You can assign values to multiple variables in a single line.',
        code: `# Multiple assignment\nx, y, z = 10, 20, 30\nprint(x, y, z)  # 10 20 30\n\n# Same value to multiple variables\na = b = c = 100\nprint(a, b, c)  # 100 100 100\n\n# Swap variables\nx, y = 1, 2\nx, y = y, x  # Swap!\nprint(x, y)  # 2 1`,
        output: '10 20 30\n100 100 100\n2 1'
      }
    ]
  },
  {
    id: 3,
    title: 'Operators',
    icon: <HiLightningBolt />,
    color: '#f59e0b',
    description: 'Operators are used to perform operations on variables and values. Python divides operators into arithmetic, comparison, logical, assignment, and more.',
    subtopics: [
      {
        title: 'Arithmetic Operators',
        content: 'Used for mathematical calculations: +, -, *, /, //, %, **',
        code: `a, b = 10, 3\n\nprint(a + b)    # 13  (Addition)\nprint(a - b)    # 7   (Subtraction)\nprint(a * b)    # 30  (Multiplication)\nprint(a / b)    # 3.33 (Division)\nprint(a // b)   # 3   (Floor Division)\nprint(a % b)    # 1   (Modulus/Remainder)\nprint(a ** b)   # 1000 (Power/Exponent)`,
        output: '13\n7\n30\n3.3333333333333335\n3\n1\n1000'
      },
      {
        title: 'Comparison Operators',
        content: 'Used to compare two values. Returns True or False.',
        code: `x, y = 10, 20\n\nprint(x == y)   # False (Equal)\nprint(x != y)   # True  (Not equal)\nprint(x > y)    # False (Greater than)\nprint(x < y)    # True  (Less than)\nprint(x >= 10)  # True  (Greater or equal)\nprint(x <= 5)   # False (Less or equal)`,
        output: 'False\nTrue\nFalse\nTrue\nTrue\nFalse'
      },
      {
        title: 'Logical Operators',
        content: 'Used to combine conditional statements: and, or, not',
        code: `a, b = True, False\n\nprint(a and b)    # False (both must be True)\nprint(a or b)     # True  (at least one True)\nprint(not a)      # False (reverses the value)\n\n# Practical example\nage = 15\nhas_id = True\ncan_enter = age >= 13 and has_id\nprint(can_enter)  # True`,
        output: 'False\nTrue\nFalse\nTrue'
      }
    ]
  },
  {
    id: 4,
    title: 'Strings',
    icon: <FaBook />,
    color: '#22c55e',
    description: 'Strings in Python are sequences of characters. They are immutable and support many built-in methods for manipulation.',
    subtopics: [
      {
        title: 'String Basics',
        content: 'Strings can be created using single quotes, double quotes, or triple quotes for multi-line strings.',
        code: `# Creating strings\nname = 'Alice'\ngreeting = "Hello, World!"\nmessage = """This is\na multi-line\nstring"""\n\n# String length\nprint(len(name))  # 5\n\n# Accessing characters\nprint(name[0])    # A (first character)\nprint(name[-1])   # e (last character)\n\n# Slicing\nprint(name[1:4])  # lic\nprint(name[:3])   # Ali\nprint(name[2:])   # ice`,
        output: '5\nA\ne\nlic\nAli\nice'
      },
      {
        title: 'String Methods',
        content: 'Python provides many built-in string methods for manipulation.',
        code: `text = "Hello, Python World!"\n\nprint(text.upper())       # HELLO, PYTHON WORLD!\nprint(text.lower())       # hello, python world!\nprint(text.title())       # Hello, Python World!\nprint(text.strip())       # Remove whitespace\nprint(text.replace("Python", "Amazing"))\n# Hello, Amazing World!\n\nprint(text.split(", "))   # ['Hello', 'Python World!']\nprint(text.find("Python"))# 7 (index)\nprint(text.count("l"))    # 3\nprint(text.startswith("Hello"))  # True\nprint(text.endswith("!"))        # True`,
        output: "HELLO, PYTHON WORLD!\nhello, python world!\nHello, Python World!\nHello, Python World!\nHello, Amazing World!\n['Hello', 'Python World!']\n7\n3\nTrue\nTrue"
      },
      {
        title: 'String Formatting',
        content: 'f-strings (formatted string literals) are the modern way to format strings in Python.',
        code: `name = "Alice"\nage = 14\nscore = 95.5\n\n# f-string (recommended)\nprint(f"Name: {name}, Age: {age}")\n# Name: Alice, Age: 14\n\n# Expressions inside f-strings\nprint(f"Next year: {age + 1}")\n# Next year: 15\n\n# Formatting numbers\nprint(f"Score: {score:.1f}%")\n# Score: 95.5%\n\nprint(f"Pi: {3.14159:.2f}")\n# Pi: 3.14\n\n# Padding\nfor i in range(1, 4):\n    print(f"{i:02d}. {name}")`,
        output: 'Name: Alice, Age: 14\nNext year: 15\nScore: 95.5%\nPi: 3.14\n01. Alice\n02. Alice\n03. Alice'
      }
    ]
  },
  {
    id: 5,
    title: 'Lists',
    icon: <FaCode />,
    color: '#ec4899',
    description: 'Lists are ordered, mutable collections that can hold items of different types. They are one of the most versatile data structures in Python.',
    subtopics: [
      {
        title: 'Creating & Accessing Lists',
        content: 'Lists are created using square brackets. Elements are accessed by index (starting from 0).',
        code: `# Creating lists\nfruits = ["apple", "banana", "cherry"]\nnumbers = [1, 2, 3, 4, 5]\nmixed = [1, "hello", True, 3.14]\n\n# Accessing elements\nprint(fruits[0])     # apple\nprint(fruits[-1])    # cherry (last)\nprint(fruits[1:3])   # ['banana', 'cherry']\n\n# Length\nprint(len(fruits))   # 3\n\n# Check if exists\nprint("apple" in fruits)  # True\nprint("mango" in fruits)  # False`,
        output: "apple\ncherry\n['banana', 'cherry']\n3\nTrue\nFalse"
      },
      {
        title: 'List Methods',
        content: 'Lists have many built-in methods for adding, removing, and manipulating elements.',
        code: `fruits = ["apple", "banana"]\n\n# Adding\nfruits.append("cherry")     # Add to end\nfruits.insert(1, "mango")   # Add at index 1\nprint(fruits)\n# ['apple', 'mango', 'banana', 'cherry']\n\n# Removing\nfruits.remove("banana")     # Remove by value\npopped = fruits.pop()       # Remove last\nprint(popped)  # cherry\n\n# Sorting\nnums = [3, 1, 4, 1, 5, 9]\nnums.sort()       # Sort ascending\nprint(nums)       # [1, 1, 3, 4, 5, 9]\nnums.reverse()    # Reverse\nprint(nums)       # [9, 5, 4, 3, 1, 1]`,
        output: "['apple', 'mango', 'banana', 'cherry']\ncherry\n[1, 1, 3, 4, 5, 9]\n[9, 5, 4, 3, 1, 1]"
      },
      {
        title: 'List Comprehension',
        content: 'A powerful one-liner to create new lists from existing ones.',
        code: `# Basic list comprehension\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n\n# With condition\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)  # [0, 2, 4, 6, 8]\n\n# String operation\nnames = ["alice", "bob", "charlie"]\nupper_names = [n.upper() for n in names]\nprint(upper_names)\n# ['ALICE', 'BOB', 'CHARLIE']\n\n# Nested\nmatrix = [[i*j for j in range(1,4)] for i in range(1,4)]\nprint(matrix)\n# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`,
        output: "[1, 4, 9, 16, 25]\n[0, 2, 4, 6, 8]\n['ALICE', 'BOB', 'CHARLIE']\n[[1, 2, 3], [2, 4, 6], [3, 6, 9]]"
      }
    ]
  },
  {
    id: 6,
    title: 'Tuples & Sets',
    icon: <FaCode />,
    color: '#06b6d4',
    description: 'Tuples are ordered, immutable collections. Sets are unordered collections of unique elements.',
    subtopics: [
      {
        title: 'Tuples',
        content: 'Tuples are like lists but immutable (cannot be changed after creation). Created with parentheses ().',
        code: `# Creating tuples\ncolors = ("red", "green", "blue")\npoint = (10, 20)\nsingle = (42,)  # Note the comma!\n\n# Accessing\nprint(colors[0])    # red\nprint(colors[-1])   # blue\nprint(colors[1:])   # ('green', 'blue')\n\n# Unpacking\nx, y = point\nprint(f"x={x}, y={y}")  # x=10, y=20\n\n# Tuples are immutable!\n# colors[0] = "yellow"  # ERROR!\n\n# Tuple methods\nprint(colors.count("red"))  # 1\nprint(colors.index("green"))  # 1`,
        output: "red\nblue\n('green', 'blue')\nx=10, y=20\n1\n1"
      },
      {
        title: 'Sets',
        content: 'Sets store unique elements only. They are unordered and support mathematical set operations.',
        code: `# Creating sets\nfruits = {"apple", "banana", "cherry"}\nnumbers = {1, 2, 3, 3, 2, 1}  # Duplicates removed\nprint(numbers)  # {1, 2, 3}\n\n# Adding & removing\nfruits.add("mango")\nfruits.remove("banana")\nprint(fruits)\n\n# Set operations\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a | b)   # Union: {1, 2, 3, 4, 5, 6}\nprint(a & b)   # Intersection: {3, 4}\nprint(a - b)   # Difference: {1, 2}\nprint(a ^ b)   # Symmetric diff: {1, 2, 5, 6}`,
        output: "{1, 2, 3}\n{'apple', 'cherry', 'mango'}\n{1, 2, 3, 4, 5, 6}\n{3, 4}\n{1, 2}\n{1, 2, 5, 6}"
      }
    ]
  },
  {
    id: 7,
    title: 'Dictionaries',
    icon: <FaBook />,
    color: '#f97316',
    description: 'Dictionaries store data in key-value pairs. They are ordered (Python 3.7+), mutable, and do not allow duplicate keys.',
    subtopics: [
      {
        title: 'Creating & Accessing',
        content: 'Dictionaries use curly braces {} with key: value pairs.',
        code: `# Creating a dictionary\nstudent = {\n    "name": "Alice",\n    "age": 14,\n    "grade": "9th",\n    "scores": [95, 88, 92]\n}\n\n# Accessing values\nprint(student["name"])       # Alice\nprint(student.get("age"))    # 14\nprint(student.get("school", "N/A"))  # N/A (default)\n\n# All keys and values\nprint(student.keys())\n# dict_keys(['name', 'age', 'grade', 'scores'])\nprint(student.values())\n# dict_values(['Alice', 14, '9th', [95, 88, 92]])`,
        output: "Alice\n14\nN/A\ndict_keys(['name', 'age', 'grade', 'scores'])\ndict_values(['Alice', 14, '9th', [95, 88, 92]])"
      },
      {
        title: 'Modifying Dictionaries',
        content: 'You can add, update, and remove key-value pairs easily.',
        code: `student = {"name": "Alice", "age": 14}\n\n# Update / Add\nstudent["age"] = 15          # Update\nstudent["school"] = "ABC"    # Add new\nstudent.update({"grade": "10th", "age": 16})\n\nprint(student)\n# {'name': 'Alice', 'age': 16, 'school': 'ABC', 'grade': '10th'}\n\n# Remove\ndel student["school"]\npopped = student.pop("grade")\nprint(popped)  # 10th\n\n# Loop through dictionary\nfor key, value in student.items():\n    print(f"{key}: {value}")`,
        output: "{'name': 'Alice', 'age': 16, 'school': 'ABC', 'grade': '10th'}\n10th\nname: Alice\nage: 16"
      },
      {
        title: 'Dictionary Comprehension',
        content: 'Create dictionaries using a single expression.',
        code: `# Basic comprehension\nsquares = {x: x**2 for x in range(1, 6)}\nprint(squares)\n# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# From two lists\nkeys = ["name", "age", "city"]\nvalues = ["Alice", 14, "Delhi"]\ninfo = dict(zip(keys, values))\nprint(info)\n# {'name': 'Alice', 'age': 14, 'city': 'Delhi'}\n\n# Filtering\nscores = {"math": 95, "science": 72, "english": 88}\nhigh = {k: v for k, v in scores.items() if v >= 80}\nprint(high)  # {'math': 95, 'english': 88}`,
        output: "{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n{'name': 'Alice', 'age': 14, 'city': 'Delhi'}\n{'math': 95, 'english': 88}"
      }
    ]
  },
  {
    id: 8,
    title: 'Conditionals (if/else)',
    icon: <FaCode />,
    color: '#8b5cf6',
    description: 'Conditional statements allow you to execute different blocks of code based on conditions.',
    subtopics: [
      {
        title: 'if, elif, else',
        content: 'Python uses indentation to define code blocks instead of curly braces.',
        code: `age = 15\n\nif age >= 18:\n    print("Adult")\nelif age >= 13:\n    print("Teenager")\nelse:\n    print("Child")\n# Output: Teenager\n\n# Nested if\nscore = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"Score: {score}, Grade: {grade}")\n# Score: 85, Grade: B`,
        output: 'Teenager\nScore: 85, Grade: B'
      },
      {
        title: 'Ternary Operator',
        content: 'Short-hand if-else in a single line.',
        code: `# Ternary operator\nage = 20\nstatus = "Adult" if age >= 18 else "Minor"\nprint(status)  # Adult\n\n# With assignment\nx = 10\ny = 20\nmax_val = x if x > y else y\nprint(f"Max: {max_val}")  # Max: 20\n\n# In a list\nnumbers = [1, -2, 3, -4, 5]\nresult = ["positive" if n > 0 else "negative" for n in numbers]\nprint(result)\n# ['positive', 'negative', 'positive', 'negative', 'positive']`,
        output: "Adult\nMax: 20\n['positive', 'negative', 'positive', 'negative', 'positive']"
      }
    ]
  },
  {
    id: 9,
    title: 'Loops',
    icon: <FaRocket />,
    color: '#ef4444',
    description: 'Loops allow you to execute a block of code repeatedly. Python has two types: for and while loops.',
    subtopics: [
      {
        title: 'for Loop',
        content: 'Used to iterate over sequences (list, string, range, etc.).',
        code: `# Loop through a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# Using range()\nfor i in range(5):\n    print(i, end=" ")  # 0 1 2 3 4\nprint()\n\n# range(start, stop, step)\nfor i in range(2, 10, 2):\n    print(i, end=" ")  # 2 4 6 8\nprint()\n\n# Enumerate (index + value)\ncolors = ["red", "green", "blue"]\nfor i, color in enumerate(colors):\n    print(f"{i}: {color}")`,
        output: 'apple\nbanana\ncherry\n0 1 2 3 4\n2 4 6 8\n0: red\n1: green\n2: blue'
      },
      {
        title: 'while Loop',
        content: 'Repeats as long as a condition is True.',
        code: `# Basic while loop\ncount = 0\nwhile count < 5:\n    print(count, end=" ")\n    count += 1\n# Output: 0 1 2 3 4\nprint()\n\n# With break\nfor i in range(10):\n    if i == 5:\n        break  # Stop the loop\n    print(i, end=" ")\n# Output: 0 1 2 3 4\nprint()\n\n# With continue\nfor i in range(6):\n    if i == 3:\n        continue  # Skip this iteration\n    print(i, end=" ")\n# Output: 0 1 2 4 5`,
        output: '0 1 2 3 4\n0 1 2 3 4\n0 1 2 4 5'
      },
      {
        title: 'Nested Loops',
        content: 'A loop inside another loop. The inner loop runs completely for each iteration of the outer loop.',
        code: `# Multiplication table\nfor i in range(1, 4):\n    for j in range(1, 4):\n        print(f"{i}x{j}={i*j}", end="\\t")\n    print()  # New line\n\n# Pattern printing\nfor i in range(1, 6):\n    print("*" * i)\n\n# Finding pairs\nnums = [1, 2, 3]\nfor a in nums:\n    for b in nums:\n        if a != b:\n            print(f"({a},{b})", end=" ")`,
        output: '1x1=1\t1x2=2\t1x3=3\n2x1=2\t2x2=4\t2x3=6\n3x1=3\t3x2=6\t3x3=9\n*\n**\n***\n****\n*****\n(1,2) (1,3) (2,1) (2,3) (3,1) (3,2)'
      }
    ]
  },
  {
    id: 10,
    title: 'Functions',
    icon: <FaLaptopCode />,
    color: '#14b8a6',
    description: 'Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.',
    subtopics: [
      {
        title: 'Defining Functions',
        content: 'Use the def keyword to create a function. Functions can take parameters and return values.',
        code: `# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\nresult = greet("Alice")\nprint(result)  # Hello, Alice!\n\n# Multiple parameters\ndef add(a, b):\n    return a + b\n\nprint(add(5, 3))     # 8\nprint(add(10, 20))   # 30\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(5))      # 25 (5^2)\nprint(power(2, 8))   # 256 (2^8)`,
        output: 'Hello, Alice!\n8\n30\n25\n256'
      },
      {
        title: '*args and **kwargs',
        content: '*args captures extra positional arguments as a tuple. **kwargs captures keyword arguments as a dictionary.',
        code: `# *args - variable number of arguments\ndef total(*numbers):\n    return sum(numbers)\n\nprint(total(1, 2, 3))       # 6\nprint(total(10, 20, 30, 40)) # 100\n\n# **kwargs - keyword arguments\ndef info(**details):\n    for key, value in details.items():\n        print(f"{key}: {value}")\n\ninfo(name="Alice", age=14, city="Delhi")\n# name: Alice\n# age: 14\n# city: Delhi\n\n# Combined\ndef show(title, *items, **options):\n    print(f"--- {title} ---")\n    for item in items:\n        print(f"  - {item}")\n    for k, v in options.items():\n        print(f"  [{k}]: {v}")\n\nshow("Menu", "Pizza", "Pasta", price="$10")`,
        output: '6\n100\nname: Alice\nage: 14\ncity: Delhi\n--- Menu ---\n  - Pizza\n  - Pasta\n  [price]: $10'
      },
      {
        title: 'Lambda Functions',
        content: 'Small anonymous functions defined with the lambda keyword. Useful for short, single-expression functions.',
        code: `# Lambda function\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n\nadd = lambda a, b: a + b\nprint(add(3, 7))  # 10\n\n# Lambda with built-in functions\nnumbers = [3, 1, 4, 1, 5, 9]\n\n# Sort by custom key\nwords = ["banana", "apple", "cherry"]\nwords.sort(key=lambda w: len(w))\nprint(words)  # ['apple', 'banana', 'cherry']\n\n# Filter\nevens = list(filter(lambda x: x % 2 == 0, range(10)))\nprint(evens)  # [0, 2, 4, 6, 8]\n\n# Map\ndoubled = list(map(lambda x: x * 2, [1, 2, 3, 4]))\nprint(doubled)  # [2, 4, 6, 8]`,
        output: "25\n10\n['apple', 'banana', 'cherry']\n[0, 2, 4, 6, 8]\n[2, 4, 6, 8]"
      }
    ]
  },
  {
    id: 11,
    title: 'OOP (Classes & Objects)',
    icon: <FaRocket />,
    color: '#6366f1',
    description: 'Object-Oriented Programming lets you create classes that bundle data and functionality together.',
    subtopics: [
      {
        title: 'Classes & Objects',
        content: 'A class is a blueprint for creating objects. Objects have attributes (data) and methods (functions).',
        code: `class Student:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n        self.grades = []\n\n    def add_grade(self, grade):\n        self.grades.append(grade)\n\n    def average(self):\n        if self.grades:\n            return sum(self.grades) / len(self.grades)\n        return 0\n\n    def display(self):\n        avg = self.average()\n        print(f"{self.name} (Age: {self.age}) - Avg: {avg:.1f}")\n\n# Creating objects\ns1 = Student("Alice", 14)\ns1.add_grade(95)\ns1.add_grade(88)\ns1.add_grade(92)\ns1.display()  # Alice (Age: 14) - Avg: 91.7\n\ns2 = Student("Bob", 15)\ns2.add_grade(78)\ns2.display()  # Bob (Age: 15) - Avg: 78.0`,
        output: 'Alice (Age: 14) - Avg: 91.7\nBob (Age: 15) - Avg: 78.0'
      },
      {
        title: 'Inheritance',
        content: 'Inheritance allows a class to inherit attributes and methods from another class.',
        code: `class Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n\n    def speak(self):\n        print(f"{self.name} says {self.sound}!")\n\nclass Dog(Animal):\n    def __init__(self, name):\n        super().__init__(name, "Woof")\n\n    def fetch(self):\n        print(f"{self.name} fetches the ball!")\n\nclass Cat(Animal):\n    def __init__(self, name):\n        super().__init__(name, "Meow")\n\n    def purr(self):\n        print(f"{self.name} is purring...")\n\n# Using inheritance\ndog = Dog("Buddy")\ndog.speak()    # Buddy says Woof!\ndog.fetch()    # Buddy fetches the ball!\n\ncat = Cat("Whiskers")\ncat.speak()    # Whiskers says Meow!\ncat.purr()     # Whiskers is purring...`,
        output: 'Buddy says Woof!\nBuddy fetches the ball!\nWhiskers says Meow!\nWhiskers is purring...'
      }
    ]
  },
  {
    id: 12,
    title: 'File Handling',
    icon: <FaBook />,
    color: '#0ea5e9',
    description: 'Python can read, create, update, and delete files. The open() function is used to work with files.',
    subtopics: [
      {
        title: 'Reading & Writing Files',
        content: 'Use open() with modes: "r" (read), "w" (write), "a" (append), "x" (create).',
        code: `# Writing to a file\nwith open("data.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("Python is awesome!\\n")\n    f.write("Line 3")\n\n# Reading entire file\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# Reading line by line\nwith open("data.txt", "r") as f:\n    for line in f:\n        print(line.strip())\n\n# Appending\nwith open("data.txt", "a") as f:\n    f.write("\\nNew line added!")\n\n# Reading into a list\nwith open("data.txt", "r") as f:\n    lines = f.readlines()\n    print(f"Total lines: {len(lines)}")`,
        output: 'Hello, World!\nPython is awesome!\nLine 3\nHello, World!\nPython is awesome!\nLine 3\nTotal lines: 4'
      }
    ]
  },
  {
    id: 13,
    title: 'Exception Handling',
    icon: <HiLightningBolt />,
    color: '#e11d48',
    description: 'Exception handling lets you deal with errors gracefully using try/except blocks, preventing program crashes.',
    subtopics: [
      {
        title: 'try / except / finally',
        content: 'Wrap risky code in try block. Catch specific errors with except.',
        code: `# Basic try/except\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\n\n# Multiple exceptions\ntry:\n    num = int("abc")\nexcept ValueError:\n    print("Invalid number!")\nexcept TypeError:\n    print("Type error!")\n\n# Catch all\ntry:\n    x = [1, 2, 3]\n    print(x[10])\nexcept Exception as e:\n    print(f"Error: {e}")\n\n# try/except/else/finally\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("Error!")\nelse:\n    print(f"Result: {result}")  # Runs if no error\nfinally:\n    print("Done!")  # Always runs`,
        output: 'Cannot divide by zero!\nInvalid number!\nError: list index out of range\nResult: 5.0\nDone!'
      },
      {
        title: 'Raising Exceptions',
        content: 'You can raise your own exceptions using the raise keyword.',
        code: `# Raise an exception\ndef set_age(age):\n    if age < 0:\n        raise ValueError("Age cannot be negative!")\n    if age > 150:\n        raise ValueError("Age is too high!")\n    print(f"Age set to: {age}")\n\ntry:\n    set_age(25)    # Age set to: 25\n    set_age(-5)    # Raises ValueError\nexcept ValueError as e:\n    print(f"Error: {e}")\n\n# Custom exception class\nclass GameOverError(Exception):\n    def __init__(self, score):\n        self.score = score\n        super().__init__(f"Game Over! Score: {score}")\n\ntry:\n    raise GameOverError(42)\nexcept GameOverError as e:\n    print(e)  # Game Over! Score: 42`,
        output: 'Age set to: 25\nError: Age cannot be negative!\nGame Over! Score: 42'
      }
    ]
  },
  {
    id: 14,
    title: 'Modules & Imports',
    icon: <FaLaptopCode />,
    color: '#84cc16',
    description: 'Modules are Python files containing functions and variables. They help organize code into reusable packages.',
    subtopics: [
      {
        title: 'Using Modules',
        content: 'Import built-in or third-party modules to use their functionality.',
        code: `# Import entire module\nimport math\nprint(math.sqrt(144))    # 12.0\nprint(math.pi)           # 3.14159...\nprint(math.ceil(4.2))    # 5\nprint(math.floor(4.8))   # 4\n\n# Import specific functions\nfrom random import randint, choice\nprint(randint(1, 100))   # Random number 1-100\nprint(choice(["a", "b", "c"]))  # Random choice\n\n# Import with alias\nimport datetime as dt\nnow = dt.datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M"))\n\n# os module\nimport os\nprint(os.getcwd())  # Current directory`,
        output: '12.0\n3.141592653589793\n5\n4\n42\nb\n2026-03-11 22:52\nc:\\Users\\user'
      },
      {
        title: 'Creating Your Own Module',
        content: 'Create a .py file with functions and import it in other files.',
        code: `# --- mymath.py ---\ndef add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nPI = 3.14159\n\n# --- main.py ---\nimport mymath\n\nprint(mymath.add(5, 3))       # 8\nprint(mymath.multiply(4, 7))  # 28\nprint(mymath.PI)              # 3.14159\n\n# Or import specific items\nfrom mymath import add, PI\nprint(add(10, 20))  # 30\nprint(PI)           # 3.14159`,
        output: '8\n28\n3.14159\n30\n3.14159'
      }
    ]
  },
  {
    id: 15,
    title: 'Useful Built-in Functions',
    icon: <FaRocket />,
    color: '#d946ef',
    description: 'Python has many powerful built-in functions that make programming easier and more efficient.',
    subtopics: [
      {
        title: 'Essential Built-ins',
        content: 'Functions like map, filter, zip, enumerate, sorted, etc. are incredibly useful.',
        code: `# map - apply function to each item\nnums = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, nums))\nprint(squared)  # [1, 4, 9, 16, 25]\n\n# filter - keep items that match\nadults = list(filter(lambda x: x >= 18, [15, 22, 17, 25, 13]))\nprint(adults)  # [22, 25]\n\n# zip - combine lists\nnames = ["Alice", "Bob"]\nscores = [95, 88]\npaired = list(zip(names, scores))\nprint(paired)  # [('Alice', 95), ('Bob', 88)]\n\n# sorted with key\nstudents = [("Bob", 88), ("Alice", 95), ("Charlie", 72)]\nby_score = sorted(students, key=lambda s: s[1], reverse=True)\nprint(by_score)\n# [('Alice', 95), ('Bob', 88), ('Charlie', 72)]\n\n# any & all\nprint(any([False, True, False]))  # True\nprint(all([True, True, False]))   # False`,
        output: "[1, 4, 9, 16, 25]\n[22, 25]\n[('Alice', 95), ('Bob', 88)]\n[('Alice', 95), ('Bob', 88), ('Charlie', 72)]\nTrue\nFalse"
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
            <FaPython className="text-yellow-400" /> Python
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
export default function LearnPython() {
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
  const filteredTopics = pythonTopics.filter(topic =>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-4 text-sm font-medium" style={{ color: '#3b82f6' }}>
            <FaPython className="text-yellow-400 text-lg" />
            Learn Python Programming
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl mb-4">
            <span className="text-yellow-400">Python</span>{' '}
            <span className="text-white">Tutorial</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete Python course with {pythonTopics.length} topics, examples, and code you can copy & run. From basics to OOP!
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-arena-neon">{pythonTopics.length}</div>
              <div className="text-xs text-gray-500">Topics</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-purple-400">{pythonTopics.reduce((a, t) => a + t.subtopics.length, 0)}</div>
              <div className="text-xs text-gray-500">Lessons</div>
            </div>
            <div className="text-center">
              <div className="font-outfit font-black text-2xl text-yellow-400">100+</div>
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
            placeholder="Search topics... (e.g. loops, functions, lists)"
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
            <p className="text-gray-500 font-outfit">No topics found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
