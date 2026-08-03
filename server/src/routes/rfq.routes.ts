import { Router } from 'express'
import { rfqController } from '../controllers/rfq.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use(requireAuth)

router.post('/', rfqController.createRfq)
router.get('/buyer', rfqController.getBuyerRfqs)
router.get('/supplier', rfqController.getSupplierRfqs)
router.get('/:id', rfqController.getRfqById)

export const rfqRouter = router
