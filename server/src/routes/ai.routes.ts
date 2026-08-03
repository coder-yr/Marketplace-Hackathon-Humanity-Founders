import { Router } from 'express'
import * as aiController from '../controllers/ai.controller'

const router = Router()

// Publicly available AI endpoints (though rate-limiting should be applied in prod)
router.post('/search-intent', aiController.parseSearchIntent)
router.post('/compare', aiController.compareProducts)
router.get('/summary/:productId', aiController.getProductSummary)
router.post('/chat', aiController.chat)
router.post('/generate-reply', aiController.generateReply)
router.post('/summarize-conversation', aiController.summarizeConversation)
router.post('/suggest-quote', aiController.suggestQuote)

// Semi-protected (Optional Auth, but buyer context helps)
router.post('/recommendations', aiController.recommendProducts)
router.post('/quote-draft', aiController.generateQuoteDraft)

export default router
