import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import pinoHttp from 'pino-http'
import { logger } from './config/logger'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { notFoundHandler } from './middleware/notFoundHandler'
import { authRouter } from './routes/auth.routes'
import profileRoutes from './routes/profile.routes'
import { healthRouter } from './routes/health.routes'
import { categoryRouter } from './routes/category.routes'
import { productRouter } from './routes/product.routes'
import aiRoutes from './routes/ai.routes'
import enterpriseAiRoutes from './ai/routes/ai.routes'
import { notificationRouter } from './routes/notification.routes'
import { rfqRouter } from './routes/rfq.routes'
import { quoteRouter } from './routes/quote.routes'
import { orderRouter } from './routes/order.routes'
import { messageRouter } from './routes/message.routes'
import { cartRouter } from './routes/cart.routes'
import { workspaceRouter } from './routes/workspace.routes'

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
app.use(cookieParser())

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
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/profiles', profileRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/ai', enterpriseAiRoutes)
app.use('/api/notifications', notificationRouter)
app.use('/api/rfqs', rfqRouter)
app.use('/api/quotes', quoteRouter)
app.use('/api/orders', orderRouter)
app.use('/api/messages', messageRouter)
app.use('/api/cart', cartRouter)
app.use('/api/workspace', workspaceRouter)

// ── Error Handling ────────────────────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app
