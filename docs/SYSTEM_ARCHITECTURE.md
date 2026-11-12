# AlgoViz Pro – System Architecture & Technical Design

This document details the software architecture, design patterns, event-driven sorting pipeline, and component hierarchy of **AlgoViz Pro**.

---

## 🏗️ 1. High-Level Architecture Diagram

```
+-------------------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER (PORT 3000)                                   |
|                                                                                                 |
|   +-----------------------------------------------------------------------------------------+   |
|   |                                  React 19 Root App (src/App.tsx)                        |   |
|   |  - Active Tab State          - Selected Algorithm / Language   - Audio Synthesis Hook   |   |
|   |  - Profile Persistence       - Global Ctrl+K Hotkey Handler    - Modal Overlays         |   |
|   +--------------------------------------------+--------------------------------------------+   |
|                                                |                                                |
|            +-----------------------------------+-----------------------------------+            |
|            |                                   |                                   |            |
|            v                                   v                                   v            |
|   +------------------+                +------------------+                +------------------+  |
|   | UI Module Layer  |                | Algorithmic Core |                | Storage & Audio  |  |
|   | - Visualizer     |                | - Generator-like |                | - Web Audio API  |  |
|   | - Code Studio    | <============> |   Sort Engine    | <============> |   Tone Generator |  |
|   | - Comparison Lab |  (SortEvents)  | - 10 Algorithms  |  (Audio Tones) | - LocalStorage   |  |
|   | - Real-World App |                | - Step Recorder  |                |   Profile & XP   |  |
|   | - Practicals     |                +------------------+                +------------------+  |
|   | - Quizzes        |                         ^                                                |
|   +------------------+                         |                                                |
+------------------------------------------------|------------------------------------------------+
                                                 | HTTP / REST Calls
                                                 v
+-------------------------------------------------------------------------------------------------+
|                                 NODE.JS EXPRESS BACKEND (server.ts)                             |
|                                                                                                 |
|  +---------------------------+  +---------------------------+  +-----------------------------+  |
|  | /api/health               |  | /api/gemini/chat          |  | /api/code/run               |  |
|  | Health & Diagnostics      |  | Gemini 3.8 Flash Proxy    |  | Sandboxed Code Runner       |  |
|  | Verifies AI readiness     |  | + Offline Rule Fallback   |  | Edge Case Test Suites (1-5) |  |
|  +---------------------------+  +---------------------------+  +-----------------------------+  |
|                                                |                                                |
|                                                v                                                |
|                                   [Google Gemini AI Service]                                    |
+-------------------------------------------------------------------------------------------------+
```

---

## ⚡ 2. The Algorithmic Engine & Event State Machine

Unlike naive visualizers that use `setTimeout` or sleep loops directly inside sorting code (which freeze the browser or make time-scrubbing impossible), AlgoViz Pro uses a **pure, deterministic event-recording pattern**.

### How It Works:
1. **Input Snapshot:** The engine receives a numeric array $A$ and algorithm identifier.
2. **Pure In-Memory Execution:** The sorting algorithm runs synchronously against an in-memory clone of $A$.
3. **Discrete Event Generation:** At every comparison, swap, partition, or active inspection, the algorithm captures:
   - Type of event (`compare`, `swap`, `write`, `pivot`, `active`, `mark-sorted`, `complete`)
   - Involved indices ($i, j$)
   - Involved values ($A[i], A[j]$)
   - Immutable snapshot of array $A$ at that exact microsecond
   - Contextual explanation of the mechanical reasoning
   - Cumulative comparison and swap metrics
4. **Playback & Scrubbing:** The client stores this sequence of `SortEvent[]`. The playback controller can scrub forward, backwards, jump to any step index $k$, change speed on the fly, or restart with zero recalculation latency.

```typescript
export interface SortEvent {
  type: 'compare' | 'swap' | 'write' | 'pivot' | 'active' | 'mark-sorted' | 'complete';
  indices: number[];
  values?: number[];
  arraySnapshot: number[];
  description: string;
  comparisonsCount: number;
  swapsCount: number;
}
```

---

## 🎵 3. Web Audio Synthesis Pipeline

Audio feedback enhances comprehension by sonifying array entropy:

1. **AudioContext Initialization:** Created upon user interaction to comply with browser autoplay security policies.
2. **Harmonic Mapping:** Each array value $v \in [v_{\min}, v_{\max}]$ is normalized and mapped to an audible frequency between $220\text{ Hz}$ (A3) and $880\text{ Hz}$ (A5).
3. **Waveform Timbre:**
   - **Comparisons:** Soft `sine` wave oscillator for 45ms with rapid decay to prevent ear fatigue.
   - **Swaps:** Rich `triangle` wave oscillator for 65ms highlighting memory movement.
   - **Completion Fanfare:** Multi-note ascending arpeggio sweep upon reaching the `complete` event.

---

## 🧠 4. AI Proxy & Offline Fallback Architecture

To ensure data security and prevent API key exposure:

1. **Zero Client-Side Credentials:** The frontend never handles `GEMINI_API_KEY`.
2. **Backend Proxy (`/api/gemini/chat`):** The Express server receives student queries and initializes `@google/genai` with `gemini-3.8-flash`.
3. **Telemetry & Identity:** API calls specify the official client header:
   ```typescript
   apiClient: 'google-genai-sdk/2.4.0 aistudio-build/39471573-2fd1-4b0a-96b7-285607fbd810'
   ```
4. **Offline Rule-Based Fallback:** If `GEMINI_API_KEY` is absent or the workstation is offline, the backend executes an internal DSA curriculum search matching keywords (`bubble`, `merge`, `viva`, `complexity`, `stable`, `adaptive`) and returns structured, verified pedagogical answers immediately.

---

## 🛡️ 5. Record Integrity in Real-World Sorting

When sorting enterprise records (e.g. Student Marks, Bank Transactions, Hospital Patients), naive implementations often sort separate parallel arrays, leading to data corruption (e.g., Student A getting Student B's marks).

AlgoViz Pro guarantees **strict atomic object integrity**:
```typescript
// Each enterprise record is an immutable atomic struct:
export interface StudentRecord {
  id: string;
  rollNo: number;
  name: string;
  marksPercentage: number;
  attendance: number;
}

// Sorting comparator operates on full objects:
const sorted = [...records].sort((a, b) => {
  if (sortKey === 'rollNo') return a.rollNo - b.rollNo;
  if (sortKey === 'marks') return b.marksPercentage - a.marksPercentage;
  return a.name.localeCompare(b.name);
});
```

---

## 💾 6. Client Persistence Schema (LocalStorage)

Student progress, theme, and audio preferences are persisted locally:

```typescript
// Key: 'algoviz_user_profile'
{
  "name": "Prathamesh Sutar",
  "college": "MSBTE Poly",
  "points": 450,
  "streakDays": 5,
  "completedPracticals": ["prac-01", "prac-02"],
  "completedChallenges": ["mystery-bubble", "bug-selection"],
  "quizScores": [ { "date": "2026-11-12", "score": 5, "total": 5 } ]
}

// Key: 'algoviz_settings'
{
  "soundEnabled": true,
  "defaultLanguage": "c",
  "theme": "dark"
}
```
