# SafeRide Pakistan — Frontend

🚐 React SPA for Pakistan's school van transport platform. Built with **Vite**, **React 18**, **Leaflet maps**, and **Chart.js**.

## Features

- **Real-Time GPS Tracking** — Interactive map with moving van marker, route polyline, stop markers, and live ETA updates
- **Driver Registration** — 3-step multi-form with CNIC formatting, file upload UI, and validation
- **Parental Control Panel** — Live tracking, geofence safe zone setup (Leaflet circles), alert history, child profiles
- **Live Attendance System** — Searchable table with present/absent/pending status, real-time counters
- **Analytics Dashboard** — Bar, Line, Doughnut, and Radar charts powered by Chart.js
- **SOS Emergency** — One-tap emergency alert with Pakistani emergency numbers (Police 15, Rescue 1122, Edhi 115)
- **Auth Modals** — Login/Signup modals with tab switching and form validation
- **Urdu Support** — Noto Nastaliq Urdu font, RTL text for Urdu content
- **Toast Notifications** — Success/error/info toast system with auto-dismiss

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Maps | Leaflet 1.9 + react-leaflet |
| Charts | Chart.js 4 + react-chartjs-2 |
| HTTP | Axios 1.7 |
| Routing | react-router-dom (available, not required — single page) |
| Styling | Custom CSS with glassmorphism design system |

## Project Structure

```
frontend/
├── index.html              # Vite entry HTML
├── standalone.html         # Standalone no-server HTML (open directly in browser)
├── vite.config.js          # Vite config with API proxy to backend
├── package.json
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component with all sections
    ├── index.css           # Global CSS — design tokens, reset, all styles
    ├── context/
    │   └── AppContext.jsx  # Global state — auth, role, UI state, toast system
    ├── services/
    │   └── api.js          # Axios instance with JWT interceptor
    └── components/
        ├── Navbar.jsx      # Fixed top nav with auth-aware buttons
        └── Navbar.css      # Navbar-specific styles
```

## Quick Start

```bash
# 1. Clone
git clone https://github.com/awx24/saferide-frontend.git
cd saferide-frontend

# 2. Install
npm install

# 3. Start dev server
npm run dev
```

Frontend runs at **http://localhost:5173**

The Vite dev server proxies `/api` requests to the backend at `http://localhost:5000`.

## Build for Production

```bash
npm run build     # Output in dist/
npm run preview   # Preview the production build locally
```

## Connecting to Backend

The frontend expects the backend API at `/api` (proxied in dev). In production, either:
1. Serve the frontend from Express (`app.use(express.static('dist'))`)
2. Set the API base URL in `src/services/api.js` to your deployed backend

## Design System

Uses a CSS custom property design system with:
- **Dark navy** palette (`#080f1e` to `#112240`)
- **Green** accent (`#00c853` primary, `#00bfa5` secondary)
- **Glassmorphism** cards with `backdrop-filter: blur(20px)`
- **Outfit** font family (Sans-serif) + **Noto Nastaliq Urdu** for Urdu text
- Fully responsive (mobile, tablet, desktop)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (hot reload) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
