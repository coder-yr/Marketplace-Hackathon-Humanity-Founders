import { Router } from 'express'
import { workspaceController } from '../controllers/workspace.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use(requireAuth)
router.get('/', workspaceController.getWorkspace)

export const workspaceRouter = router
