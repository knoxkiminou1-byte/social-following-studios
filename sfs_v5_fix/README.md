# Social Following Studios — Vercel Ready

## Run locally (recommended)

### Option A: Vite dev server (fast, hot reload)

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Then open:
- http://localhost:5173

### Option B: Production build + preview (closest to Vercel)

```bash
npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

Then open:
- http://localhost:4173

## One-command scripts

macOS/Linux:

```bash
chmod +x scripts/*.sh
./scripts/run-local.sh
# or
./scripts/run-preview.sh
```

## Notes
- Navigation uses hash routes (e.g., `#/configure`) so it works on Vercel without special routing.
- Favicon is served from `public/favicon.ico`.
