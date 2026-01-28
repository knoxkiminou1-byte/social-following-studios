#!/usr/bin/env bash
set -euo pipefail

# Local dev server (hot reload)
# Requires Node.js 18+ and npm.

npm install
npm run dev -- --host 0.0.0.0 --port 5173
