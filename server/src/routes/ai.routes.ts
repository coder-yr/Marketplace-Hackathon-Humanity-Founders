import { Router } from 'express'
import { aiController } from '../controllers/ai.controller'
import rateLimit from 'express-rate-limit'

const router = Router()

// Rate limiter: 10 requests per minute per IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: 'Too many AI requests from this IP, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
})

router.use(aiLimiter)

router.get('/health', aiController.getHealth)
router.post('/product-intelligence', aiController.getProductIntelligence)
router.post('/rfq-analysis', aiController.getRfqAnalysis)
router.post('/material-review', aiController.getMaterialReview)
router.post('/copilot', aiController.getCopilotIntent)

export default router
