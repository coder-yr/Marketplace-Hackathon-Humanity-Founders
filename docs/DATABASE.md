# Database — B2B Textile Marketplace

*Last updated: Phase 2A — Authentication & Authorization*

---

## Overview

**Database:** MongoDB Atlas  
**ODM:** Mongoose  
**Connection:** Environment variable `MONGODB_URI`

---

## Active Collections (Phase 3A)

### `categories`
Stores textile categories and fabric classifications.
- `name` (String), `slug` (String, unique), `description` (String), `imageUrl` (String), `icon` (String), `parentCategory` (Ref Category), `featured` (Boolean), `sortOrder` (Number), `isActive` (Boolean).

### `products`
Stores B2B textile products listed by suppliers.
- `supplierId` (Ref User), `title` (String), `slug` (String, unique), `shortDescription` (String), `description` (String), `category` (Ref Category), `subCategory` (String), `fabricType` (String), `images` (String[]), `priceRange` ({min, max, currency, unit}), `moq` ({value, unit}), `leadTime` (String), `stockStatus` (enum: in_stock, made_to_order, out_of_stock), `certifications` (String[]), `tags` (String[]), `specifications` (Map<String, String>), `featured` (Boolean), `published` (Boolean), `status` (enum: active, draft, archived), `isDeleted` (Boolean).
- **Text Search Index**: Weighted on `title` (10), `tags` (5), `fabricType` (5), `shortDescription` (3), `description` (1).

---

## Collections (Planned for Future Phases)

| Collection         | Purpose                                      |
|--------------------|----------------------------------------------|
| `orders`           | Buyer orders                                 |
| `rfqs`             | Request for Quotations                       |
| `conversations`    | Chat threads between buyer & supplier        |
| `messages`         | Individual chat messages                     |
| `reviews`          | Product/supplier reviews                     |

---

## Seeded Data (Phase 0)

### Fabric Categories

Seeded via `server/src/scripts/seed.ts`.

| Name            | Slug            | Description                                |
|-----------------|-----------------|--------------------------------------------|
| Cotton          | cotton          | Natural plant-based fiber                  |
| Silk            | silk            | Luxury natural fiber from silkworms        |
| Wool            | wool            | Animal fiber from sheep                    |
| Polyester       | polyester       | Synthetic petroleum-based fiber            |
| Linen           | linen           | Natural flax plant fiber                   |
| Denim           | denim           | Sturdy cotton twill weave                  |
| Chiffon         | chiffon         | Lightweight sheer plain woven fabric       |
| Velvet          | velvet          | Soft, dense, cut-pile fabric               |
| Rayon/Viscose   | rayon-viscose   | Semi-synthetic cellulose-based fiber       |
| Nylon           | nylon           | Synthetic polyamide fiber                  |
| Spandex/Lycra   | spandex-lycra   | Highly elastic synthetic fiber             |
| Georgette       | georgette       | Sheer, lightweight crinkled fabric         |

---

## Schema Conventions

- All schemas include `createdAt` and `updatedAt` (via `{ timestamps: true }`).
- All IDs are MongoDB `ObjectId` (Mongoose default).
- Soft deletes: use `isDeleted: Boolean` flag, never hard delete.
- Text search: indexes defined per collection.

---

## Indexes (Planned)

| Collection  | Field(s)                  | Type          | Reason                        |
|-------------|---------------------------|---------------|-------------------------------|
| users       | email                     | Unique        | Login lookup                  |
| products    | name, description         | Text          | Full-text search              |
| products    | category, status          | Compound      | Browse/filter                 |
| categories  | slug                      | Unique        | URL-based lookup              |

---

## Relationships

```
User (supplier) ──< Products
User (buyer) ──< Orders ──< Products
Products >── Category
Orders ──< Messages (via Conversation)
```

---

*Update this file whenever a model or schema changes.*
