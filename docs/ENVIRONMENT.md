# Environment Variables — B2B Textile Marketplace

*Last updated: Phase 0 — Foundation*

> **NEVER commit `.env` files to version control.**
> Use `.env.example` files as templates with placeholder values.

---

## Server (`server/.env`)

| Variable               | Required | Default       | Description                                      |
|------------------------|----------|---------------|--------------------------------------------------|
| `NODE_ENV`             | Yes      | `development` | Runtime environment                              |
| `PORT`                 | No       | `5000`        | Server port                                      |
| `MONGODB_URI`          | Yes      | —             | MongoDB Atlas connection string                  |
| `JWT_SECRET`           | Yes      | —             | JWT signing secret (min 32 chars)                |
| `JWT_REFRESH_SECRET`   | Yes      | —             | JWT refresh token secret (min 32 chars)          |
| `JWT_EXPIRES_IN`       | No       | `15m`         | Access token expiry                              |
| `JWT_REFRESH_EXPIRES`  | No       | `7d`          | Refresh token expiry                             |
| `CLOUDINARY_CLOUD_NAME`| Yes      | —             | Cloudinary account cloud name                    |
| `CLOUDINARY_API_KEY`   | Yes      | —             | Cloudinary API key                               |
| `CLOUDINARY_API_SECRET`| Yes      | —             | Cloudinary API secret                            |
| `HUGGINGFACE_API_KEY`  | Yes      | —             | Hugging Face API key (`hf_...`)                  |
| `CLIENT_URL`           | No       | `http://localhost:5173` | Allowed CORS origin              |
| `LOG_LEVEL`            | No       | `info`        | Pino log level (trace/debug/info/warn/error)     |

---

## Client (`client/.env.local`)

| Variable                   | Required | Description                          |
|----------------------------|----------|--------------------------------------|
| `VITE_API_BASE_URL`        | Yes      | Backend API base URL                 |
| `VITE_APP_NAME`            | No       | App name shown in UI                 |
| `VITE_APP_VERSION`         | No       | App version                          |

---

## Setup Instructions

### Server
```bash
cd server
cp .env.example .env
# Fill in all required values
```

### Client
```bash
cd client
cp .env.example .env.local
# Fill in all required values
```

---

## Getting API Keys

| Service       | URL                                        |
|---------------|--------------------------------------------|
| MongoDB Atlas | https://cloud.mongodb.com                  |
| Cloudinary    | https://cloudinary.com/console             |
| Hugging Face  | https://huggingface.co/settings/tokens     |

---

## Production (Vercel + Render)

Set all client variables in Vercel dashboard → Project → Settings → Environment Variables.
Set all server variables in Render dashboard → Service → Environment.

---

*Add a new row every time a new environment variable is introduced.*
