# B2B Textile Marketplace

> A production-quality B2B marketplace connecting textile suppliers with buyers — built for the Humanity Founders Hackathon.

---

## 🧵 Overview

This platform enables textile suppliers to list fabrics, yarns, and raw materials, while buyers can browse, search (AI-powered), request quotes, and place bulk orders.

**Key Features (planned):**
- AI-powered product search & recommendations
- Supplier discovery and verification
- Bulk order management & RFQ system
- Real-time chat between buyers and suppliers
- Smart pricing suggestions via AI

---

## 🏗 Tech Stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Frontend    | React 18, Vite, TypeScript, Tailwind CSS            |
| State       | Zustand, TanStack Query                             |
| Forms       | React Hook Form + Zod                               |
| Animation   | Framer Motion                                       |
| Backend     | Node.js, Express, TypeScript                        |
| Database    | MongoDB Atlas + Mongoose                            |
| Auth        | JWT + bcrypt                                        |
| File Upload | Multer + Sharp + Cloudinary                         |
| AI          | Hugging Face (sentence-transformers/all-MiniLM-L6-v2) |
| Deployment  | Vercel (frontend) + Render (backend) + MongoDB Atlas |

---

## 📁 Project Structure

```
/
├── client/          # React frontend (Vite)
├── server/          # Express backend
├── docs/            # All documentation
├── CLAUDE.md        # AI development guide
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Cloudinary account
- Hugging Face API key

### Frontend
```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

---

## 📚 Documentation

| Document                        | Purpose                              |
|---------------------------------|--------------------------------------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design and structure |
| [DATABASE.md](docs/DATABASE.md)         | MongoDB schemas and models  |
| [API.md](docs/API.md)                   | REST API reference          |
| [AI.md](docs/AI.md)                     | AI integration guide        |
| [UI_GUIDELINES.md](docs/UI_GUIDELINES.md) | Design system rules       |
| [PROJECT_STATUS.md](docs/PROJECT_STATUS.md) | Current phase & progress |
| [TODO.md](docs/TODO.md)                 | Pending tasks               |
| [CHANGELOG.md](docs/CHANGELOG.md)       | Change history              |
| [ENVIRONMENT.md](docs/ENVIRONMENT.md)   | Environment variables       |
| [TESTING.md](docs/TESTING.md)           | Testing strategy            |
| [DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md)   | Hackathon demo flow         |

---

## 📊 Project Status

**Current Phase:** Phase 0 — Foundation  
**Overall Progress:** 10%

See [PROJECT_STATUS.md](docs/PROJECT_STATUS.md) for details.

---

## 🤝 Team

Built for the Humanity Founders Hackathon.

---

*Last updated: Phase 0 — Foundation*
