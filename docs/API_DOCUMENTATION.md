# AlgoViz Pro – REST API Documentation

This document describes the backend REST API endpoints exposed by the AlgoViz Pro Node.js/Express server (`server.ts`).

---

## 🌐 Server Configuration

- **Base URL:** `http://localhost:3000` (or the configured `APP_URL`)
- **Port:** Configured via `process.env.PORT` (Default: `3000`)
- **Headers:** All JSON endpoints require `Content-Type: application/json`

---

## 📡 Endpoints

### 1. System Health Check
Returns the operational status of the server and indicates whether Google Gemini AI credentials are configured.

- **Method:** `GET`
- **Route:** `/api/health`
- **Authentication:** None required

#### Success Response (200 OK):
```json
{
  "status": "ok",
  "app": "AlgoViz Pro",
  "aiEnabled": true
}
```

#### Example cURL Command:
```bash
curl -s http://localhost:3000/api/health
```

---

### 2. AlgoBuddy AI Chat Proxy
Proxies student queries to Google Gemini 3.8 Flash (`gemini-3.8-flash`) using `@google/genai`. If no API key is set or the service is offline, the endpoint seamlessly serves answers from its embedded pedagogical rule base.

- **Method:** `POST`
- **Route:** `/api/gemini/chat`
- **Authentication:** Handled server-side via `process.env.GEMINI_API_KEY`

#### Request Payload:
```json
{
  "message": "What is the worst-case time complexity of Quick Sort, and how can we prevent it?"
}
```

#### Success Response (200 OK):
```json
{
  "reply": "Quick Sort has a worst-case time complexity of O(n^2), which occurs when the pivot chosen is always the extreme element (e.g. smallest or largest in an already sorted array). To prevent this, use Randomized Pivot selection or the Median-of-Three strategy.",
  "source": "gemini"
}
```

#### Fallback Response (When API Key is omitted):
```json
{
  "reply": "Quick Sort Viva Answer: Quick Sort is an in-place, divide-and-conquer sorting algorithm with average time complexity O(n log n) and worst-case O(n^2) when an extreme element is repeatedly selected as pivot.",
  "source": "offline-knowledge-base"
}
```

#### Error Response (400 Bad Request):
```json
{
  "error": "Message is required."
}
```

#### Example cURL Command:
```bash
curl -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Why is Insertion Sort adaptive?"}'
```

---

### 3. Sandboxed Code Runner
Executes and validates student algorithm code in an isolated JavaScript runtime against 5 test suites.

- **Method:** `POST`
- **Route:** `/api/code/run`
- **Authentication:** None required

#### Request Payload:
```json
{
  "language": "javascript",
  "algorithm": "bubble",
  "code": "function bubbleSort(arr) { let swapped; do { swapped = false; for(let i = 0; i < arr.length - 1; i++) { if(arr[i] > arr[i+1]) { let temp = arr[i]; arr[i] = arr[i+1]; arr[i+1] = temp; swapped = true; } } } while(swapped); return arr; }"
}
```

#### Success Response (200 OK):
```json
{
  "success": true,
  "results": [
    {
      "name": "General Random Array",
      "passed": true,
      "input": [64, 34, 25, 12, 22, 11, 90],
      "output": [11, 12, 22, 25, 34, 64, 90]
    },
    {
      "name": "Already Sorted Array (Omega(n))",
      "passed": true,
      "input": [1, 2, 3, 4, 5],
      "output": [1, 2, 3, 4, 5]
    },
    {
      "name": "Reverse Sorted Array (Worst Case)",
      "passed": true,
      "input": [5, 4, 3, 2, 1],
      "output": [1, 2, 3, 4, 5]
    },
    {
      "name": "Duplicates Heavy Array",
      "passed": true,
      "input": [3, 1, 3, 2, 1],
      "output": [1, 1, 2, 3, 3]
    },
    {
      "name": "Array with Negative Integers",
      "passed": true,
      "input": [-5, 2, -1, 0, 4],
      "output": [-5, -1, 0, 2, 4]
    }
  ],
  "metrics": {
    "executionTimeMs": 2,
    "totalTests": 5,
    "testsPassed": 5
  }
}
```

#### Execution Failure Response (200 OK with `success: false`):
```json
{
  "success": false,
  "error": "ReferenceError: temp is not defined",
  "results": []
}
```

#### Example cURL Command:
```bash
curl -X POST http://localhost:3000/api/code/run \
  -H "Content-Type: application/json" \
  -d '{
    "language": "javascript",
    "algorithm": "selection",
    "code": "function sort(arr) { return arr.sort((a,b) => a - b); }"
  }'
```
