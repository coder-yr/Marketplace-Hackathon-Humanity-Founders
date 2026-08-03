import { Router } from 'express'
import { quoteController } from '../controllers/quote.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use(requireAuth)

router.post('/', quoteController.createQuote)
router.get('/buyer', quoteController.getBuyerQuotes)
router.get('/supplier', quoteController.getSupplierQuotes)
router.get('/:id', quoteController.getQuoteById)
router.patch('/:id/status', quoteController.updateQuoteStatus)

export const quoteRouter = router
