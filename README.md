# Full Stack Single Binary | React + Material UI + Go + Pocketbase
Ship your full-stack React application as a single executable!
This project combines the power of PocketBase as a backend with a modern React frontend, all compiled into one easy-to-deploy binary.

## ✨ Features
- **Single Binary Deployment**: `pnpm build` → `pocket-react` (≈28 MB) with API, admin UI, and pre‑rendered React assets embedded.
- **Dashboard**: Permanent dark sidebar, top bar, responsive cards & tables (Material UI).
- **Auth**: Email + password via PocketBase users. React login form ‑→ JWT cookie.
- **Built for rapid development**: Hot‑reload Vite dev server, PocketBase auto‑reload, no Docker needed.
- Copy binary + `public/` folder, run with `systemd`, reverse‑proxy via Nginx, HTTPS by Certbot.
- **Type Safety**: Full TypeScript support throughout the stack

## 🚀 Getting Started
### Prerequisites
- Node 20 LTS + pnpm
- Go (v1.24)
- Ubuntu 24.04 LTS
- `build-essential` `pkg-config` `libsqlite3-dev` (for one‑time SQLite build)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## 🏗️ Project Structure
```
├─ frontend/               # Vite root
│  ├─ index.html           # title set here
│  ├─ index.css
│  ├─ main.tsx             # React Router
│  └─ src/
│     ├─ Login.tsx
│     ├─ useAuth.ts
│     ├─ lib/pb.ts
│     └─ admin/
│         ├─ AdminLayout.tsx
│         └─ DashboardHome.tsx
├─ public/                 # static files copied as‑is
├─ dist/                   # vite build output (git‑ignored)
├─ main.go                 # PocketBase entry
├─ pb_data/                # SQLite DB
├─ vite.config.ts          # root=‘frontend’, outDir=‘dist’
└─ Dockerfile, systemd unit, etc.
```

## 📦 Building for Production
To create a production build:
```bash
pnpm build          # vite build + go build -> ./pocket-react```

This will create a single executable named `pocket-react` that contains your entire application. To run it:
```bash
./pocket-react serve
```
Artifacts:
```bash
pocket-react        # single binary
public/             # favicon etc.
```



## 🛠️ Server deploy (systemd + Nginx TLS)
1.	rsync pocket-react public/ <server>:/opt/streamx
2.	/etc/pocket-react.env

```bash
PB_ADDR=0.0.0.0:8080
PB_ADMIN_EMAIL=admin@example.com
PB_ADMIN_PASSWORD=***strong***
```

3. systemd unit:
```bash
[Service]
User=streamxaio
EnvironmentFile=/etc/pocket-react.env
ExecStart=/opt/streamx/pocket-react serve
```

4. Nginx reverse‑proxy + certbot -d yourdomainhere.tld


## Extending
	•	PocketBase schema – add collections in the admin UI, they’re instantly served at /api/collections/<name>/records.
	•	Dashboard widgets – drop new React components in frontend/src/admin/, add <Route> in main.tsx.
	•	REST clients – external apps can consume the same API; CORS is enabled by default.

## 📄 Acknowledgements and License
MIT
Forked from main branch of giacomorebonato/pocket-react
PocketBase – embedded SQLite power.
Material UI 6 – React components & icons.
React Router 6 – client routing.
Vite – dev & build tooling.
