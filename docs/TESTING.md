# AlgoViz Pro – Testing & Quality Assurance Guide

This guide describes the automated verification procedures, sandboxed test suites, and manual QA validation matrices for **AlgoViz Pro**.

---

## 🧪 1. Automated Build & Type-Check Verification

### TypeScript Linting
Verifies that all files conform to strict TypeScript compiler constraints:
```bash
npm run lint
```
**Expected Result:**
Exits with code `0` and zero errors.

### Production Build Compilation
Verifies that the Vite bundler packages all client assets cleanly:
```bash
npm run build
```
**Expected Result:**
Generates optimized output in `dist/` with zero bundle warnings or broken imports.

---

## 🔌 2. Backend API Automated Verification

Run these verification commands against a running instance (`npm run dev` or `npm start` on port 3000):

### 1. Health Check
```bash
curl -s http://localhost:3000/api/health
```
**Expected Output:**
```json
{"status":"ok","app":"AlgoViz Pro","aiEnabled":true}
```

### 2. Sandboxed Code Execution Test
```bash
curl -s -X POST http://localhost:3000/api/code/run \
  -H "Content-Type: application/json" \
  -d '{"language":"javascript","algorithm":"bubble","code":"function sort(arr){ let swapped; do { swapped=false; for(let i=0; i<arr.length-1; i++){ if(arr[i]>arr[i+1]){ let t=arr[i]; arr[i]=arr[i+1]; arr[i+1]=t; swapped=true; } } } while(swapped); return arr; }"}'
```
**Expected Output:**
`"success": true` with all 5 edge case test suites passing (`testsPassed: 5`).

### 3. Gemini AI / Offline Fallback Proxy Test
```bash
curl -s -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is the time complexity of Quick Sort?"}'
```
**Expected Output:**
Valid response object with non-empty `reply` string and `source` indicator (`gemini` or `offline-knowledge-base`).

---

## 🔬 3. Algorithm Engine Edge Case Test Matrix

Every algorithm in `src/algorithms/engine.ts` is verified against the following edge cases:

| Test Case | Input Characteristics | Expected Behavior | Verification Status |
|---|---|---|:---:|
| **Empty Array** | `[]` | Returns 0 events, finishes gracefully | ✅ PASS |
| **Single Element** | `[42]` | Marks single element sorted, 0 swaps | ✅ PASS |
| **Already Sorted** | `[1, 2, 3, 4, 5]` | Adaptive algorithms complete in $O(n)$ | ✅ PASS |
| **Reverse Sorted** | `[5, 4, 3, 2, 1]` | Worst-case branch executes without error | ✅ PASS |
| **Identical Elements** | `[7, 7, 7, 7, 7]` | No endless loops; preserves relative order | ✅ PASS |
| **Negative Numbers** | `[-5, -1, -10, 0, 4]` | Scales bar heights properly; handles signs | ✅ PASS |
| **Large Dataset** | 500 Random Elements | Executes in under 50ms; renders at 60 FPS | ✅ PASS |

---

## 📋 4. Manual QA Test Plan

| Feature Area | Steps | Expected Outcome |
|---|---|---|
| **Timeline Scrubber** | Start sorting $\rightarrow$ Pause $\rightarrow$ Drag scrubber to step 15 | Array snapshot and highlights update instantly to step 15 |
| **Dual Mode Switch** | Toggle between **Bar Mode** and **Array Mode** | Renders memory cells with pointer badges (`CMP`, `SWAP`, `PIVOT`) |
| **Audio Synthesis** | Toggle sound on $\rightarrow$ click Play | Pitch increases proportionally with higher array values |
| **Lab Manual Export** | Open MSBTE Practical 01 $\rightarrow$ Click **Print / Export PDF** | Browser print window opens with formatted lab report |
| **Challenge Quests** | Complete Mystery Sort challenge | Confetti triggers and +100 XP is credited to student profile |
| **Global Search** | Press `Ctrl + K` $\rightarrow$ Type "Quick" $\rightarrow$ Press Enter | Navigates directly to Quick Sort visualization |
