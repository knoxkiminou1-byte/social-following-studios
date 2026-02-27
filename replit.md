# Social Following Studios

## Project Overview
A Vite + React SPA for Social Following Studios — a language infrastructure agency that helps credibility-driven firms build systems that convert authority into growth.

## Tagline / Core Positioning
"We build language infrastructure that turns credibility into growth."

## Tech Stack
- **Frontend:** Vite + React (SPA)
- **Styling:** Tailwind CSS (via CDN in index.html)
- **Routing:** Hash-based client-side routing (`#/`, `#/infrastructure`, `#/case-studies`, `#/contact`, `#/terms`, `#/privacy`)
- **Animation:** Three.js WebGL liquid background on Home page; static dark gradient on inner pages
- **Port:** 5000

## Project Structure
```
src/
  App.jsx          — All components, copy, and routing in one file
public/
  logos-sheet.png  — Trimmed client logo grid (1932×956px)
index.html         — Tailwind CDN, Google Fonts (Space Grotesk)
vite.config.js     — Port 5000, allowedHosts: true
```

## Copy Architecture (inside App.jsx)
All website copy lives in the `COPY` object at the top of `App.jsx`. Sections:
- `COPY.home` — Hero, trust bar, stats, HOW WE WORK section, architecture, closing CTA
- `COPY.infrastructure` — Services (3 disciplines), Who We Serve, Our Process, Engagement Models
- `COPY.caseStudies` — 3 real case studies with challenge/action/result structure
- `COPY.contact` — Contact form
- `COPY.shell` — Nav brand, footer, global CTA label

## Voice & Tone Guidelines
- Calm. Certain. Commercial. Clear.
- Short sentences. 12–18 words average.
- Direct commercial language.
- **Prohibited language:** Command/Commanding, Authority equity, High-intent narrative structures, Industry-defining operators, Conversion engines, Behavioral trigger infrastructure, VC pitch deck language.

## Three Disciplines
1. Strategic Language — messaging, brand voice, copy
2. Owned Distribution — email, newsletter, content workflows
3. Lifecycle Automation — intake, nurture, follow-up sequences

## Placeholders to Update
- `BOOKING_URL = "#"` — replace with real calendar/booking link
- `CONTACT_FORM_ENDPOINT = "#"` — replace with form submission endpoint
- `MAILING_LIST_ENDPOINT = "#"` — replace with mailing list endpoint
- `POLICY_TEMPLATE.email` — `support@socialfollowingstudios.com`
- `POLICY_TEMPLATE.updatedAt` — "January 1, 2026"

## Workflow
- **Start application:** `npm run dev` on port 5000

## Logo Image Notes
- `public/logos-sheet.png` always needs `-trim` with ImageMagick after upload to remove black border padding
- Command: `magick public/logos-sheet.png -trim public/logos-sheet.png`
