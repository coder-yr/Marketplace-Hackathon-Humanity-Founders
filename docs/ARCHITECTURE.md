# Architecture — B2B Textile Marketplace

*Last updated: Phase 2A — Authentication & Authorization*

---

## Overview

The system follows a **client-server architecture** with a clear separation of concerns:

- **Frontend**: React SPA served via Vercel
- **Backend**: RESTful Express API served via Render
- **Database**: MongoDB Atlas (cloud)
- **File Storage**: Cloudinary
- **AI**: Hugging Face Inference API (external)

---

## System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Client (Vercel)                   │
│                    React + Vite + TS                     │
│          Feature-based architecture (see below)          │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS REST API
                         ▼
┌─────────────────────────────────────────────────────────┐
│                     Server (Render)                      │
│                  Express + TypeScript                    │
│           Layered Architecture (see below)               │
└──────┬──────────────────┬──────────────────┬────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────┐  ┌───────────────┐  ┌──────────────────┐
│ MongoDB Atlas│  │  Cloudinary   │  │  Hugging Face    │
│  (Database)  │  │ (File Storage)│  │  (AI Inference)  │
└──────────────┘  └───────────────┘  └──────────────────┘
```

---

## Frontend Architecture

**Pattern:** Feature-Based Architecture with Shared UI Core

```
client/src/
├── features/
│   ├── auth/              # Login, register, session management
│   ├── buyer/             # Buyer-specific pages and logic
│   ├── supplier/          # Supplier-specific pages and logic
│   ├── products/          # Product listing, detail, search
│   ├── orders/            # Order management
│   ├── ai/                # AI search and recommendations
│   ├── dev/               # Component showcase (/dev/components)
│   └── home/              # Homepage
├── shared/
│   ├── components/        # Master barrel export (@/shared/components)
│   │   ├── layout/        # Navbar, Sidebar, Footer, Container, TopBar, Breadcrumb...
│   │   ├── ui/            # Button, Input, Select, Badge, Card, Accordion, Tabs...
│   │   ├── feedback/      # Alert, Banner, Modal, Skeleton, Loader, Popover...
│   │   ├── data/          # Table, Pagination, FilterPanel, StatsCard...
│   │   └── overlay/       # Drawer, Dropdown
│   ├── animations/        # Framer Motion variants & transitions
│   ├── context/           # ThemeProvider (Dark / Light mode)
│   ├── hooks/             # useTheme, useMediaQuery, useDebounce, useDisclosure...
│   ├── utils/             # cn() tailwind-merge helper, api-client
│   └── layouts/           # MainLayout
├── routes/                # AppRouter with /dev/components route
├── types/                 # Shared TypeScript types
└── constants/             # App-wide constants
```

**Rules:**
- Features may NOT import from other features.
- Features MUST import shared UI primitives from `@/shared/components`.
- `shared/` must never import from `features/`.

---

## Backend Architecture

**Pattern:** Layered Architecture

```
server/src/
├── routes/                # Express route definitions
├── controllers/           # Request/response handling
├── services/              # Business logic
├── repositories/          # Database access layer
├── middleware/            # Auth, error handling, logging
├── validators/            # Zod request schemas
├── models/                # Mongoose models + TS interfaces
├── config/                # DB, env, logger config
└── scripts/               # Seed scripts
```

---

## Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Monorepo structure | `/client` + `/server` in one repo | Faster coordination in hackathon |
| UI Component Architecture | Master Design System (`shared/components`) | Ensures 100% UI consistency across phases |
| Theme System | CSS variables + Tailwind v4 + ThemeProvider | Instant dark/light mode toggle |
| Component Showcase | `/dev/components` route | Acts as interactive Storybook for testing |
| Authentication | JWT + `localStorage` + Axios Interceptors | Standard SPA auth flow; interceptors handle silent refresh |
| Authorization | RBAC Middlewares + `ProtectedRoute` Guard | Encapsulates access control logic away from business components |
