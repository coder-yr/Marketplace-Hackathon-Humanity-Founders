# Profile & Onboarding

## Overview

The onboarding system requires users to complete their profile before accessing the core marketplace features. This is enforced via `isOnboarded` flag on the User model.

Profiles are separate from the core `User` model, following a 1-to-1 relationship via the `userId` field. There are two profile collections depending on the user's role:
- `BuyerProfile`
- `SupplierProfile`

## Flow

1. User registers or logs in (`/api/auth/...`)
2. The `ProtectedRoute` wrapper on the frontend checks if `user.isOnboarded` is `true`.
3. If `false`, they are redirected to `/onboarding`.
4. Users complete a multi-step wizard. The frontend uses a debounced save mechanism to persist drafts.
5. On the final step, clicking Complete Profile hits `POST /api/profiles/complete`.
6. This sets `isOnboarded = true` on the `User` model.
7. The user is redirected to the `/workspace-setup` animation, and finally to `/dashboard`.

## Models

### User
- Contains auth-related fields and the `isOnboarded: boolean` flag.

### BuyerProfile
- Contains business details, industry requirements, volume requirements, preferred suppliers, location.

### SupplierProfile
- Contains business details, GST/legal fields, production capacities, MOQs, product categories, descriptions.

## AI Preparation

Fields such as `preferredCategories`, `preferredSupplierType`, `budgetRange` (for Buyers) and `productTypes`, `categories`, `description` (for Suppliers) are used on the Dashboard to provide a personalized "Quick Start" message, and will later be used for AI matching.

## Draft Saving Strategy

The frontend form uses `react-hook-form` to track state. A generic `watch()` subscription on the form triggers a `lodash.debounce` function every 2 seconds after the user stops typing, hitting `PUT /api/profiles/:role/draft`. This ensures progress is never lost even if they close the tab.
