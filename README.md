# ⚡ AlgoViz Pro – Interactive Sorting Algorithm Learning Platform

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-4.x-white.svg?logo=express)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8e75ff.svg?logo=google)](https://ai.google.dev/)
[![MSBTE 22317](https://img.shields.io/badge/MSBTE_Course-22317_Aligned-10b981.svg)](https://msbte.org.in/)

> 🌟 **AlgoViz Pro** is a friendly, easy-to-use web application to learn how sorting algorithms work inside computer memory.  
> 🎓 **Specially designed for:** MSBTE Diploma students (Course **22317: Data Structures Using 'C'**), Computer Engineering students, IT students, and programming beginners preparing for exams and interviews.

---

## 📑 Quick Table of Contents

- [🌟 1. What is AlgoViz Pro?](#-1-what-is-algoviz-pro)
- [🎯 2. Four Ways You Will Learn](#-2-four-ways-you-will-learn)
- [🚀 3. Easy Step-by-Step Setup Guide](#-3-easy-step-by-step-setup-guide)
  - [Prerequisites](#-prerequisites)
  - [Step 1: Download or Clone the Project](#step-1-download-or-clone-the-project)
  - [Step 2: Install Packages](#step-2-install-packages)
  - [Step 3: Setup Settings (.env)](#step-3-setup-settings-env)
  - [Step 4: Start the App](#step-4-start-the-app)
  - [Step 5: Build for Production](#step-5-build-for-production)
  - [Common Questions & Fixes](#-common-questions--fixes)
- [📊 4. 10 Sorting Algorithms & Speed Comparison Table](#-4-10-sorting-algorithms--speed-comparison-table)
- [🧩 5. All 10 Cool Features Inside AlgoViz Pro](#-5-all-10-cool-features-inside-algoviz-pro)
- [🎓 6. MSBTE Diploma (Course 22317) Practical Mapping](#-6-msbte-diploma-course-22317-practical-mapping)
- [💻 7. Tech Stack Used](#-7-tech-stack-used)
- [⌨️ 8. Easy Keyboard Shortcuts](#-8-easy-keyboard-shortcuts)
- [📁 9. Folder Structure Explained](#-9-folder-structure-explained)
- [📚 10. More Help & Documentation Guides](#-10-more-help--documentation-guides)
- [📜 11. License & Credits](#-11-license--credits)

---

## 🌟 1. What is AlgoViz Pro?

Most sorting visualizers on the internet show fake animations. When you want to see what happens in a real computer, they don't show the real steps.

**AlgoViz Pro runs real code in real-time!**
- 🔍 See each number get compared and swapped one by one.
- ⏪ **Move backward and forward:** Pause anytime and scrub back to earlier steps!
- 🎧 **Sound Effects:** Hear the pitches go from low to high as the numbers get sorted.
- 💻 **Real Code:** Read code in **C, C++, Java, Python, and TypeScript**.
- 📋 **MSBTE Practicals:** Get complete C programs with viva questions and printable lab sheets.

---

## 🎯 2. Four Ways You Will Learn

| Icon | Learning Pillar | How It Helps You |
|:---:|---|---|
| 👁️ | **1. Visual Learning** | Watch bars move and memory cells highlight in real-time so you never have to memorize blindly. |
| 💻 | **2. Code Learning** | Click any line of code to see what it does, why it is needed, and which variable changes. |
| ⏱️ | **3. Performance Testing** | Run multiple algorithms on the exact same numbers to see which one is fastest. |
| 🏢 | **4. Real-World Systems** | See how sorting is used in Student Marks systems, E-Commerce, Banking, and Hospitals without mixing up records. |

---

## 🚀 3. Easy Step-by-Step Setup Guide

Follow these 5 simple steps to run AlgoViz Pro on your computer.

### 📋 Prerequisites
Make sure you have these two free programs installed:
1. **Node.js** (Version 18 or newer) 👉 [Download from nodejs.org](https://nodejs.org/)
2. **Git** 👉 [Download from git-scm.com](https://git-scm.com/)

You can check if they are installed by typing these commands in your terminal or Command Prompt:
```bash
node -v
npm -v
git --version
```

---

### Step 1: Download or Clone the Project
Open your terminal (or Command Prompt) and type:

```bash
# Clone the repository
git clone https://github.com/prathameshsutar140/sorting-visualizer.git

# Go into the project folder
cd sorting-visualizer
```

---

### Step 2: Install Packages
Download and install all needed libraries:

```bash
npm install
```
*(This takes about 15–30 seconds to finish).*

---

### Step 3: Setup Settings (.env)
Copy the example settings file:

```bash
# On Linux / macOS / Git Bash:
cp .env.example .env

# On Windows Command Prompt:
copy .env.example .env
```

Your `.env` file will look like this:
```env
PORT=3000
GEMINI_API_KEY=""
APP_URL="http://localhost:3000"
```

> 💡 **Good News:** You **do not** need an API key to run AlgoViz Pro!  
> If you leave `GEMINI_API_KEY=""` empty, AlgoViz Pro automatically uses its built-in offline educational tutor to answer all your DSA and viva questions.

---

### Step 4: Start the App
Start the development server:

```bash
npm run dev
```

Now open your web browser (Chrome, Edge, Firefox, or Safari) and go to:
👉 **`http://localhost:3000`**

🎉 **That's it! AlgoViz Pro is now running on your computer!**

---

### Step 5: Build for Production
When you are ready to create an optimized production version:

```bash
# 1. Compile the code
npm run build

# 2. Run the production server
npm start
```

---

### ❓ Common Questions & Fixes

- **Q: Port 3000 is already in use?**  
  👉 **Fix:** Open `.env` and change `PORT=3000` to `PORT=3001`, then run `npm run dev`.
- **Q: I don't hear any sound?**  
  👉 **Fix:** Browsers require you to click on the page first before playing sound. Click anywhere on the screen or click the **Sound** button at the top!
- **Q: Can I use this offline without internet?**  
  👉 **Fix:** Yes! 100% of the visualizer, code studio, comparison lab, practicals, quiz, and offline AI tutor work completely offline.

---

## 📊 4. 10 Sorting Algorithms & Speed Comparison Table

Here is a simple cheat-sheet of all 10 algorithms implemented in the app:

| # | Algorithm | Level | Best Time | Average Time | Worst Time | Extra Memory | Keeps Order? (Stable) | In-Place? | MSBTE Practical |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 🫧 **Bubble Sort** | Beginner | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ Yes | ✅ Yes | 📝 Practical 01 |
| 2 | 🎯 **Selection Sort** | Beginner | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ❌ No | ✅ Yes | 📝 Practical 02 |
| 3 | 🃏 **Insertion Sort** | Beginner | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ Yes | ✅ Yes | 📝 Practical 03 |
| 4 | 🔀 **Merge Sort** | Medium | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | ✅ Yes | ❌ No | 📝 Practical 04 |
| 5 | ⚡ **Quick Sort** | Medium | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | ❌ No | ✅ Yes | 📝 Practical 05 |
| 6 | 🐚 **Shell Sort** | Medium | $O(n \log n)$ | $O(n^{1.3})$ | $O(n^2)$ | $O(1)$ | ❌ No | ✅ Yes | 💡 Theory Guide |
| 7 | 🌳 **Heap Sort** | Advanced | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | ❌ No | ✅ Yes | 💡 Theory Guide |
| 8 | 🔢 **Counting Sort** | Advanced | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | ✅ Yes | ❌ No | 💡 Non-Comparison |
| 9 | 🎴 **Radix Sort** | Advanced | $O(d \cdot n)$ | $O(d \cdot n)$ | $O(d \cdot n)$ | $O(n + b)$ | ✅ Yes | ❌ No | 💡 Non-Comparison |
| 10 | 🪣 **Bucket Sort** | Advanced | $O(n + k)$ | $O(n + k)$ | $O(n^2)$ | $O(n + k)$ | ✅ Yes | ❌ No | 💡 Distribution |

### 💡 Simple Explanations:
- **Best Time:** How fast it runs when the numbers are already sorted.
- **Worst Time:** How slow it gets in the worst possible order (like reverse order).
- **Stable:** If two items have the same value (e.g. two `5`s), a stable sort keeps their original order.
- **In-Place:** Does not need extra memory arrays to sort.

---

## 🧩 5. All 10 Cool Features Inside AlgoViz Pro

### 1. 🎛️ Interactive Visualizer
- **Two Visual Modes:**
  - 📊 **Bar Mode:** Vertical colored bars that rise and fall.
  - 🧱 **Array Mode:** Memory blocks showing index numbers (`0, 1, 2...`) and pointer tags (`CMP`, `SWAP`, `PIVOT`, `✓`).
- **Timeline Scrubber:** Drag the slider backward or forward to inspect any step!
- **Play Controls:** Play, Pause, Single Step, Restart from zero, and Shuffle.
- **Dataset Sizes:** 10, 25, 50, 100, 250, or 500 items.
- **Custom Input:** Type in your own numbers (e.g. `64, 34, 25, 12, 22, 11, 90`).

### 2. 📖 Learn & Viva Voce Masterclass
- Clear textbook definitions and step-by-step logic.
- 📐 **Interactive Flowcharts** showing how decisions are made.
- 🎓 **MSBTE Viva Voce Q&A:** The exact questions teachers ask during oral exams, with perfect answers.

### 3. 💻 Code Studio (5 Languages)
- View full source code in **C, C++, Java, Python, and TypeScript**.
- 🔍 **Click Any Line:** A drawer pops up explaining:
  1. *What this line does*
  2. *Why it is needed*
  3. *Which variable it changes*
- Download the code files directly with one click!

### 4. 🧪 Code Playground & Test Runner
- Write your own sorting code directly in the browser!
- 🤖 **Auto-Test Runner:** Automatically tests your code against 5 tricky cases:
  1. Regular unsorted array
  2. Already sorted array
  3. Reverse sorted array
  4. Array with duplicates
  5. Array with negative numbers (`-5, -1, 0, 4`)

### 5. ⚖️ Comparison Benchmark Lab
- Pick 2 to 6 algorithms and run them at the same time on the **exact same array**.
- See bar charts showing who did fewer comparisons and fewer swaps.

### 6. 🏢 Real-World Software Systems
Learn how sorting works in real applications without scrambling data:
1. 🎓 **Student System:** Sort by Roll Number, Marks %, or Attendance %.
2. 🛒 **E-Commerce Shop:** Sort by Price (₹), Customer Rating, or Best Seller.
3. 📚 **Library Catalog:** Sort by Book Title, Author, or Year.
4. 🏦 **Bank Ledger:** Sort by Date, Amount (₹), or Transaction ID.
5. 🏥 **Hospital Emergency:** Sort patients by Urgency (Emergency, Priority, Normal).
6. 📦 **Warehouse Inventory:** Sort items by Stock count or Price.

### 7. 📄 MSBTE Lab Practicals (Course 22317)
- Contains complete guides for all 5 diploma practicals (Bubble, Selection, Insertion, Merge, Quick Sort).
- Includes: Aim, Theory, Algorithm steps, Full C Program, Sample Output, and Viva questions.
- 🖨️ **Printable Lab Sheet:** Click "Print / Export PDF" to print a clean lab manual page ready to submit to your teacher!

### 8. ❓ Interactive DSA Quiz
- Multiple-choice questions to test your knowledge.
- Timed 5-minute practice mode.
- Instant score, review, and explanations.

### 9. 🏆 Challenge Quests & Puzzles
- 🕵️ **Mystery Algorithm:** Guess the algorithm by watching it swap!
- 🔮 **State Prediction:** Guess what the array will look like after pass 2.
- 🐛 **Bug Hunter:** Find the small bug inside broken code.
- Win points and see confetti explosions when you finish!

### 10. 🤖 AlgoBuddy AI Assistant
- Click **AlgoBuddy AI** at the top right.
- Ask any question about sorting, time complexity, or viva preparation.
- Powered by Google Gemini 3.8 Flash (with automatic offline backup).

---

## 🎓 6. MSBTE Diploma (Course 22317) Practical Mapping

| Practical No. | Algorithm | Syllabus Chapter | Viva Voce Focus |
|:---:|---|---|---|
| **Practical 01** | 🫧 Bubble Sort | Chapter 4: Searching & Sorting | Adjacent swaps, early stopping with flag |
| **Practical 02** | 🎯 Selection Sort | Chapter 4: Searching & Sorting | Finding minimum, swap count ($O(n)$) |
| **Practical 03** | 🃏 Insertion Sort | Chapter 4: Searching & Sorting | Shifting elements, best-case $\Omega(n)$ |
| **Practical 04** | 🔀 Merge Sort | Chapter 4: Searching & Sorting | Divide and Conquer, extra memory $O(n)$ |
| **Practical 05** | ⚡ Quick Sort | Chapter 4: Searching & Sorting | Pivot selection, partitioning, worst-case $O(n^2)$ |

---

## 💻 7. Tech Stack Used

- ⚛️ **Frontend:** React 19 + TypeScript
- ⚡ **Build Tool:** Vite 8 (Ultra fast)
- 🎨 **Styling:** Tailwind CSS 4 (Developer dark theme)
- 🎵 **Sound:** Web Audio API (Musical pitch synthesis)
- 🖥️ **Backend:** Node.js + Express
- 🧠 **AI Tutor:** Google Gemini 3.8 Flash (`@google/genai`)
- 📦 **Icons:** Lucide React

---

## ⌨️ 8. Easy Keyboard Shortcuts

| Shortcut Key | What it Does |
|---|---|
| `Ctrl + K` or `Cmd + K` | 🔍 Open Quick Search box |
| `Spacebar` | ⏯️ Play or Pause the sorting animation |
| `Right Arrow` ($\rightarrow$) | ⏭️ Go 1 step forward |
| `Left Arrow` ($\leftarrow$) | ⏮️ Go 1 step backward |
| `R` | 🔄 Restart from step 0 |
| `S` | 🔀 Shuffle array with new random numbers |
| `M` | 🔇 Turn sound effects ON or OFF |
| `Esc` | ❌ Close any open dialog box |

---

## 📁 9. Folder Structure Explained

```
algoviz-pro/
├── .env.example              # Example file for settings
├── README.md                 # This guide you are reading
├── package.json              # List of dependencies and npm scripts
├── server.ts                 # Full-stack backend server (API & AI proxy)
├── docs/                     # Extra in-depth guides
│   ├── INSTALLATION.md       # Detailed setup & Docker guide
│   ├── SYSTEM_ARCHITECTURE.md# How events and audio are generated
│   ├── FEATURES.md           # Deep dive into all 10 features
│   ├── API_DOCUMENTATION.md  # Backend REST API endpoints
│   ├── USER_GUIDE.md         # Guide for students and teachers
│   ├── TESTING.md            # Test cases and quality checklist
│   ├── DEPLOYMENT.md         # How to host on Cloud Run / VPS
│   └── PROJECT_OVERVIEW.md   # Syllabus alignment & philosophy
└── src/
    ├── App.tsx               # Main app page coordinator
    ├── algorithms/
    │   └── engine.ts         # Real code for all 10 sorting algorithms
    ├── data/
    │   ├── algorithmsData.ts # Theory, viva questions & 5-language code
    │   ├── practicalsData.ts # MSBTE 22317 complete lab manuals
    │   ├── realWorldData.ts  # Enterprise data (Students, Bank, Hospital)
    │   ├── quizData.ts       # Practice questions
    │   └── challengesData.ts # Fun quests and puzzle games
    ├── utils/
    │   ├── audio.ts          # Musical sound generator
    │   └── storage.ts        # Saves student XP, streak, and settings
    └── components/           # UI components for all views and modals
```

---

## 📚 10. More Help & Documentation Guides

If you want to read deeper technical details, check out these guides in the `/docs` folder:

- 📖 [**PROJECT_OVERVIEW.md**](./docs/PROJECT_OVERVIEW.md) – Academic background and curriculum details.
- 🛠️ [**INSTALLATION.md**](./docs/INSTALLATION.md) – Docker instructions and troubleshooting help.
- 🏗️ [**SYSTEM_ARCHITECTURE.md**](./docs/SYSTEM_ARCHITECTURE.md) – Software architecture and event diagrams.
- ⭐ [**FEATURES.md**](./docs/FEATURES.md) – Complete list of all features.
- 🔌 [**API_DOCUMENTATION.md**](./docs/API_DOCUMENTATION.md) – How the backend API works.
- 🧑‍🎓 [**USER_GUIDE.md**](./docs/USER_GUIDE.md) – Guide for teachers and students.
- 🧪 [**TESTING.md**](./docs/TESTING.md) – Unit tests and edge case verification.
- 🚢 [**DEPLOYMENT.md**](./docs/DEPLOYMENT.md) – How to deploy online for your college.

---

## 📜 11. License & Credits

- **License:** Apache License 2.0 (Free to use, learn from, and share).
- **Created For:** MSBTE Diploma & Engineering students across the globe.
- **Original Repository:** [https://github.com/prathameshsutar140/sorting-visualizer](https://github.com/prathameshsutar140/sorting-visualizer)

🎉 **Happy Learning and Best of Luck for Your Examinations!**
