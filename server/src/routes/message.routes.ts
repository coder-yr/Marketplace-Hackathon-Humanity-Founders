import { Router } from 'express'
import { messageController } from '../controllers/message.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use(requireAuth)

router.post('/', messageController.sendMessage)
router.get('/context/:contextId', messageController.getContextMessages)
router.patch('/:id/read', messageController.markAsRead)

export const messageRouter = router
