# AlgoViz Pro – Installation & Setup Guide

This guide provides step-by-step instructions for installing, configuring, running, and troubleshooting **AlgoViz Pro** across multiple environments (local development, Docker containers, and cloud hosts).

---

## 📋 System Requirements

### Hardware Requirements
- **Processor:** 1.6 GHz dual-core or faster (Apple Silicon, Intel, AMD x86_64, or ARM64)
- **Memory (RAM):** 4 GB minimum (8 GB recommended for simultaneous browser devtools)
- **Disk Space:** ~500 MB free storage for `node_modules` and build output

### Software Requirements
- **Node.js:** `v18.0.0` or higher (`v20.x` or `v22.x` LTS recommended)
- **npm:** `v9.0.0` or higher (bundled with Node.js)
- **Git:** `v2.25.0` or higher
- **Web Browser:** Modern evergreen browser (Chrome 110+, Firefox 110+, Safari 16+, Microsoft Edge 110+)

---

## 🛠️ Step-by-Step Local Setup

### 1. Verify Prerequisites
Before beginning, open your terminal and verify your Node.js and npm versions:

```bash
node -v
# Output should be v18.0.0 or higher (e.g. v20.18.0)

npm -v
# Output should be 9.0.0 or higher (e.g. 10.8.2)

git --version
# Output should be 2.25.0 or higher
```

If Node.js is not installed, download it from [https://nodejs.org/](https://nodejs.org/) or install it using `nvm` (Node Version Manager):

```bash
# Optional: Using nvm
nvm install 20
nvm use 20
```

---

### 2. Clone the Repository
Clone the repository using Git and change into the project root directory:

```bash
git clone https://github.com/prathameshsutar140/sorting-visualizer.git
cd sorting-visualizer
```

---

### 3. Install Dependencies
Run the standard package installation command:

```bash
npm install
```

This installs both runtime dependencies (React, Vite, Express, Tailwind CSS, Lucide icons, Canvas Confetti) and dev dependencies (TypeScript, TSX, type definitions).

---

### 4. Configure Environment Variables
Copy `.env.example` to create your active `.env` file:

```bash
cp .env.example .env
```

Open `.env` in your text editor:

```env
# Port on which the server listens (defaults to 3000)
PORT=3000

# Optional: Google Gemini API Key for AlgoBuddy AI Assistant
# If omitted or left empty, AlgoViz Pro's built-in offline DSA tutor automatically activates!
GEMINI_API_KEY=""

# Base application URL
APP_URL="http://localhost:3000"
```

#### How to get a Google Gemini API Key (Optional):
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** and create a new key.
4. Paste the key into your `.env` file: `GEMINI_API_KEY="AIzaSy..."`

---

### 5. Start the Development Server
Launch the full-stack dev server using `tsx`:

```bash
npm run dev
```

You should see output similar to:
```
==================================================
  AlgoViz Pro – Algorithm Platform Server
  Port:        3000
  Mode:        development
  AI Enabled:  true [or false with offline fallback]
==================================================
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

### 6. Production Build & Execution

To test the optimized production build locally:

```bash
# 1. Compile client assets and bundle with Vite
npm run build

# 2. Launch production server
npm start
```

---

## 🐳 Running with Docker

You can also run AlgoViz Pro inside a Docker container without installing Node.js locally.

### Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json
EXPOSE 3000
CMD ["npm", "start"]
```

### Build and Run:
```bash
docker build -t algoviz-pro .
docker run -p 3000:3000 -e GEMINI_API_KEY="your-key-here" algoviz-pro
```

---

## ❓ Troubleshooting & FAQs

### Issue 1: `Error: listen EADDRINUSE: address already in use :::3000`
**Cause:** Another application or an existing AlgoViz instance is already running on port 3000.  
**Resolution:**
- Option A: Kill the existing process:
  ```bash
  # Linux/macOS
  lsof -ti :3000 | xargs kill -9

  # Windows (PowerShell)
  Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
  ```
- Option B: Set a different port:
  ```bash
  PORT=3005 npm run dev
  ```

### Issue 2: `npm install` throws peer dependency warnings
**Resolution:** All dependencies in `package.json` are compatible with React 19 and Vite 8. If using an older npm version, run:
```bash
npm install --legacy-peer-deps
```

### Issue 3: Sound is not playing during sorting comparisons
**Cause:** Modern web browsers block automatic audio playback until the user interacts with the page (User Gesture Requirement).  
**Resolution:** Click anywhere on the webpage or click the **Sound** toggle icon in the top navigation bar to initialize the Web Audio API context.

### Issue 4: Offline usage
AlgoViz Pro is completely self-contained. Even without internet access, all 10 sorting algorithms, the visualizer, code studio, comparison lab, real-world systems, MSBTE practicals, quiz, and AlgoBuddy offline knowledge base function seamlessly!
