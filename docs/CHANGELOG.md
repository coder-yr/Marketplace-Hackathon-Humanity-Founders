# Changelog — B2B Textile Marketplace

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.0] - 2026-08-02

### Added - Phase 3A Marketplace Foundation
- Created `Product` Mongoose model with weighted Mongo full-text search indexes (`title`, `description`, `tags`, `fabricType`).
- Extended `Category` model schema with `icon`, `parentCategory`, `featured`, and `sortOrder`.
- Built `CategoryRepository`, `CategoryService`, `ProductRepository`, and `ProductService` supporting multi-faceted filters (category, fabric, max MOQ, price, stock status) and sorting (`newest`, `price_asc`, `price_desc`, `moq_asc`, `title_asc`).
- Added REST APIs: `GET /api/products`, `GET /api/products/featured`, `GET /api/products/:idOrSlug`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`, `GET /api/categories`, `GET /api/categories/:slug`.
- Enhanced database seed script `seed.ts` with 6 categories, 2 verified suppliers, and 6 rich B2B textile products.
- Created `ProductCard`, `ProductGallery`, and `ProductFilterPanel` frontend components using Design System.
- Revamped Landing Page (`HomePage.tsx`), built `MarketplacePage.tsx`, `CategoriesPage.tsx`, and `ProductDetailPage.tsx`.
- Extended Product Detail Page with explicit user action buttons: `[ Add to Cart ]`, `[ Request Quote ]`, `[ Contact Supplier ]`, and `[ Save Supplier ]`.

---

## [0.3.0] - 2026-08-02

### Added - Phase 2A Authentication & Authorization
- Added `User` Mongoose model with `bcrypt` password hashing.
- Added `/api/auth/register`, `/login`, `/refresh`, `/logout`, and `/me` backend routes.
- Implemented `requireAuth` and `requireRole` middleware for Role-Based Access Control.
- Configured basic rate limiting via `express-rate-limit` for authentication routes.
- Created robust frontend session management using `zustand` (`auth.store.ts`).
- Configured global Axios interceptors for automatic token injection and 401 token refresh.
- Built `ChooseRolePage`, `RegisterPage`, and `LoginPage` utilizing the Design System components.
- Added `ProtectedRoute` and `GuestRoute` wrappers to handle secure client-side navigation.
- Added `UnauthorizedPage` and `PlaceholderRolePage`.

---

## [0.2.0] - 2026-08-02

### Added - Phase 1 Design System & UI Library
- Created complete master Design System in `client/src/shared/components/`.
- Implemented full Light and Dark theme system via CSS variables and `<ThemeProvider>`.
- Built 6 shared custom hooks (`useTheme`, `useMediaQuery`, `useDebounce`, `useClickOutside`, `useDisclosure`, `useLocalStorage`).
- Built Framer Motion animation preset library (`variants.ts`, `transitions.ts`).
- Built 10 Layout components (`Container`, `Section`, `PageWrapper`, `TopBar`, `Navbar`, `MobileNav`, `Sidebar`, `Footer`, `Breadcrumb`, `SearchHeader`).
- Built 18 UI Primitives (`Button`, `Input`, `PasswordInput`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Badge`, `Avatar`, `Card`, `Chip`, `Divider`, `Accordion`, `Tabs`, `Tooltip`, `QuantitySelector`, `TagInput`).
- Built 13 Feedback components (`Alert`, `Banner`, `Modal`, `ConfirmationDialog`, `Loader`, `Spinner`, `ProgressBar`, `Skeleton`, `EmptyState`, `ErrorState`, `SuccessState`, `OfflineState`, `Popover`).
- Built 8 Data components (`SearchInput`, `Pagination`, `Table`, `FilterPanel`, `SortDropdown`, `StatsCard`, `MetricCard`, `ChartContainer`).
- Built 2 Overlay components (`Drawer`, `Dropdown`).
- Created interactive component showcase page at `/dev/components` (`DevPage.tsx`) with dark mode toggle and mobile preview.
- Wired Sonner toast notifications with theme-aware styling.

---

## [0.1.0] - 2026-08-02

### Added - Phase 0 Foundation
- Initialized monorepo with `/client` (Vite, React, TypeScript, Tailwind) and `/server` (Express, TypeScript, MongoDB).
- Configured path aliases, design tokens, Pino logger, Mongoose database connection, Zod validation, and error middleware.
- Created fabric category seed script with 12 initial categories.
- Added full documentation suite (11 files).
