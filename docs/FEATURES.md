# AlgoViz Pro – Complete Features Inventory

This document provides a comprehensive inventory of all functional capabilities, pedagogical tools, and developer features in **AlgoViz Pro**.

---

## 📑 Feature Index

1. [Interactive Sorting Visualizer Engine](#1-interactive-sorting-visualizer-engine)
2. [Algorithm Theory, Proofs & Viva Voce Masterclass](#2-algorithm-theory-proofs--viva-voce-masterclass)
3. [Code Learning Studio (5 Programming Languages)](#3-code-learning-studio-5-programming-languages)
4. [Sandboxed Code Playground & Automated Test Runner](#4-sandboxed-code-playground--automated-test-runner)
5. [Multi-Algorithm Benchmark & Comparison Lab](#5-multi-algorithm-benchmark--comparison-lab)
6. [Sorting in Real-World Enterprise Software Systems](#6-sorting-in-real-world-enterprise-software-systems)
7. [MSBTE Diploma Lab Practicals (Course 22317) & PDF Lab Manual Generator](#7-msbte-diploma-lab-practicals-course-22317--pdf-lab-manual-generator)
8. [Interactive DSA Quiz Assessment System](#8-interactive-dsa-quiz-assessment-system)
9. [Gamified Algorithm Challenge Quests](#9-gamified-algorithm-challenge-quests)
10. [AlgoBuddy AI Tutor (Gemini 3.8 Flash + Offline Fallback)](#10-algobuddy-ai-tutor-gemini-38-flash--offline-fallback)
11. [Global Search, Navigation & User Customization](#11-global-search-navigation--user-customization)

---

## 1. Interactive Sorting Visualizer Engine
- **Supported Algorithms:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Shell Sort, Heap Sort, Counting Sort, Radix Sort, Bucket Sort.
- **Dual Visual Modes:**
  - *Bar Mode:* Proportional vertical bars with glowing status colors and smooth height animations.
  - *Memory Cell Mode:* Horizontal contiguous memory blocks showing array indices, values, and pointer markers (`CMP`, `SWAP`, `PIVOT`, `ACTIVE`, `✓`).
- **Interactive Timeline Scrubber:** Drag the scrubber anywhere from step 0 to the final step without reloading.
- **Fine Playback Controls:** Play, Pause, Step Forward, Step Backward, Restart from step 0, and Shuffle.
- **Speed Multiplier:** 0.2x (classroom demonstration) to 5.0x (instant batch execution).
- **Preset Dataset Sizes:** 10, 25, 50, 100, 250, and 500 elements.
- **Distribution Profiles:** Random, Sorted (Ascending), Reverse (Descending), Nearly Sorted (8% inversions), Duplicates (few distinct keys).
- **Custom Array Input:** Dialog permitting students to enter arbitrary comma-separated numbers (e.g. `54, 26, 93, 17, 77, 31, 44, 55, 20`).
- **Harmonic Audio:** Real-time Web Audio synthesis sonifying array values during comparisons and swaps.

---

## 2. Algorithm Theory, Proofs & Viva Voce Masterclass
- **Structured Explanations:** Definition, working principle, analogies, real-world examples.
- **Interactive Visual Flowcharts:** Step-by-step logic decision diagrams.
- **Asymptotic Mathematical Proofs:**
  - Best-Case ($\Omega$), Average-Case ($\Theta$), Worst-Case ($O$) time derivations.
  - Auxiliary Space Complexity ($O(1)$, $O(\log n)$, $O(n)$, $O(n+k)$).
- **Classification Criteria:**
  - *Stability:* Whether equal keys maintain relative order.
  - *In-Place:* Whether auxiliary memory is $O(1)$ or $O(n)$.
  - *Adaptability:* Whether algorithm runs faster on pre-sorted data.
- **MSBTE Viva Voce Q&A:** 10+ commonly asked oral questions per algorithm with model textbook answers.

---

## 3. Code Learning Studio (5 Programming Languages)
- **Supported Languages:** C (ANSI C), C++ (C++17), Java (Java 17), Python (Python 3.11), and TypeScript.
- **Interactive Line-by-Line Drawer:** Click any code line in the editor to open a structured breakdown:
  - *Action:* What the code line executes.
  - *Necessity:* Why the algorithm requires this line.
  - *Memory:* Variables and pointers modified by this line.
  - *Progression:* How this step advances the array towards being sorted.
- **Export & Utility:** One-click copy to clipboard and `.c`, `.cpp`, `.java`, `.py`, `.ts` source file download.

---

## 4. Sandboxed Code Playground & Automated Test Runner
- **Interactive Code Editor:** Full browser coding environment with syntax coloring.
- **Preloaded Templates:** Standard templates for all 10 algorithms.
- **Server-Side Sandbox Runner (`/api/code/run`):**
  - Safely evaluates student code against 5 test suites:
    1. *Random Unsorted Array*
    2. *Already Sorted Array* ($\Omega(n)$ verification)
    3. *Reverse Sorted Array* ($O(n^2)$ verification)
    4. *Array with Duplicates* (Stability verification)
    5. *Array with Negative Integers* (Zero/Sign boundary test)
- **Console Telemetry:** Execution duration in milliseconds, operation count, and detailed pass/fail diagnostics.

---

## 5. Multi-Algorithm Benchmark & Comparison Lab
- **Concurrent Execution:** Select 2 to 6 algorithms to benchmark side-by-side.
- **Identical Cloned Datasets:** All chosen algorithms execute on the exact same randomized seed data.
- **Visual Performance Charts:** Comparative bar graphs for Total Comparisons and Memory Writes.
- **Asymptotic vs Empirical Matrix:** Direct comparison between theoretical Big-O curves and observed metrics.

---

## 6. Sorting in Real-World Enterprise Software Systems
Real-world systems sorting multi-field immutable objects without field scrambling:
1. **Student Information System (MSBTE):** Roll No, Student Name, Semester Marks %, Attendance %.
2. **E-Commerce Catalog:** Product Title, Price in ₹, Star Rating, Sales Popularity.
3. **Library Accession Register:** Accession Number, Book Title, Author, Publication Year.
4. **Banking Ledger & Passbook:** Transaction Date, Amount in ₹, Reference ID, Debit/Credit.
5. **Hospital Emergency Triage:** Clinical Urgency (Emergency / Priority / Normal), Token Number, Patient Name.
6. **Warehouse Inventory:** SKU, Product Name, Quantity in Stock, Unit Price, Reorder Level.

---

## 7. MSBTE Diploma Lab Practicals (Course 22317) & PDF Lab Manual Generator
- **Aligned with MSBTE Curriculum:** Data Structures Using 'C' (Course 22317).
- **5 Complete Practicals:** Bubble, Selection, Insertion, Merge, and Quick Sort.
- **Full Practical Documentation:** Practical No., Aim, Prerequisites, Algorithm Steps, Flowchart, ANSI C Code, Sample Input/Output, Conclusion, and 10+ Viva Questions.
- **One-Click Printable Lab Manual Sheet:** Generates an official, print-ready document formatted for lab file submission.

---

## 8. Interactive DSA Quiz Assessment System
- **Topic-Filtered Questions:** Algorithm Concepts, Time & Space Complexity, Next-Step Prediction, Bug Hunting, and Real-World Scenarios.
- **Assessment Modes:** Untimed Study Mode and Timed 5-Minute Exam Simulation.
- **Scorecard & Review:** Detailed question-by-question breakdown with complete explanations.

---

## 9. Gamified Algorithm Challenge Quests
- **Mystery Sort Identifier:** Guess the sorting algorithm based on array state transitions.
- **State Prediction:** Predict the array contents after $k$ passes.
- **Bug Hunter Quest:** Detect subtle off-by-one errors and loop conditions in broken code.
- **Gamification Mechanics:** Daily streak tracking, XP points, and particle confetti celebrations upon completion.

---

## 10. AlgoBuddy AI Tutor (Gemini 3.8 Flash + Offline Fallback)
- **Engine:** Google Gemini 3.8 Flash via secure server-side Express proxy (`/api/gemini/chat`).
- **Capabilities:** Explains recurrence relations, suggests code optimizations, quizzes students, and answers viva questions.
- **Zero-Failure Offline Fallback:** Functions even without internet or an API key using an embedded curriculum knowledge base.

---

## 11. Global Search, Navigation & User Customization
- **Global Search:** `Ctrl + K` / `Cmd + K` search dialog to jump to any algorithm, practical, or module.
- **User Profile Management:** Customize student name, college name, and view accumulated XP and streaks.
- **Audio & Display Settings:** Sound effects toggle and default code language selector.
