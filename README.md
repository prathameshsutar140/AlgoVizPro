# AlgoViz Pro – Interactive Sorting Algorithm Learning & Visualization Platform

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-4.x-white.svg?logo=express)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8e75ff.svg?logo=google)](https://ai.google.dev/)
[![MSBTE 22317](https://img.shields.io/badge/MSBTE_Course-22317_Aligned-10b981.svg)](https://msbte.org.in/)

> **AlgoViz Pro** is an enterprise-grade, full-stack educational platform engineered to transform how students and software engineers understand, implement, benchmark, and deploy sorting algorithms.
> Specifically curriculum-mapped for **MSBTE Diploma Computer Technology & Computer Engineering (Course 22317 - Data Structures Using 'C')**, university B.Tech/B.E. Computer Science students, and engineering candidates preparing for technical interviews and viva voce examinations.

---

## 📑 Table of Contents

- [1. Executive Summary & Mission](#-1-executive-summary--mission)
- [2. Four Core Educational Pillars](#-2-four-core-educational-pillars)
- [3. Complete Step-by-Step Setup & Installation Guide](#-3-complete-step-by-step-setup--installation-guide)
  - [Prerequisites](#prerequisites)
  - [Step 1: Clone Repository](#step-1-clone-repository)
  - [Step 2: Install Dependencies](#step-2-install-dependencies)
  - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
  - [Step 4: Launch Development Server](#step-4-launch-development-server)
  - [Step 5: Production Build & Deployment](#step-5-production-build--deployment)
  - [Troubleshooting & FAQs](#troubleshooting--faqs)
- [4. Technology Stack & Architectural Overview](#-4-technology-stack--architectural-overview)
- [5. Implemented Algorithms & Complexity Reference Matrix](#-5-implemented-algorithms--complexity-reference-matrix)
- [6. Deep-Dive Module Breakdown (10 Core Modules)](#-6-deep-dive-module-breakdown-10-core-modules)
  - [Module 1: Interactive Sorting Visualizer](#module-1-interactive-sorting-visualizer)
  - [Module 2: Algorithm Theory & Viva Voce Masterclass](#module-2-algorithm-theory--viva-voce-masterclass)
  - [Module 3: Code Learning Studio (5 Languages)](#module-3-code-learning-studio-5-languages)
  - [Module 4: Sandboxed Code Playground & Test Runner](#module-4-sandboxed-code-playground--test-runner)
  - [Module 5: Multi-Algorithm Comparison Benchmark Lab](#module-5-multi-algorithm-comparison-benchmark-lab)
  - [Module 6: Sorting in Real-World Enterprise Systems](#module-6-sorting-in-real-world-enterprise-systems)
  - [Module 7: MSBTE Lab Practicals (Course 22317) & PDF Export](#module-7-msbte-lab-practicals-course-22317--pdf-export)
  - [Module 8: Interactive DSA Quiz Assessment System](#module-8-interactive-dsa-quiz-assessment-system)
  - [Module 9: Gamified Algorithm Challenge Quests](#module-9-gamified-algorithm-challenge-quests)
  - [Module 10: AlgoBuddy AI Tutor (Gemini 3.8 Flash + Offline Fallback)](#module-10-algobuddy-ai-tutor-gemini-38-flash--offline-fallback)
- [7. MSBTE Diploma (Course 22317) Curriculum Mapping](#-7-msbte-diploma-course-22317-curriculum-mapping)
- [8. Real-Time Event Engine & Audio Synthesis Architecture](#-8-real-time-event-engine--audio-synthesis-architecture)
- [9. Backend REST API Reference](#-9-backend-rest-api-reference)
- [10. Keyboard Navigation & Accessibility](#-10-keyboard-navigation--accessibility)
- [11. Repository & Directory Structure](#-11-repository--directory-structure)
- [12. Extended Documentation Library](#-12-extended-documentation-library)
- [13. License & Academic Attribution](#-13-license--academic-attribution)

---

## 📌 1. Executive Summary & Mission

Traditional sorting visualizers rely on pre-recorded animations or canned transitions. When students attempt to inspect edge cases or examine real code, those visualizers fail to reflect true runtime behavior.

**AlgoViz Pro runs genuine, deterministic sorting implementations in real time.** Every algorithm executes step-by-step against arbitrary in-memory arrays and emits an immutable event stream containing:
- Specific element indices under inspection
- Operation classifications (`compare`, `swap`, `write`, `pivot`, `active`, `mark-sorted`, `complete`)
- Runtime metrics (comparisons, memory swaps, auxiliary writes)
- Human-readable educational rationale explaining *why* the operation took place

### Target Audience
1. **MSBTE Diploma Students (Computer Technology & Computer Engineering):** Exact syllabus match for Course Code **22317** (Data Structures Using 'C'), covering all 5 mandatory sorting practicals with printable lab manual sheets and viva questions.
2. **Undergraduate Engineering Students (B.E. / B.Tech CSE & IT):** Deep mathematical asymptotic proofs ($O(n^2)$, $O(n \log n)$, $O(n)$), stability proofs, and recurrence relations.
3. **Coding Bootcamp Candidates & Interviewees:** Master multi-language implementations (C, C++, Java, Python, TypeScript) and debug tricky edge cases (already sorted, reversed, duplicate heavy, and negative values).

Existing Repository Reference: [https://github.com/prathameshsutar140/sorting-visualizer](https://github.com/prathameshsutar140/sorting-visualizer)

---

## 🎯 2. Four Core Educational Pillars

```
+-----------------------------------------------------------------------------------+
|                                 ALGOVIZ PRO                                      |
+---------------------+---------------------+-------------------+-------------------+
|  1. VISUAL LEARNING | 2. CODE LEARNING    | 3. PERFORMANCE    | 4. REAL-WORLD     |
|                     |                     |    BENCHMARKING   |    APPLICATIONS   |
+---------------------+---------------------+-------------------+-------------------+
| - Bar & Memory Mode | - 5 Languages       | - Cloned Datasets | - Multi-field     |
| - Timeline Scrubber | - Line-by-Line Help | - Empirical vs    |   Object Records  |
| - Audio Synthesis   | - Sandboxed Runner  |   Asymptotic BigO | - Enterprise Apps |
| - Micro-Op Engine   | - Edge-Case Suites  | - Metric Charts   | - No Detached Data|
+---------------------+---------------------+-------------------+-------------------+
```

1. **Visual Learning:** Watch algorithms divide, partition, shift, and heapify data with animated vertical bars or indexed memory cells with pointer heads.
2. **Programming Learning:** Inspect real source code in **C, C++, Java, Python 3, and TypeScript**. Click any line to open an interactive drawer explaining *what it does*, *why it is needed*, *which variables change*, and *how it affects array state*.
3. **Performance Analysis:** Benchmark up to 6 algorithms simultaneously on the **exact same randomized dataset** to observe why $O(n \log n)$ dominates $O(n^2)$ when $n$ increases from 10 to 500.
4. **Real-World Systems:** Discover how sorting powers 6 real software applications (Student Registers, E-Commerce, Library Catalogs, Banking Ledgers, Hospital Triage, and Warehouse Inventory) with absolute record integrity.

---

## 🚀 3. Complete Step-by-Step Setup & Installation Guide

Follow these exact steps to run AlgoViz Pro on your local workstation or server.

### Prerequisites

| Tool | Minimum Version | Recommended Version | Verification Command |
|---|---|---|---|
| **Node.js** | `v18.0.0` | `v20.x` or `v22.x` (LTS) | `node -v` |
| **npm** | `v9.0.0` | `v10.x` or higher | `npm -v` |
| **Git** | `v2.25.0` | Latest | `git --version` |
| **Web Browser** | Modern Chrome, Firefox, Edge, Safari with Web Audio API enabled |

---

### Step 1: Clone Repository

```bash
# Clone the repository to your local computer
git clone https://github.com/prathameshsutar140/sorting-visualizer.git

# Navigate into the project directory
cd sorting-visualizer
```

---

### Step 2: Install Dependencies

AlgoViz Pro uses a unified full-stack architecture. Run `npm install` to install all frontend and backend dependencies:

```bash
npm install
```

**Key Packages Installed:**
- `react`, `react-dom` (v19) - Core UI layer
- `vite` (v8) - Lightning-fast frontend build engine and dev middleware
- `tailwindcss` (v4), `@tailwindcss/vite` - Utility-first styling engine
- `express` (v4), `@types/express` - Backend API proxy and sandbox test server
- `tsx` - Instant TypeScript execution for the Node.js server
- `@google/genai` (v2.4.0) - Official Google Gemini SDK for AlgoBuddy AI
- `lucide-react` - Modern iconography
- `canvas-confetti` - Gamification celebration particle engine

---

### Step 3: Configure Environment Variables

Create your local `.env` configuration file by copying `.env.example`:

```bash
cp .env.example .env
```

Open `.env` in your text editor (VS Code, Nano, Vim, etc.):

```env
# Port on which the Express server and Vite frontend will be served
PORT=3000

# Optional: Google Gemini API Key for AlgoBuddy AI Assistant
# Get a free key at: https://aistudio.google.com/
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Base URL for self-referential links and OAuth callbacks
APP_URL="http://localhost:3000"
```

> 🛡️ **Zero API Key Requirement for Core Features:**
> If you do **not** have a Gemini API key or are offline, **AlgoViz Pro still runs at 100% functionality!** AlgoBuddy features a built-in offline educational knowledge base that automatically answers DSA, viva questions, and time complexity derivations without requiring an internet connection.

---

### Step 4: Launch Development Server

Start the full-stack development server:

```bash
npm run dev
```

Output should indicate:
```
==================================================
  AlgoViz Pro – Algorithm Platform Server
  Port:        3000
  Mode:        development
  AI Enabled:  true / false (Offline Fallback Ready)
==================================================
```

Now open your web browser and navigate to:
```
http://localhost:3000
```

---

### Step 5: Production Build & Deployment

To compile the application into high-performance static client bundles and launch the production server:

```bash
# 1. Type-check and build production assets
npm run build

# 2. Start the production Node/Express server
npm start
```

---

### Troubleshooting & FAQs

#### Q1: Port 3000 is already in use
If another service is using port 3000:
- Specify an alternate port in your `.env`: `PORT=3001`
- Or run: `PORT=3001 npm run dev`

#### Q2: Web Audio API sound does not play
Browsers require user interaction before an `AudioContext` can synthesize sound. Click any button on the screen or toggle the sound button in the top navbar (`Mute / Unmute Sound`).

#### Q3: Code playground returns test errors
The sandbox validates your code against 5 test suites. Ensure your sorting function modifies the array in-place or returns the sorted array, and handles negative values and duplicate elements.

---

## 💻 4. Technology Stack & Architectural Overview

```
                       +-----------------------------------+
                       |        Browser Client (SPA)       |
                       |  React 19 + TypeScript + Tailwind |
                       +-----------------+-----------------+
                                         |
                                         | HTTP / REST
                                         v
+-----------------------------------------------------------------------------------+
|                         Express Server (server.ts : 3000)                        |
|                                                                                   |
|  [Vite Dev Middlewares]    [/api/health]       [/api/gemini/chat]   [/api/code/run]
|  Serves HMR & Client Bundles   Health Check    Gemini 3.8 Flash Proxy  Sandboxed   |
|                                                + Offline Fallback   Test Runner   |
+--------------------------------------------------------+--------------------------+
                                                         |
                                                         v
                                              [Google Gemini API]
                                             (Zero client key leak)
```

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Lucide Icons
- **Visual Rendering:** High-performance CSS Flex/Transform engine capable of smooth 60 FPS transitions up to 500 array elements
- **Audio Synthesis:** Web Audio API oscillator bank mapping array values to musical scale frequencies (220 Hz – 880 Hz)
- **Backend API:** Node.js Express server mounting Vite middlewares in development and serving static assets in production
- **AI Engine:** Google Gemini 3.8 Flash accessed strictly server-side with `aistudio-build` telemetry

---

## 📊 5. Implemented Algorithms & Complexity Reference Matrix

All 10 algorithms are genuinely implemented in `src/algorithms/engine.ts`:

| # | Algorithm | Level | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? | Adaptive? | MSBTE Practical |
|---|---|---|---|---|---|---|:---:|:---:|:---:|:---:|
| 1 | **Bubble Sort** | Beginner | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ Yes | ✅ Yes | ✅ Yes (Flagged) | Practical 01 |
| 2 | **Selection Sort** | Beginner | $\Omega(n^2)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ | ❌ No | ✅ Yes | ❌ No | Practical 02 |
| 3 | **Insertion Sort** | Beginner | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ Yes | ✅ Yes | ✅ Yes | Practical 03 |
| 4 | **Merge Sort** | Intermediate | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(n)$ | ✅ Yes | ❌ No | ❌ No | Practical 04 |
| 5 | **Quick Sort** | Intermediate | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n^2)$ | $O(\log n)$ | ❌ No | ✅ Yes | ❌ No | Practical 05 |
| 6 | **Shell Sort** | Intermediate | $\Omega(n \log n)$ | $\Theta(n^{1.3})$ | $O(n^2)$ | $O(1)$ | ❌ No | ✅ Yes | ✅ Yes | Reference |
| 7 | **Heap Sort** | Advanced | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(1)$ | ❌ No | ✅ Yes | ❌ No | Reference |
| 8 | **Counting Sort** | Advanced | $\Omega(n + k)$ | $\Theta(n + k)$ | $O(n + k)$ | $O(n + k)$ | ✅ Yes | ❌ No | ❌ No | Non-Comparison |
| 9 | **Radix Sort** | Advanced | $\Omega(d(n + b))$ | $\Theta(d(n + b))$ | $O(d(n + b))$ | $O(n + b)$ | ✅ Yes | ❌ No | ❌ No | Non-Comparison |
| 10 | **Bucket Sort** | Advanced | $\Omega(n + k)$ | $\Theta(n + k)$ | $O(n^2)$ | $O(n + k)$ | ✅ Yes | ❌ No | ❌ No | Distribution |

---

## 🧩 6. Deep-Dive Module Breakdown (10 Core Modules)

### Module 1: Interactive Sorting Visualizer
- **Dual Display Modes:**
  - *Bar Mode:* Vertical proportional bars with glowing color-coded states.
  - *Memory Cell Mode:* Discrete memory blocks displaying index numbers, cell values, and active pointer tags (`CMP`, `SWAP`, `PIVOT`, `ACTIVE`, `✓ SORTED`).
- **Granular Timeline Scrubber:** Drag the slider across all recorded micro-steps to pause, reverse, inspect, and step through the algorithm at your own pace.
- **Playback Controls:** Play, Pause, Single Step Forward, Single Step Backward, Reset to Step 0, and Shuffle Array.
- **Speed Slider:** Adjust execution speed continuously from 0.2x (slow motion for classroom teaching) up to 5.0x (rapid completion).
- **Dataset Distributions:** Random, Ascending (Already Sorted), Descending (Worst Case), Nearly Sorted (8% inversions), Duplicates (few unique values), and Custom Array Input modal (e.g. `54, 26, 93, 17, 77, 31, 44, 55, 20`).
- **Scalable Dataset Sizes:** 10, 25, 50, 100, 250, 500 items.

### Module 2: Algorithm Theory & Viva Voce Masterclass
- Educational breakdowns designed for diploma students.
- **Visual Flowcharts:** Interactive step-by-step logic diagrams.
- **Mathematical Complexity Derivations:** Best case, average case, worst case, and auxiliary space bounds.
- **Stability & Adaptability Analysis:** Plain-English explanations with counter-examples.
- **MSBTE Viva Voce Q&A Bank:** Verified oral examination questions with model answers.

### Module 3: Code Learning Studio (5 Languages)
- Real implementations in **C**, **C++**, **Java**, **Python 3**, and **TypeScript**.
- **Interactive Line-by-Line Breakdown:** Click any line in the code editor to open an explanatory drawer:
  1. *What the statement does*
  2. *Why it is necessary in the algorithm*
  3. *Which variables or memory locations it modifies*
  4. *How it drives the array toward its sorted state*
- One-click copy and source code file download (`.c`, `.cpp`, `.java`, `.py`, `.ts`).

### Module 4: Sandboxed Code Playground & Test Runner
- In-browser code editor with preloaded starter templates.
- **Server-Side Sandbox Test Suite (`/api/code/run`):** Executes student code against 5 test suites:
  - *Test 1:* General unsorted random array
  - *Test 2:* Already sorted array (verifying $\Omega(n)$ behavior)
  - *Test 3:* Reverse sorted array (verifying worst-case boundary)
  - *Test 4:* Array with heavy duplicate values (verifying stability and branch safety)
  - *Test 5:* Array containing negative integers (verifying sign handling)
- Console output with elapsed execution time and total comparisons.

### Module 5: Multi-Algorithm Comparison Benchmark Lab
- Select 2 to 6 algorithms and benchmark them simultaneously on the **exact same cloned dataset**.
- Side-by-side comparative bar charts for total comparisons and memory writes.
- Summary matrix contrasting empirical measurements against theoretical Big-O curves.

### Module 6: Sorting in Real-World Enterprise Systems
Shows how real production software sorts multi-field business objects without corrupting data:
1. **MSBTE Student Information System:** Sort by Roll No, Student Name, Semester Marks %, or Attendance %.
2. **E-Commerce Catalog:** Sort by Price in ₹, Customer Star Rating, or Sales Popularity.
3. **Library Management System:** Sort by Accession Number, Book Title, Author, or Publication Year.
4. **Banking Ledger & Transaction History:** Sort by Transaction Date, Amount in ₹, Reference ID, or Debit/Credit status.
5. **Hospital Emergency Triage System:** Sort by Clinical Urgency (Emergency / Priority / Normal), Token Number, or Arrival Time.
6. **Warehouse Inventory:** Sort by Unit Price, Quantity in Stock, Product SKU, or Reorder Priority.

### Module 7: MSBTE Lab Practicals (Course 22317) & PDF Export
- 5 Complete curriculum practicals:
  - **Practical 01:** Bubble Sort implementation & analysis
  - **Practical 02:** Selection Sort implementation & analysis
  - **Practical 03:** Insertion Sort implementation & analysis
  - **Practical 04:** Merge Sort implementation (Divide & Conquer)
  - **Practical 05:** Quick Sort implementation (Partition Exchange)
- Each practical contains: Aim, Prerequisites, Algorithm Steps, Flowchart, Complete ANSI C Program, Sample Input/Output, Conclusion, and 10+ Viva Questions.
- Student completion checkbox linked to local profile storage.
- **Print / PDF Lab Manual Sheet:** Generates an official formatted lab manual page ready for college submission.

### Module 8: Interactive DSA Quiz Assessment System
- Multiple-choice questions categorized by topic:
  - Algorithm Concepts & Mechanics
  - Asymptotic Time & Space Complexity
  - Next-Step & State Prediction
  - Code Analysis & Bug Spotting
  - Real-World Algorithm Selection
- Timed assessment mode, instant feedback, scoring, and explanation reviews.

### Module 9: Gamified Algorithm Challenge Quests
- Problem-solving puzzles:
  - *Mystery Sort Identifier:* Identify an algorithm purely from its comparison/swap pattern.
  - *State Prediction Quest:* Calculate array state after $k$ passes.
  - *Bug Hunter Challenge:* Detect off-by-one errors and loop faults in faulty implementations.
- Confetti celebration animations, point rewards, and daily streak tracking.

### Module 10: AlgoBuddy AI Tutor (Gemini 3.8 Flash + Offline Fallback)
- Accessible from the global navigation bar (`AlgoBuddy AI`).
- Powered by `gemini-3.8-flash` via secure backend proxy (`/api/gemini/chat`).
- Preconfigured prompts for:
  - Explaining complex recurrence relations ($T(n) = 2T(n/2) + O(n)$)
  - Answering MSBTE oral viva questions
  - Generating custom code examples in any language
  - Debugging student code snippets
- Automatic fallback to offline curriculum when offline.

---

## 🎓 7. MSBTE Diploma (Course 22317) Curriculum Mapping

| Syllabus Unit | Topic & Competency | Relevant AlgoViz Pro Module | Practical No. |
|---|---|---|:---:|
| **Unit 4: Sorting & Searching** | Bubble Sort Algorithm, Pass analysis | Visualizer + Practical Guide 01 | **Practical 01** |
| **Unit 4: Sorting & Searching** | Selection Sort Algorithm, Min index | Visualizer + Practical Guide 02 | **Practical 02** |
| **Unit 4: Sorting & Searching** | Insertion Sort, Key insertion, Shifts | Visualizer + Practical Guide 03 | **Practical 03** |
| **Unit 4: Sorting & Searching** | Merge Sort, Divide & Conquer logic | Visualizer + Practical Guide 04 | **Practical 04** |
| **Unit 4: Sorting & Searching** | Quick Sort, Partitioning, Pivot index | Visualizer + Practical Guide 05 | **Practical 05** |
| **Course Outcome (CO-d)** | Compare sorting algorithms by complexity | Comparison Lab + Complexity Matrix | All |
| **Course Outcome (CO-e)** | Apply sorting to solve real-world problems | Real-World Enterprise Systems | Module 6 |

---

## 🔊 8. Real-Time Event Engine & Audio Synthesis Architecture

### Micro-Step Event Schema
Every sorting algorithm in `src/algorithms/engine.ts` is a generator that records discrete events:

```typescript
export interface SortEvent {
  type: 'compare' | 'swap' | 'write' | 'pivot' | 'active' | 'mark-sorted' | 'complete';
  indices: number[];           // Array indices involved in the operation
  values?: number[];          // Element values involved
  arraySnapshot: number[];    // Immutable copy of the array after the operation
  description: string;        // Human-readable explanation of why this step occurred
  comparisonsCount: number;   // Cumulative comparison counter
  swapsCount: number;         // Cumulative swap/write counter
}
```

### Web Audio Synthesis Formula
When audio is enabled, each comparison or swap triggers an audio harmonic:

$$\text{Frequency} = f_{\min} + \left( \frac{\text{Value} - \text{Min}}{\text{Max} - \text{Min}} \right) \times (f_{\max} - f_{\min})$$

Where $f_{\min} = 220\text{ Hz}$ (A3) and $f_{\max} = 880\text{ Hz}$ (A5). Swaps generate dynamic triangle waveforms while comparisons generate gentle sine waves, providing an acoustic representation of entropy decreasing as the array becomes sorted.

---

## 🔌 9. Backend REST API Reference

The Express backend runs on port 3000 (`server.ts`):

### 1. Health & Status
```http
GET /api/health
```
**Response:**
```json
{
  "status": "ok",
  "app": "AlgoViz Pro",
  "aiEnabled": true
}
```

### 2. AlgoBuddy AI Chat Proxy
```http
POST /api/gemini/chat
Content-Type: application/json

{
  "message": "Explain why Merge Sort is stable while Quick Sort is unstable."
}
```
**Response:**
```json
{
  "reply": "Merge Sort preserves the relative order of duplicate elements because...",
  "source": "gemini" // or "offline-knowledge-base"
}
```

### 3. Sandboxed Code Runner
```http
POST /api/code/run
Content-Type: application/json

{
  "language": "javascript",
  "algorithm": "bubble",
  "code": "function sort(arr) { ... return arr; }"
}
```
**Response:**
```json
{
  "success": true,
  "results": [
    { "name": "Random Array", "passed": true, "input": [5, 2, 8, 1], "output": [1, 2, 5, 8] },
    { "name": "Already Sorted", "passed": true, "input": [1, 2, 3, 4], "output": [1, 2, 3, 4] },
    { "name": "Reverse Sorted", "passed": true, "input": [9, 7, 5, 3], "output": [3, 5, 7, 9] },
    { "name": "Duplicates", "passed": true, "input": [4, 2, 4, 2], "output": [2, 2, 4, 4] },
    { "name": "Negative Numbers", "passed": true, "input": [-3, 5, 0, -1], "output": [-3, -1, 0, 5] }
  ],
  "metrics": { "executionTimeMs": 2, "comparisons": 10 }
}
```

---

## ⌨️ 10. Keyboard Navigation & Accessibility

| Shortcut | Context | Action |
|---|---|---|
| `Ctrl + K` or `Cmd + K` | Global | Open Quick Navigation & Search Dialog |
| `Space` | Visualizer | Toggle Play / Pause |
| `Arrow Right` ($\rightarrow$) | Visualizer | Step Forward by 1 micro-operation |
| `Arrow Left` ($\leftarrow$) | Visualizer | Step Backward by 1 micro-operation |
| `R` | Visualizer | Restart animation from step 0 |
| `S` | Visualizer | Shuffle current array with new random values |
| `M` | Global | Toggle sound effects on/off |
| `Esc` | Modals | Close open modal or slide-over drawer |

---

## 📁 11. Repository & Directory Structure

```
├── .env.example                  # Environment variable blueprint
├── index.html                    # Application entry point with typography
├── metadata.json                 # AI Studio configuration & capabilities
├── package.json                  # Dependencies, dev tools & scripts
├── server.ts                     # Full-stack Node/Express backend & API proxy
├── tsconfig.json                 # TypeScript strict configuration
├── vite.config.ts                # Vite bundler configuration
├── docs/                         # Extended engineering documentation
│   ├── INSTALLATION.md           # In-depth setup, Docker & troubleshooting
│   ├── SYSTEM_ARCHITECTURE.md    # Architecture diagrams & event flow
│   ├── FEATURES.md               # Detailed feature breakdown across modules
│   ├── API_DOCUMENTATION.md      # REST endpoints & schema specs
│   ├── USER_GUIDE.md             # Student & instructor user manual
│   ├── TESTING.md                # Verification test suites & QA procedures
│   ├── DEPLOYMENT.md             # Cloud Run, VPS, Docker deployment guide
│   └── PROJECT_OVERVIEW.md       # Pedagogical philosophy & MSBTE mapping
└── src/
    ├── main.tsx                  # React DOM mount point
    ├── App.tsx                   # Master state coordinator & navigation
    ├── index.css                 # Global Tailwind styles & dark theme
    ├── types/                    # Strict TypeScript type definitions
    │   └── index.ts
    ├── algorithms/               # Deterministic sorting event generator
    │   └── engine.ts             # 10 algorithm implementations emitting SortEvents
    ├── data/                     # Verified educational datasets
    │   ├── algorithmsData.ts     # Theory, proofs, viva Q&A, 5-language code
    │   ├── realWorldData.ts      # 6 Enterprise datasets with record integrity
    │   ├── practicalsData.ts     # MSBTE 22317 complete lab practical manuals
    │   ├── quizData.ts           # Topic-categorized question bank
    │   └── challengesData.ts     # Gamified puzzle quests
    ├── utils/                    # Core utilities
    │   ├── audio.ts              # Web Audio API tone synthesizer
    │   ├── arrayGenerators.ts    # Distribution generators & custom parser
    │   └── storage.ts            # LocalStorage student profile persistence
    └── components/
        ├── layout/               # Header, navbar, branding
        ├── dashboard/            # Overview, statistics & hero visualizer
        ├── visualization/        # Core Visualizer: bar/memory modes & scrubber
        ├── learning/             # Dedicated theory, flowcharts & viva answers
        ├── code/                 # Code studio with line-by-line drawer
        ├── playground/           # Sandboxed code editor & test suite runner
        ├── comparison/           # Multi-algorithm benchmark comparison lab
        ├── realworld/            # 6 Enterprise software sorting systems
        ├── practicals/           # MSBTE 22317 lab sheets & PDF printing
        ├── quiz/                 # Timed assessment quizzes & review
        ├── challenges/           # Gamified puzzle quests with confetti
        ├── ai/                   # AlgoBuddy AI chat drawer
        └── modals/               # Search, Student Profile, Settings modals
```

---

## 📚 12. Extended Documentation Library

For deeper architectural, installation, and deployment details, consult the dedicated guides in the `/docs` directory:

- 📖 [**PROJECT_OVERVIEW.md**](./docs/PROJECT_OVERVIEW.md) – Executive summary, MSBTE 22317 alignment, and pedagogical design principles.
- 🛠️ [**INSTALLATION.md**](./docs/INSTALLATION.md) – Step-by-step installation, Docker containers, environment configuration, and FAQs.
- 🏗️ [**SYSTEM_ARCHITECTURE.md**](./docs/SYSTEM_ARCHITECTURE.md) – Comprehensive system architecture, data pipelines, and event state machine.
- ⭐ [**FEATURES.md**](./docs/FEATURES.md) – Feature inventory across all 10 platform modules.
- 🔌 [**API_DOCUMENTATION.md**](./docs/API_DOCUMENTATION.md) – REST API specification, request/response payloads, and curl commands.
- 🧑‍💻 [**USER_GUIDE.md**](./docs/USER_GUIDE.md) – Complete guide for diploma students, engineering undergraduates, and lab instructors.
- 🧪 [**TESTING.md**](./docs/TESTING.md) – Unit test suites, edge case verification, and manual QA validation matrices.
- 🚢 [**DEPLOYMENT.md**](./docs/DEPLOYMENT.md) – Production deployment instructions for Cloud Run, Docker, VPS, and static hosts.

---

## 📜 13. License & Academic Attribution

- **License:** Apache License 2.0. Open source for educational and academic use.
- **Academic Alignment:** Maharashtra State Board of Technical Education (MSBTE) Course Code 22317 (Data Structures Using 'C').
- **Author Reference:** [https://github.com/prathameshsutar140/sorting-visualizer](https://github.com/prathameshsutar140/sorting-visualizer)
