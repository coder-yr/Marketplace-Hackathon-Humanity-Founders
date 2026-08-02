# CLAUDE.md — AI Development Guide

> This file governs how AI assistants (Claude, Gemini, Copilot, etc.) must behave when working on this codebase.
> Read this file FIRST before making any changes.

---

## 1. Read Before You Code

- **Always read the relevant documentation** before modifying code.
- Check `docs/ARCHITECTURE.md` before touching structure.
- Check `docs/DATABASE.md` before touching models.
- Check `docs/API.md` before touching routes/controllers.
- Check `docs/PROJECT_STATUS.md` to understand the current phase.
- Check `docs/TODO.md` for pending work.

---

## 2. Phase Discipline

- **Never implement features outside the active phase.**
- The current phase is documented in `docs/PROJECT_STATUS.md`.
- If a feature is not listed in the active phase, do not build it.
- **Wait for explicit approval before starting the next phase.**

---

## 3. Code Integrity

- **Never break completed functionality.** If a change risks breaking existing behavior, flag it first.
- **Never duplicate code.** Extract shared logic into utilities, hooks, or services.
- **Always use reusable components.** UI components must live in `client/src/shared/components/`.
- **Remove dead code.** Never leave unreachable or unused code in the codebase.
- **Remove unused imports.** Every import must be used.
- **No TODO comments inside source code.** Use `docs/TODO.md` instead.

---

## 4. Design System

- **Never hardcode design values** (colors, spacing, font sizes, radii, etc.).
- **Always use design tokens** defined in `client/src/design-system/tokens.ts`.
- **Always use Tailwind classes** derived from the extended Tailwind config.
- Never write inline `style={{}}` for values that have a token equivalent.

---

## 5. Architecture Rules

- **Never modify the architecture without updating `docs/ARCHITECTURE.md` first.**
- Explain *why* the change is needed before implementing it.
- Backend follows Layered Architecture: `routes → controllers → services → repositories → models`.
- Frontend follows Feature-Based Architecture: `features/<domain>/` with shared in `shared/`.
- Cross-feature imports are forbidden. Features must only import from `shared/`.

---

## 6. Documentation Sync

Every phase completion must update ALL of the following:

| File                        | When to update                              |
|-----------------------------|---------------------------------------------|
| `README.md`                 | After any phase completion                  |
| `docs/ARCHITECTURE.md`      | Any structural change                       |
| `docs/DATABASE.md`          | Any model/schema change                     |
| `docs/API.md`               | Any new or modified endpoint                |
| `docs/AI.md`                | Any AI integration change                   |
| `docs/PROJECT_STATUS.md`    | Every phase start and completion            |
| `docs/TODO.md`              | Every task completion or addition           |
| `docs/CHANGELOG.md`         | Every meaningful change                     |
| `docs/ENVIRONMENT.md`       | Any new env variable                        |
| `docs/TESTING.md`           | Any new tests added                         |
| `docs/DEMO_SCRIPT.md`       | Any new user-facing feature                 |

---

## 7. TypeScript Rules

- **Zero TypeScript errors** at all times.
- **Never use `any`** unless absolutely unavoidable. Use `unknown` and narrow.
- All API responses must be typed with interfaces in `client/src/types/` or `server/src/types/`.
- All Mongoose models must have a TypeScript interface paired with the schema.
- Use Zod for runtime validation on both client and server.

---

## 8. Error Handling

- All async functions must have proper error handling.
- Use the global error middleware on the backend (`src/middleware/errorHandler.ts`).
- Use error boundaries on the frontend.
- Never expose stack traces to the client in production.

---

## 9. Security

- Never commit `.env` files.
- Never hardcode secrets, API keys, or credentials.
- All secrets must reference `process.env.*`.
- Validate all incoming request data with Zod on the server.

---

## 10. Naming Conventions

| Context        | Convention          | Example                        |
|----------------|---------------------|--------------------------------|
| Files          | kebab-case          | `product-card.tsx`             |
| React components | PascalCase        | `ProductCard`                  |
| Functions/vars | camelCase           | `fetchProducts`                |
| Constants      | SCREAMING_SNAKE     | `MAX_FILE_SIZE`                |
| Types/Interfaces | PascalCase        | `ProductResponse`              |
| CSS classes    | Tailwind utilities  | `text-sm font-medium`          |
| Env vars       | SCREAMING_SNAKE     | `MONGODB_URI`                  |

---

## 11. Git Discipline

- Commit messages must follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Never commit directly to `main`.
- Branch names: `phase/0-foundation`, `feature/product-listing`, etc.

---

*Last updated: Phase 0 — Foundation*
