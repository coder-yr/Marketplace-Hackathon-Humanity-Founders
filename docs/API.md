# API Reference — B2B Textile Marketplace

*Last updated: Phase 2A — Authentication & Authorization*

---

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://textile-marketplace-api.onrender.com/api`

---

## Conventions

- All requests/responses use `application/json`.
- Authentication: `Authorization: Bearer <jwt_token>` header.
- Paginated responses use `{ data, pagination: { page, limit, total, pages } }`.
- Error responses use `{ success: false, error: { code, message, details? } }`.
- Success responses use `{ success: true, data: {...} }`.

---

## HTTP Status Codes

| Code | Meaning                        |
|------|--------------------------------|
| 200  | OK                             |
| 201  | Created                        |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized                   |
| 403  | Forbidden                      |
| 404  | Not Found                      |
| 409  | Conflict (duplicate)           |
| 422  | Unprocessable Entity           |
| 500  | Internal Server Error          |

---

## Endpoints

### System

| Method | Path         | Auth | Description         |
|--------|--------------|------|---------------------|
| GET    | /api/health  | No   | Health check        |

---

### Auth (Phase 2A)

| Method | Path                    | Auth | Description              |
|--------|-------------------------|------|--------------------------|
| POST   | /api/auth/register      | No   | Register new user        |
| POST   | /api/auth/login         | No   | Login, get JWT           |
| POST   | /api/auth/refresh       | No   | Refresh access token     |
| POST   | /api/auth/logout        | Yes  | Invalidate refresh token |
| GET    | /api/auth/me            | Yes  | Get current user         |

---

### Products (Phase 3A)

| Method | Path                       | Auth     | Description               |
|--------|----------------------------|----------|---------------------------|
| GET    | /api/products              | No       | Search & list products    |
| GET    | /api/products/featured     | No       | Get featured products     |
| GET    | /api/products/:idOrSlug    | No       | Get product & supplier    |
| POST   | /api/products              | Supplier | Create new product        |
| PUT    | /api/products/:id          | Supplier | Update product            |
| DELETE | /api/products/:id          | Supplier | Soft delete product       |

---

### Categories (Phase 3A)

| Method | Path              | Auth | Description           |
|--------|-------------------|------|-----------------------|
| GET    | /api/categories   | No   | List all categories   |
| GET    | /api/categories/:slug | No | Get category by slug |

---

### AI (Phase 4)

| Method | Path                    | Auth | Description                   |
|--------|-------------------------|------|-------------------------------|
| GET    | /api/ai/search          | No   | Semantic product search       |
| GET    | /api/ai/recommendations | Yes  | Personalized recommendations  |

---

## Response Examples

### Health Check
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-08-02T10:00:00.000Z",
    "version": "0.1.0",
    "environment": "development"
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [
      { "field": "email", "message": "Invalid email address" }
    ]
  }
}
```

---

*Update this file whenever a new endpoint is added or modified.*
