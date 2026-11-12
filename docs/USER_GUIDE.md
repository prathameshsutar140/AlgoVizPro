# AlgoViz Pro – User Manual & Educational Guide

A complete guide for students, professors, and lab instructors using **AlgoViz Pro** for coursework, lab practicals, and examination preparation.

---

## 👨‍🎓 Part 1: Student Guide

### 1. Navigating the Platform
Use the top navigation bar to access the primary modules:
- **Dashboard:** At-a-glance summary of your learning progress, completed practicals, active streak, and quick launch buttons.
- **Visualizer:** Interactive animation engine with dual display modes (Bar and Memory Cell).
- **Learn:** In-depth textbook theory, asymptotic mathematical derivations, and MSBTE viva voce answers.
- **Code Studio:** Study production implementations in C, C++, Java, Python, and TypeScript with interactive line-by-line inspection.
- **Playground:** Sandboxed programming environment with instant edge-case test verification.
- **Comparison Lab:** Benchmark multiple algorithms simultaneously on identical datasets.
- **Real-World Systems:** Explore sorting in real applications (Student DB, E-Commerce, Hospital Triage, etc.).
- **MSBTE Practicals:** Complete laboratory practical sheets for Course 22317 with printable PDF manuals.
- **Quiz:** Timed assessment tests to test your understanding.
- **Challenges:** Gamified quests (Mystery Sorts, State Prediction, Bug Hunting) with XP and confetti.

> 💡 **Pro-Tip:** Press `Ctrl + K` (or `Cmd + K` on Mac) at any time to open the Quick Search dialog and jump directly to any algorithm, topic, or practical!

---

### 2. Using the Visualizer Effectively
1. **Selecting an Algorithm:** Choose from the algorithm dropdown (Bubble, Selection, Insertion, Merge, Quick, Shell, Heap, Counting, Radix, Bucket).
2. **Choosing a Dataset Distribution:**
   - *Random:* Default mixed distribution.
   - *Ascending:* Best-case test for adaptive algorithms (e.g. Bubble & Insertion).
   - *Descending:* Worst-case test demonstrating maximum comparison and swap counts.
   - *Nearly Sorted:* 8% inversions, ideal for showing why Insertion Sort outperforms Quick Sort on small almost-sorted arrays.
   - *Duplicates:* Demonstrates stability and handling of identical keys.
   - *Custom Array:* Click **Custom Array** to input your exact homework or exam question array.
3. **Scrubbing & Stepping:**
   - Use the **Timeline Scrubber** to move backward or forward to any point in the algorithm.
   - Use the **Next Step** and **Prev Step** buttons to examine individual comparisons and swaps one by one.
4. **Switching Modes:**
   - Click **Bar Mode** for vertical heights.
   - Click **Array Mode** to view indexed memory cells with active pointer labels (`CMP`, `SWAP`, `PIVOT`, `ACTIVE`, `✓`).

---

### 3. Mastering MSBTE Lab Practicals (Course 22317)
1. Navigate to the **MSBTE Practicals** tab.
2. Select your assigned practical (e.g., *Practical 01: Bubble Sort* or *Practical 05: Quick Sort*).
3. Read the Prerequisites, Algorithm Steps, and ANSI C Source Code.
4. Check the **Mark Completed** button to save completion to your student profile (+50 XP).
5. Click **Print / Export PDF Lab Sheet** to open a print-optimized dialog. You can print the lab manual sheet or save it as a PDF for submission to your teacher.

---

### 4. Taking Quizzes & Completing Quests
- Navigate to **Quiz** to test your knowledge with topic-based questions.
- Review detailed explanations for any questions you answered incorrectly.
- Navigate to **Challenges** to test your debugging and state prediction skills.

---

## 👩‍🏫 Part 2: Instructor & Professor Guide

AlgoViz Pro was engineered as a classroom demonstration and laboratory teaching tool.

### 1. Live Lecture Demonstration Strategy
- **Demonstrating Adaptability:** Set distribution to *Ascending* (Already Sorted). Run **Bubble Sort** (with swap flag enabled). Show that it completes in $O(n)$ in a single pass. Then run **Selection Sort** to demonstrate why it still requires $O(n^2)$ comparisons.
- **Demonstrating Pivot Choice in Quick Sort:** Set distribution to *Descending*. Run **Quick Sort** with first-element pivot to demonstrate the worst-case $O(n^2)$ recursion tree.
- **Stability Demonstration:** Set distribution to *Duplicates*. Track the relative order of duplicate items in **Merge Sort** (stable) versus **Quick Sort** (unstable).

### 2. Conducting MSBTE 22317 Lab Sessions
- Assign students to read the theory and run the code in the **Code Studio**.
- Have students run their code in the **Playground** to verify edge cases (duplicates, negative values).
- Have students export the **Printable PDF Lab Sheet** for their manual files.
- Use the **Viva Voce** bank during oral exams to test understanding of edge cases, stability, and time complexities.

---

## ⌨️ Part 3: Keyboard Shortcuts Reference

| Shortcut | Description |
|---|---|
| `Ctrl + K` / `Cmd + K` | Open Quick Search dialog |
| `Spacebar` | Toggle Play / Pause in Visualizer |
| `Right Arrow` ($\rightarrow$) | Advance 1 micro-step forward |
| `Left Arrow` ($\leftarrow$) | Step 1 micro-step backward |
| `R` | Restart animation from step 0 |
| `S` | Generate and shuffle a new array |
| `M` | Mute / Unmute sound effects |
| `Escape` | Close any open modal dialog |
