import { Router } from 'express'
import { aiController } from '../controllers/ai.controller'
import rateLimit from 'express-rate-limit'

const router = Router()

// Rate limiter: 100 requests per minute per IP for testing
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100,
  message: 'Too many AI requests from this IP, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
})

router.use(aiLimiter)

router.get('/health', aiController.getHealth)
router.post('/product-intelligence', aiController.getProductIntelligence)
router.post('/rfq-analysis', aiController.getRfqAnalysis)
router.post('/material-review', aiController.getMaterialReview)
// router.post('/copilot', aiController.getCopilotIntent) // Shadowed by Enterprise AI Copilot

export default router
