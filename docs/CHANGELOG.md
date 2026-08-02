# Changelog — B2B Textile Marketplace

*Follows [Keep a Changelog](https://keepachangelog.com/) format.*

---

## [Unreleased]

---

## [0.1.0] — 2026-08-02 — Phase 0: Foundation

### Added
- Project monorepo structure (`/client`, `/server`, `/docs`)
- Frontend: Vite + React 18 + TypeScript + Tailwind CSS
- Frontend: Feature-based architecture (`features/`, `shared/`)
- Frontend: React Router v6 skeleton
- Frontend: TanStack Query + Zustand + Axios configured
- Frontend: Framer Motion + Lucide React + Sonner installed
- Frontend: Design system tokens (colors, typography, spacing, radius, shadows, animations)
- Frontend: Path aliases (`@/` → `src/`)
- Backend: Express + TypeScript project
- Backend: Layered architecture (routes/controllers/services/repositories/middleware/validators/models/config/utils/ai)
- Backend: MongoDB Atlas connection via Mongoose
- Backend: Pino structured logger
- Backend: Helmet + CORS security middleware
- Backend: Global error handler middleware
- Backend: Request logging middleware
- Backend: `GET /api/health` endpoint
- Backend: Zod validation setup
- Backend: Fabric categories seed script (`npm run seed`)
- Backend: Environment variable configuration
- Documentation: `README.md`, `CLAUDE.md`, `.gitignore`
- Documentation: `ARCHITECTURE.md`, `DATABASE.md`, `API.md`, `AI.md`
- Documentation: `UI_GUIDELINES.md`, `PROJECT_STATUS.md`, `TODO.md`
- Documentation: `CHANGELOG.md`, `ENVIRONMENT.md`, `TESTING.md`, `DEMO_SCRIPT.md`

---

*Add entries for every meaningful change.*
