# AlgoViz Pro – Production Deployment Guide

This guide covers production deployment strategies for **AlgoViz Pro**, including Docker containerization, Google Cloud Run, Linux VPS (Ubuntu/Debian with systemd and Nginx), and modern cloud PaaS providers.

---

## 🏗️ Production Architecture Overview

AlgoViz Pro is a unified full-stack application. In production:
- The compiled static frontend assets reside in `/dist`.
- The Node.js Express server (`server.ts`) serves the static `/dist` directory while hosting the backend API endpoints (`/api/*`).
- The production command configured in `package.json` is:
  ```bash
  npm run build
  npm start
  ```

---

## ☁️ Option 1: Google Cloud Run (Recommended)

Google Cloud Run provides automated scaling and HTTPS support.

### 1. Dockerfile
Create a `Dockerfile` in the root of your project:

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

### 2. Deploy Command
```bash
gcloud run deploy algoviz-pro \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="your-api-key"
```

---

## 🐧 Option 2: Linux VPS (Ubuntu / Debian with Systemd & Nginx)

### 1. Setup on Server
```bash
# Clone the repository
git clone https://github.com/prathameshsutar140/sorting-visualizer.git /var/www/algoviz-pro
cd /var/www/algoviz-pro

# Install dependencies and build
npm install
npm run build
```

### 2. Configure Systemd Service
Create `/etc/systemd/system/algoviz.service`:

```ini
[Unit]
Description=AlgoViz Pro Web Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/algoviz-pro
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=GEMINI_API_KEY=your_key_here

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable algoviz
sudo systemctl start algoviz
```

### 3. Nginx Reverse Proxy Configuration
Create `/etc/nginx/sites-available/algoviz.conf`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/algoviz.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🚀 Option 3: Modern PaaS (Render, Railway, Fly.io)

### Configuration Settings:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `NODE_ENV=production`
  - `PORT=3000`
  - `GEMINI_API_KEY=your_key_here` (Optional)

---

## 🔒 Security Best Practices for Production

1. **Keep Secrets Server-Side:** Never expose `GEMINI_API_KEY` to the client browser.
2. **Reverse Proxy Headers:** Ensure `X-Forwarded-For` and `X-Forwarded-Proto` are preserved for accurate logging.
3. **Graceful Shutdown:** The Express server handles `SIGINT` and `SIGTERM` signals for zero-downtime rolling deploys.
