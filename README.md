# Simple Todo (Next.js + Tailwind)

A minimal todo app built with Next.js (App Router) and Tailwind CSS v4. Includes component tests using Vitest + Testing Library. Persists todos to localStorage (client-side). An optional API route can be added later.

## Prerequisites
- Node.js 18+
- npm 9+

## Getting Started
```bash
cd web
npm install
npm run dev
```
Open http://localhost:3000

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm start` – start production server
- `npm run test` – run unit tests (Vitest)

## Project Structure
- `src/app` – App Router pages and layout
- `src/components` – UI components (`TodoApp`)
- `src/app/globals.css` – Tailwind v4 + plugins (forms, typography)
- `vitest.config.ts` / `vitest.setup.ts` – test configuration

## Notes
- Todos are stored in `localStorage` under key `simpletodo.todos`.
- Tailwind plugins enabled via `@plugin` directives in CSS.

## Optional API (future)
Add simple in-memory endpoints under `src/app/api/todos/route.ts` to back the UI.
