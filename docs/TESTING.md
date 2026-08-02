# Testing — B2B Textile Marketplace

*Last updated: Phase 0 — Foundation*

---

## Testing Strategy

This project uses a pragmatic testing approach focused on **correctness of business logic** and **API contract validation**.

---

## Testing Layers

| Layer          | Tool           | Scope                               | Priority |
|----------------|----------------|-------------------------------------|----------|
| Unit Tests     | Vitest         | Services, utilities, validators     | High     |
| Integration    | Supertest      | API endpoints                       | High     |
| Component Tests| Vitest + RTL   | Shared UI components                | Medium   |
| E2E Tests      | Playwright     | Critical user flows                 | Low (Phase 5) |

---

## Backend Testing Setup

**Framework:** Vitest (planned)  
**HTTP Testing:** Supertest  
**Location:** `server/src/__tests__/`

### Structure
```
server/src/__tests__/
├── unit/
│   ├── services/
│   └── utils/
└── integration/
    ├── auth.test.ts
    ├── products.test.ts
    └── health.test.ts
```

### Running Tests
```bash
cd server
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:cov   # Coverage report
```

---

## Frontend Testing Setup

**Framework:** Vitest  
**Component Testing:** React Testing Library  
**Location:** `client/src/__tests__/`

### Running Tests
```bash
cd client
npm test           # Run all tests
npm run test:watch # Watch mode
```

---

## Manual QA Checklist (per phase)

### Phase 0 — Foundation
- [x] Server starts without errors
- [x] `GET /api/health` returns 200 with status `ok`
- [x] MongoDB connects successfully
- [x] Frontend dev server starts without errors
- [x] No TypeScript errors in client or server
- [x] No lint errors in client or server

---

## Code Quality Tools

| Tool        | Config File               | Purpose                  |
|-------------|---------------------------|--------------------------|
| ESLint      | `client/.eslintrc.cjs`    | JS/TS linting            |
| TypeScript  | `tsconfig.json`           | Static type checking     |
| Prettier    | `.prettierrc` (planned)   | Code formatting          |

---

*Add new test cases here as features are built.*
