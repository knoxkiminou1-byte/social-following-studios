# Social Following Studios

A React + Vite single-page application for Social Following Studios — a conversion infrastructure and strategic language agency.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + PostCSS
- **3D**: Three.js 0.128
- **Routing**: Hash-based client-side routing (no router library)

## Project Structure

```
src/
  App.jsx       # Main app with all pages and routing logic
  main.jsx      # React entry point
  index.css     # Global styles
public/         # Static assets (favicon, icons)
index.html      # HTML entry point
```

## Running the App

```bash
npm run dev     # Start dev server on port 5000
npm run build   # Build for production
npm run preview # Preview production build
```

## Replit Configuration

- Dev server bound to `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy compatibility
- Workflow: "Start application" runs `npm run dev`
