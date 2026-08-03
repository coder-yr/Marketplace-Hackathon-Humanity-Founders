import { Router } from 'express'
import { profileController } from '../controllers/profile.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

// All profile routes require authentication
router.use(requireAuth)

router.get('/me', profileController.getMyProfile)
router.put('/buyer/draft', profileController.saveBuyerDraft)
router.put('/supplier/draft', profileController.saveSupplierDraft)
router.post('/complete', profileController.completeOnboarding)

export default router
