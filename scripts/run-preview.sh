#!/usr/bin/env bash
set -euo pipefail

# Production build + local preview (closest to Vercel)
# Requires Node.js 18+ and npm.

npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
