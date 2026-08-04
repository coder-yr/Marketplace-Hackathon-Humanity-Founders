import { Router } from 'express'
import { cartController } from '../controllers/cart.controller'
import { requireAuth } from '../middleware/requireAuth'
import { requireRole } from '../middleware/requireRole'

const router = Router()

// All cart routes require buyer authentication
router.use(requireAuth)
router.use(requireRole(['buyer']))

router
  .route('/')
  .get(cartController.getCart)
  .post(cartController.addToCart)
  .delete(cartController.clearCart)

router.post('/checkout', cartController.checkoutCart)

router
  .route('/:itemId')
  .put(cartController.updateCartItem)
  .delete(cartController.removeFromCart)

export const cartRouter = router
