# UI Guidelines & Component Inventory — B2B Textile Marketplace

*Last updated: Phase 1 — Design System & UI Foundation*

---

## Design Philosophy

The UI must feel **premium, trustworthy, and efficient** — a professional B2B tool that buyers and suppliers use daily.

**Principles:**
1. **Clarity over decoration** — Every UI element serves a purpose.
2. **Density-aware** — B2B users need information density, not whitespace abundance.
3. **Speed perception** — Use skeleton loaders, optimistic updates, smooth transitions.
4. **Brand confidence** — Colors and typography must inspire trust.

---

## Design Tokens Location & Theme System

All tokens are defined in `client/src/design-system/tokens.ts` and registered directly with Tailwind CSS v4 in `client/src/index.css`.

Theme switching (`data-theme="dark"` / `data-theme="light"`) is dynamically handled by `<ThemeProvider>` in `client/src/shared/context/theme-context.tsx`.

---

## Complete Component Inventory

### 1. Layout Components (`client/src/shared/components/layout/`)
- **Container**: Max-width wrapper (`sm`, `md`, `lg`, `xl`, `2xl`, `full`) with responsive padding.
- **Section**: Semantic `<section>` with title, subtitle, and border options.
- **PageWrapper**: Full-page wrapper handling navbar offset and Framer Motion entry transitions.
- **TopBar**: Announcement and notification strip.
- **Navbar**: Main top navigation bar with brand logo, nav links, theme toggle, and mobile trigger.
- **MobileNav**: Responsive slide-out drawer for small viewports.
- **Sidebar**: Collapsible sidebar with grouped navigation items and badges.
- **Footer**: Multi-column site footer with copyright and legal links.
- **Breadcrumb**: Trail navigation with icons and current route highlighting.
- **SearchHeader**: Hero section with gradient background blurs and search input.

### 2. UI Primitives (`client/src/shared/components/ui/`)
- **Button**: 7 variants (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `link`), 3 sizes, loading state, icon slots, press animation.
- **Input**: Text input with label, hint, error text, prefix/suffix icons, ARIA attributes.
- **PasswordInput**: Input with show/hide password toggle.
- **Textarea**: Resizable textarea with character count indicator.
- **Select**: Native select with custom chevron and error state.
- **Checkbox**: Checkbox with label, description, error, and indeterminate state.
- **Radio**: Radio button with label and description.
- **Switch**: Toggle switch with size options and animated thumb.
- **Badge**: 8 variants, dot indicator, removable tag mode.
- **Avatar**: Image avatar with initials fallback, 6 sizes, online indicator.
- **Card**: Surface card with `CardHeader`, `CardBody`, `CardFooter` slots, glassmorphism, and hover lift effects.
- **Chip**: Removable filter chip with active brand states.
- **Divider**: Horizontal/vertical line with optional label.
- **Accordion**: Animated expand/collapse items using Framer Motion.
- **Tabs**: Tab navigation with `underline`, `pills`, `segmented` variants and animated underline indicator.
- **Tooltip**: Hover/focus tooltip with 4 placement options.
- **QuantitySelector**: Meter counter input with +/- buttons and min/max clamping.
- **TagInput**: Multi-tag creation field with Enter/Backspace support.

### 3. Feedback Components (`client/src/shared/components/feedback/`)
- **Alert**: 4 semantic feedback variants (`info`, `success`, `warning`, `error`), dismissible button.
- **Banner**: Announcement banner strip.
- **Modal**: Portal-rendered modal dialog with backdrop click, Escape key listener, and focus trap.
- **ConfirmationDialog**: Pre-built confirmation dialog for destructive actions.
- **Loader**: Page/section spinner overlay.
- **Spinner**: Inline spinner for buttons and micro-loading.
- **ProgressBar**: Animated progress bar with percentage readout.
- **Skeleton**: Shimmer/pulse skeleton loaders with presets for cards, tables, and avatars.
- **EmptyState**: Empty list graphic state with action CTA.
- **ErrorState**: Exception error display with retry button.
- **SuccessState**: Action confirmation display.
- **OfflineState**: Network connection failure display.
- **Popover**: Click-triggered floating popover container.

### 4. Data Components (`client/src/shared/components/data/`)
- **SearchInput**: Input with search icon, clear button, and spinner.
- **Pagination**: Smart page numbers, first/last buttons, page size selector.
- **Table**: Typed generic table with custom column renderers and skeleton row fallbacks.
- **FilterPanel**: Sidebar filter facet container.
- **SortDropdown**: Compact sort selection dropdown.
- **StatsCard**: Metric KPI card with positive/negative trend badges.
- **MetricCard**: Summary metric block with icons.
- **ChartContainer**: Slot container for analytical charts.

### 5. Overlay Components (`client/src/shared/components/overlay/`)
- **Drawer**: Sliding panel (left/right/bottom) with portal backdrop.
- **Dropdown**: Contextual dropdown menu with dividers and danger items.

---

## Interactive Showcase

Run dev server and navigate to:
`http://localhost:5173/dev/components`
