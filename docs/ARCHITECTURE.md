# Architecture — B2B Textile Marketplace

*Last updated: Phase 0 — Foundation*

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

**Pattern:** Feature-Based Architecture

Each feature is a self-contained module with its own components, hooks, services, and types.

```
client/src/
├── features/
│   ├── auth/              # Login, register, session management
│   ├── buyer/             # Buyer-specific pages and logic
│   ├── supplier/          # Supplier-specific pages and logic
│   ├── products/          # Product listing, detail, search
│   ├── cart/              # Cart and wishlist
│   ├── orders/            # Order management
│   └── ai/                # AI search and recommendations
├── shared/
│   ├── components/        # Reusable UI components
│   ├── layouts/           # Page layouts (MainLayout, AuthLayout)
│   ├── hooks/             # Shared custom hooks
│   ├── utils/             # Pure utility functions
│   ├── design-system/     # Tokens, theme, component variants
│   └── assets/            # Static assets (images, icons)
├── routes/                # React Router configuration
├── types/                 # Shared TypeScript types
└── constants/             # App-wide constants
```

**Rules:**
- Features may NOT import from other features.
- Features may import from `shared/`.
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
├── config/                # DB, Cloudinary, env config
├── utils/                 # Shared utilities
├── scripts/               # Seed scripts, migrations
└── ai/                    # AI integration layer
```

**Request Flow:**
```
Request → Route → Middleware → Validator → Controller → Service → Repository → MongoDB
                                                                ↓
                                                          Cloudinary / Hugging Face
```

---

## Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Monorepo structure | `/client` + `/server` in one repo | Easier coordination in hackathon |
| Feature-based frontend | Yes | Scalable, avoids coupling |
| Layered backend | Yes | Testable, clear separation |
| MongoDB | Atlas cloud | No infra to manage |
| File storage | Cloudinary | Free tier, transforms built-in |
| AI model | sentence-transformers/all-MiniLM-L6-v2 | Fast, free, good for semantic search |

---

*If architecture changes: update this file FIRST, explain why, then implement.*
