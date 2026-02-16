# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Style

- Be extremely concise in all actions and commit messages; sacrifice grammar for brevity.

## Project Context

This is **personal-website v2** — a rebuild of nicholaskmilligan.com. The previous version lives in `../Presonal-Website-Old/` and was a Create React App project using React 18, React Router v6, Firebase (Firestore + Auth), and FormSpark for the contact form. Content (projects, skills, about info) was stored in Firebase as a CMS.

The old site had these pages: Home (animated landing with bubbles), Resume, Portfolio (filterable project cards), About, Contact, Sign In/Up, and a Wall page (partially implemented). All styling was in a single `index.css` file with CSS custom properties for gradients.

## Architecture Reference (Old Site)

- **Firebase Firestore** collections: `Portfolio/Category`, `Portfolio/url`, `Portfolio/StackIcons`, `Portfolio/Assets`, `users/{uid}`
- **Firebase Auth**: email/password + Google OAuth
- **Contact form**: FormSpark API + Google reCAPTCHA v2
- **Environment variables**: `REACT_APP_RES_URL` (resume PDF URL)
- **Domain**: nicholaskmilligan.com (deployed via Vercel)

## Architecture (v2)

- **Client**: Vite + React 19 + TypeScript + Tailwind CSS 3 + React Router 7
- **Server**: Express + TypeScript (tsx for dev)
- **Firebase**: Firestore for CMS content (projects, tech stack, bio assets)
- **Contact**: Express `/api/contact` endpoint (nodemailer, currently TODO)
- **Path alias**: `@/` maps to `client/src/`

## Development

```bash
# Install all dependencies
npm run install:all

# Start both client (Vite :5173) and server (Express :3001)
npm run dev

# Run client tests (Jest + Testing Library)
npm test

# Build for production
npm run build

# Health check
curl http://localhost:3001/api/health
```

## Project Structure

```
client/           # Vite + React frontend
  src/
    components/   # Reusable UI (Navbar, Footer, ContactForm, ProjectCard, etc.)
    pages/        # Route pages (Home, About, Projects, Contact, NotFound)
    hooks/        # Custom hooks (useFirestoreDoc)
    lib/          # Firebase init
    types/        # TypeScript interfaces
server/           # Express backend
  src/
    routes/       # API route handlers
    middleware/   # Request validation
```
