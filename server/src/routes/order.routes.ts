import { Router } from 'express'
import { orderController } from '../controllers/order.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use(requireAuth)

router.post('/', orderController.createOrder)
router.get('/buyer', orderController.getBuyerOrders)
router.get('/supplier', orderController.getSupplierOrders)
router.get('/:id', orderController.getOrderById)
router.patch('/:id/status', orderController.updateOrderStatus)

export const orderRouter = router
