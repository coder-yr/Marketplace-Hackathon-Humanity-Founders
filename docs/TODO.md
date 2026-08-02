# TODO — B2B Textile Marketplace

*Last updated: Phase 0 — Foundation*

---

## Active Phase: Phase 1 (not yet started)

---

## Phase 1 — Auth & Onboarding

- [ ] User model (Mongoose schema)
- [ ] Register endpoint (`POST /api/auth/register`)
- [ ] Login endpoint (`POST /api/auth/login`)
- [ ] JWT access + refresh token strategy
- [ ] Auth middleware (`requireAuth`, `requireRole`)
- [ ] Buyer onboarding form (company info, preferences)
- [ ] Supplier onboarding form (company info, certifications)
- [ ] Protected route wrapper (frontend)
- [ ] Login page (UI)
- [ ] Register page (UI)
- [ ] Onboarding wizard (UI)
- [ ] Zustand auth store
- [ ] Axios interceptor for token refresh
- [ ] Update API.md with new endpoints
- [ ] Update DATABASE.md with user schema

## Phase 2 — Products & Catalog

- [ ] Product model
- [ ] Category endpoint (`GET /api/categories`)
- [ ] Product CRUD endpoints
- [ ] Image upload (Multer + Cloudinary)
- [ ] Product listing page (UI)
- [ ] Product detail page (UI)
- [ ] Supplier product management (UI)
- [ ] Basic keyword search

## Phase 3 — Orders & RFQ

- [ ] RFQ model
- [ ] Order model
- [ ] RFQ submit flow
- [ ] Order tracking

## Phase 4 — AI Integration

- [ ] Embedding service (Hugging Face)
- [ ] Semantic search endpoint
- [ ] Store embeddings in MongoDB
- [ ] AI search UI component
- [ ] Recommendations engine

## Phase 5 — Polish & Deploy

- [ ] Real-time chat (Socket.io)
- [ ] Vercel deployment config
- [ ] Render deployment config
- [ ] E2E smoke tests
- [ ] Performance audit
- [ ] Accessibility audit

---

## Infrastructure / DevOps

- [ ] GitHub repository setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Staging environment

---

## Completed

- [x] Project structure
- [x] Frontend scaffold (Vite + React + TS + Tailwind)
- [x] Backend scaffold (Express + TS)
- [x] Design system tokens
- [x] Health endpoint
- [x] Fabric categories seed
- [x] Full documentation suite (11 files)
- [x] CLAUDE.md

---

*Add tasks here instead of TODO comments in source code.*
