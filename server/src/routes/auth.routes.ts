import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { requireAuth } from '../middleware/requireAuth'
import { authLimiter } from '../middleware/rateLimiter'

export const authRouter = Router()

// Apply rate limiter to login/register routes
authRouter.post('/register', authLimiter, authController.register)
authRouter.post('/login', authLimiter, authController.login)
authRouter.post('/refresh', authController.refresh)
authRouter.post('/logout', requireAuth, authController.logout)

// Protected profile route
authRouter.get('/me', requireAuth, authController.getMe)
