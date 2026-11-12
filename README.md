# AlgoViz Pro – Interactive Algorithm Learning Platform

**AlgoViz Pro** is an educational engineering web application specifically engineered for **MSBTE Diploma (Computer Technology / Computer Engineering - Course Code 22317)**, Bachelor of Technology / B.E. Computer Science & IT students, and programming beginners preparing for Data Structures and Algorithms exams and technical interviews.

---

## 🌟 Core Modules

### 1. Visualization Engine
- **10 Fully Implemented Algorithms:**
  - **Beginner:** Bubble Sort, Selection Sort, Insertion Sort
  - **Intermediate:** Merge Sort, Quick Sort (Lomuto Partition), Shell Sort
  - **Advanced:** Heap Sort (Max-Heap), Counting Sort, Radix Sort (LSD Base 10), Bucket Sort
- **Two Visualization Modes:** Animated Vertical Bar Mode & Memory Cell Block Mode
- **Playback Controls:** Start, Pause, Resume, Step Forward, Step Backward, Restart, Reset, Shuffle
- **Speed Slider:** 0.2x to 5.0x with sub-millisecond precision
- **Dataset Generators:** Random, Already Sorted, Reverse Sorted, Nearly Sorted, Duplicates, and Custom Array Input
- **Dataset Sizes:** 10, 25, 50, 100, 250, 500 elements
- **Live Operation Inspector:** Displays current step, micro-operation type (Compare, Swap, Write, Pivot, Mark Sorted), and clear English explanation.
- **Audio Synthesizer:** Real-time Web Audio API harmonic tones corresponding to element values during comparisons and swaps.

### 2. Algorithm Learning & Viva Voce
- Definitions, working principles, real-world analogies, step-by-step logic
- Interactive flowchart diagrams
- Asymptotic mathematical proofs for Best, Average, and Worst Case Time Complexity
- In-place vs Out-of-place, Stability, and Adaptiveness analysis
- **MSBTE Diploma & University Viva Voce Examination Questions with Model Answers**

### 3. Code Learning Studio
- Source code implementations in **5 programming languages**:
  - C (GCC MSBTE Standard)
  - C++ (Clang / G++)
  - Java (OpenJDK)
  - Python 3
  - TypeScript
- **Interactive Line-by-Line breakdown**: click any line of code to see what it does, why it is required, which variables are modified, and its effect on the sorting process.
- Copy and download source code.

### 4. Interactive Code Playground
- Editable code editor with test-case runner
- Tests edge cases: already sorted, reverse sorted, duplicate values, single element, negative numbers
- Performance metrics: execution time, comparisons, swaps

### 5. Multi-Algorithm Comparison Lab
- Select 2 to 6 algorithms and benchmark them on the **exact same cloned dataset**
- Dynamic bar charts for total comparisons, swaps, writes, and measured durations
- Side-by-side asymptotic complexity vs empirical measurement matrix

### 6. Sorting in Real Software Systems
- Interactive enterprise modules with strict record preservation:
  1. **Student Management System:** Sort by Roll Number, Name, Semester Marks, Attendance %
  2. **E-Commerce Store:** Sort by Price, Customer Rating, Sales Popularity, Product Title
  3. **Library Accession System:** Sort by Title, Author, Publication Year, Accession Number
  4. **Banking Transaction Ledger:** Sort by Amount, Date, Reference ID
  5. **Hospital Emergency Triage:** Sort by Triage Urgency, Token Number, Patient Name
  6. **Warehouse Inventory:** Sort by Stock Quantity, Unit Price, Product ID

### 7. MSBTE Lab Practicals (Course 22317)
- 5 Complete Practicals: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- Aim, Prerequisites, Algorithm Steps, Flowchart Description, Complete C Program, Sample Input/Output, Conclusion, Viva Q&A
- Student completion tracking & printable lab manual sheet

### 8. Assessment Quiz Bank
- Filter by: Concepts, Complexity, Step Prediction, Code Analysis, Real-World
- Immediate explanations, 5-minute timed challenge mode, score calculation

### 9. Gamified Challenges
- Mystery algorithm identification from memory traces
- Next array state prediction
- Bug hunter: catch off-by-one errors and infinite loops
- Points and achievement tracking

### 10. AlgoBuddy AI Assistant
- Integrated with Google Gemini 3.8 Flash via secure server-side Express proxy (`/api/gemini/chat`)
- Never exposes API keys in frontend code
- Explains code line-by-line, demystifies recurrences, and conducts mock viva examinations

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Execution
```bash
# Clone the repository
git clone https://github.com/prathameshsutar140/sorting-visualizer.git
cd sorting-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🛡️ License
Distributed under the Apache 2.0 License.
