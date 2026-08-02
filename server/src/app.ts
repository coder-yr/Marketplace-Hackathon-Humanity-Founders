import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import pinoHttp from 'pino-http'
import { logger } from './config/logger'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { notFoundHandler } from './middleware/notFoundHandler'
import { healthRouter } from './routes/health.routes'
import { categoryRouter } from './routes/category.routes'

const app = express()

// ── Security Middleware ──────────────────────────────────────────
app.use(helmet())
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// ── Request Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ── HTTP Logging ─────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    customLogLevel: (_req, res) => {
      if (res.statusCode >= 500) return 'error'
      if (res.statusCode >= 400) return 'warn'
      return 'info'
    },
  }),
)

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)
app.use('/api/categories', categoryRouter)

// ── Error Handling ────────────────────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app
