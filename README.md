# B2B Textile Marketplace — Humanity Founders Hackathon

Production-grade B2B Textile Marketplace platform featuring AI semantic fabric matching, verified supplier directory, instant RFQ generation, and real-time order tracking.

---

## 🌟 Current Phase Status

- **Phase 0 — Foundation:** ✅ Complete
- **Phase 1 — Design System & UI Library:** ✅ Complete (~60+ Reusable Components & /dev/components Showcase)
- **Phase 2A — Authentication & Authorization:** ✅ Complete (JWT, RBAC, session management)
- **Phase 2B — User Profile & Onboarding:** ✅ Complete (Multi-step onboarding, debounced draft auto-save, personalized welcome)
- **Phase 3A — Marketplace Foundation:** ✅ Complete (Product & Category models, full-text search, multi-faceted filtering, Product Detail with [Add to Cart], [Request Quote], [Contact Supplier], [Save Supplier])
- **Phase 3B — Supplier Catalog Management:** ⏳ Pending Approval
- **Phase 4 — Orders & RFQ:** ⏳ Pending
- **Phase 5 — AI Integration:** ⏳ Pending
- **Phase 6 — Polish & Deployment:** ⏳ Pending

---

## 🛠️ Architecture & Tech Stack

### Frontend (`/client`)
- **Core:** React 18, Vite 8, TypeScript 6
- **Styling:** Tailwind CSS v4, Custom CSS Tokens (Light/Dark theme support)
- **Icons & Animation:** Lucide React, Framer Motion
- **State & Data:** Zustand, TanStack Query, Axios
- **Form & Validation:** React Hook Form, Zod
- **UI Library:** Custom design system (`@/shared/components`) with interactive Storybook showcase at `/dev/components`

### Backend (`/server`)
- **Core:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas + Mongoose
- **Validation & Logging:** Zod, Pino Logger
- **Security:** Helmet, CORS, JWT authentication, bcryptjs

---

## 🎨 Component Showcase

Access the full interactive Storybook-like component showcase in your browser:
```
http://localhost:5173/dev/components
```
Features interactive state controls, dark/light mode toggle, mobile preview, and live variant previews for all 60+ UI primitives, layout wrappers, feedback alerts, data tables, and overlay drawers.

---

## 📖 Documentation Index

- [`CLAUDE.md`](./CLAUDE.md) — Mandatory AI Development Rules
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — System Diagram & Layer Specifications
- [`docs/UI_GUIDELINES.md`](./docs/UI_GUIDELINES.md) — Token Specifications & Component Inventory
- [`docs/DATABASE.md`](./docs/DATABASE.md) — Mongo Data Models & Seed Data
- [`docs/API.md`](./docs/API.md) — RESTful API Endpoint Contracts
- [`docs/PROJECT_STATUS.md`](./docs/PROJECT_STATUS.md) — Progress Tracking Matrix
- [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) — Keep a Changelog Entries
- [`docs/TODO.md`](./docs/TODO.md) — Master Backlog Across Phases
