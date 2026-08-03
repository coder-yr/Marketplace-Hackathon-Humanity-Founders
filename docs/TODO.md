# TODO — B2B Textile Marketplace Backlog

*Last updated: Phase 1 — Design System & UI Foundation*

---

## Phase 0 — Foundation ✅
- [x] Monorepo initialization (`/client` + `/server`)
- [x] TypeScript 6 configuration & path aliases (`@/`)
- [x] Express + Mongoose + Pino backend scaffold
- [x] Tailwind CSS v4 design tokens setup
- [x] Fabric category seed script
- [x] Documentation suite

---

## Phase 1 — Design System & UI Foundation ✅
- [x] Design token expansion & CSS variables (`tokens.ts` & `index.css`)
- [x] Light & Dark theme provider (`ThemeProvider` & `useTheme`)
- [x] Shared custom hooks (`useMediaQuery`, `useDebounce`, `useClickOutside`, `useDisclosure`, `useLocalStorage`)
- [x] Framer Motion animation variants & transitions (`variants.ts`, `transitions.ts`)
- [x] 10 Layout components (`Container`, `Section`, `PageWrapper`, `TopBar`, `Navbar`, `MobileNav`, `Sidebar`, `Footer`, `Breadcrumb`, `SearchHeader`)
- [x] 18 UI Primitives (`Button`, `Input`, `PasswordInput`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Badge`, `Avatar`, `Card`, `Chip`, `Divider`, `Accordion`, `Tabs`, `Tooltip`, `QuantitySelector`, `TagInput`)
- [x] 13 Feedback components (`Alert`, `Banner`, `Modal`, `ConfirmationDialog`, `Loader`, `Spinner`, `ProgressBar`, `Skeleton`, `EmptyState`, `ErrorState`, `SuccessState`, `OfflineState`, `Popover`)
- [x] 8 Data components (`SearchInput`, `Pagination`, `Table`, `FilterPanel`, `SortDropdown`, `StatsCard`, `MetricCard`, `ChartContainer`)
- [x] 2 Overlay components (`Drawer`, `Dropdown`)
- [x] Component showcase page (`/dev/components`)
- [x] Zero TypeScript / Lint / Build errors

---

## Phase 2A — Authentication & Authorization ✅
- [x] User schema (Buyer / Supplier)
- [x] JWT authentication routes (`/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/me`)
- [x] Zod validation schemas for auth
- [x] Zustand auth state store
- [x] Protected & Guest routes
- [x] Choose Role, Login, and Register pages

---

## Phase 2B — User Profile & Onboarding ⏳ (Next)
- [ ] Buyer onboarding wizard page
- [ ] Supplier onboarding wizard page (Company profile, GST, ISO certifications)

---

## Phase 3 — Products & Catalog ⏳
- [ ] Product schema & repository layer
- [ ] Image upload via Multer + Cloudinary
- [ ] Product listing page with search & filter facets
- [ ] Product detail page with spec sheet & MOQ pricing tier table

---

## Phase 4 — Orders & RFQ ⏳
- [ ] RFQ creation wizard modal
- [ ] Supplier quote submission & response list
- [ ] Purchase Order flow & status tracker
- [ ] AI semantic search via Hugging Face embedding API

---

## Phase 5 — Polish & Deploy ⏳
- [ ] Command Palette, Context Menu, Floating Action Button
- [ ] E2E production deployment (Vercel + Render + MongoDB Atlas)
- [ ] Hackathon demo video recording preparation
