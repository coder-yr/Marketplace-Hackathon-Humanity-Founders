import { Router } from 'express'
import { notificationController } from '../controllers/notification.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use(requireAuth)

router.get('/', notificationController.getMyNotifications)
router.put('/mark-all-read', notificationController.markAllAsRead)
router.put('/:id/read', notificationController.markAsRead)

export const notificationRouter = router
