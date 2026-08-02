# UI Guidelines — B2B Textile Marketplace

*Last updated: Phase 0 — Foundation*

---

## Design Philosophy

The UI must feel **premium, trustworthy, and efficient** — a professional B2B tool that buyers and suppliers use daily, not a consumer app.

**Principles:**
1. **Clarity over decoration** — Every UI element serves a purpose.
2. **Density-aware** — B2B users need information density, not whitespace abundance.
3. **Speed perception** — Use skeleton loaders, optimistic updates, smooth transitions.
4. **Brand confidence** — Colors and typography must inspire trust.

---

## Design System Location

All tokens are defined in: `client/src/design-system/tokens.ts`  
Extended into Tailwind config: `client/tailwind.config.ts`

**NEVER hardcode design values. Always use tokens.**

---

## Color Palette

| Token              | Value (dark)   | Value (light)  | Usage                         |
|--------------------|----------------|----------------|-------------------------------|
| `brand-primary`    | `#2563EB`      | `#1D4ED8`      | CTAs, links, highlights       |
| `brand-secondary`  | `#7C3AED`      | `#6D28D9`      | Accents, badges               |
| `surface-1`        | `#0F172A`      | `#FFFFFF`      | Base background               |
| `surface-2`        | `#1E293B`      | `#F8FAFC`      | Card backgrounds              |
| `surface-3`        | `#334155`      | `#F1F5F9`      | Dividers, subtle areas        |
| `text-primary`     | `#F8FAFC`      | `#0F172A`      | Main body text                |
| `text-secondary`   | `#94A3B8`      | `#475569`      | Subtitles, placeholders       |
| `text-muted`       | `#64748B`      | `#94A3B8`      | Disabled, metadata            |
| `success`          | `#10B981`      | `#059669`      | Success states                |
| `warning`          | `#F59E0B`      | `#D97706`      | Warnings, pending             |
| `error`            | `#EF4444`      | `#DC2626`      | Errors, destructive actions   |

---

## Typography

| Token           | Font               | Usage                    |
|-----------------|--------------------|--------------------------|
| `font-display`  | Outfit (Google)    | Headlines, hero text     |
| `font-body`     | Inter (Google)     | Body text, UI elements   |
| `font-mono`     | JetBrains Mono     | Code, IDs, SKUs          |

| Scale | Size  | Line Height | Usage              |
|-------|-------|-------------|-------------------- |
| `xs`  | 12px  | 16px        | Captions, metadata |
| `sm`  | 14px  | 20px        | Small labels, hints|
| `base`| 16px  | 24px        | Body text          |
| `lg`  | 18px  | 28px        | Subtitles          |
| `xl`  | 20px  | 28px        | Card titles        |
| `2xl` | 24px  | 32px        | Section headings   |
| `3xl` | 30px  | 36px        | Page headings      |
| `4xl` | 36px  | 40px        | Hero headlines     |

---

## Spacing Scale

Based on 4px baseline grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px`

---

## Border Radius

| Token    | Value  | Usage                         |
|----------|--------|-------------------------------|
| `sm`     | 4px    | Tags, badges                  |
| `md`     | 8px    | Input fields, small buttons   |
| `lg`     | 12px   | Cards                         |
| `xl`     | 16px   | Modal dialogs                 |
| `2xl`    | 24px   | Large panels                  |
| `full`   | 9999px | Pills, avatars                |

---

## Shadows

| Token    | Usage                  |
|----------|------------------------|
| `sm`     | Small cards, dropdowns |
| `md`     | Modals, dialogs        |
| `lg`     | Floating panels        |
| `glow`   | Focus states, CTAs     |

---

## Animation Principles

- **Duration:** 150ms (micro), 300ms (standard), 500ms (complex)
- **Easing:** `ease-out` for entering, `ease-in` for leaving
- **No animation for:** purely informational changes (don't animate data updates)
- Use **Framer Motion** for all page/component transitions
- Use **Tailwind transitions** for hover/focus states

---

## Component Rules

1. **Buttons** must have 3 variants: `primary`, `secondary`, `ghost`
2. **Cards** must use `surface-2` background with `border surface-3`
3. **Inputs** must show error state with red border + error message
4. **Loading states** must use skeleton loaders, not spinners (except buttons)
5. **Empty states** must have an icon + title + description + optional CTA
6. **Toast notifications** use Sonner — no custom alerts

---

## Responsive Breakpoints

| Token  | Width   | Target                  |
|--------|---------|-------------------------|
| `sm`   | 640px   | Large mobile            |
| `md`   | 768px   | Tablet                  |
| `lg`   | 1024px  | Laptop                  |
| `xl`   | 1280px  | Desktop                 |
| `2xl`  | 1536px  | Wide desktop            |

---

*Update this file whenever design decisions change.*
