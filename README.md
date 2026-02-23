# ALLOul One Hub (MVP)

A 2026-style hybrid platform that combines:
- Professional social networking
- Private company workspaces
- AI assistant workflows
- Organizational memory threads
- Handover package generation

## Tech Stack
- Next.js 14 (App Router)
- TailwindCSS + Framer Motion
- Prisma + PostgreSQL
- NextAuth placeholder endpoint (ready for provider config)

## Run Modes

### 1) Full App (Next.js + API routes)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed demo data:
   ```bash
   npm run seed
   ```
5. Run dev server:
   ```bash
   npm run dev
   ```

### 2) Offline Demo (no npm install)
If your environment cannot access npm registry, run a zero-dependency demo:
```bash
node scripts/start-demo.mjs
```
Then open:
- `http://localhost:4173`

This mode demonstrates the product shell, hybrid feed/workflow interactions, memory search, AI response mock, and handover package generation in-browser.

## Folder Structure
- `app/` UI routes and API handlers
- `lib/` shared in-memory store + helpers
- `prisma/` schema + seed script
- `demo/` offline UI demo assets
- `scripts/start-demo.mjs` offline demo server

## MVP Endpoints
- Auth: `/api/auth/*`
- Companies: `GET/POST /api/companies`, `POST /api/companies/:id/invite`
- Feed: `GET/POST /api/posts`, `POST /api/posts/:id/like`, `POST /api/posts/:id/comment`
- Projects: `GET/POST /api/projects`, `GET/PUT /api/projects/:id`
- Tasks: `GET/POST /api/tasks`, `PUT /api/tasks/:id`
- AI: `POST /api/ai/chat`, `/api/ai/summarize`, `/api/ai/generate-tasks`
- Memory: `GET/POST /api/memory`, `GET /api/memory/search?q=`
- Handover: `POST /api/handover/generate`, `GET /api/handover/:id`

## Deployment
- Frontend: Vercel or Cloud Run
- Containerized deployment available via `Dockerfile`

## Notes
- Full MVP handlers currently use in-memory data store for rapid demo iteration.
- Replace handlers with Prisma-backed persistence and real auth sessions for production.
