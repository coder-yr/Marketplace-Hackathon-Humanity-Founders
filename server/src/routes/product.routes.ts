import { Router } from 'express'
import { productController } from '../controllers/product.controller'
import { requireAuth } from '../middleware/requireAuth'
import { requireRole } from '../middleware/requireRole'

export const productRouter = Router()

// Public product endpoints
productRouter.get('/', productController.getProducts)
productRouter.get('/featured', productController.getFeaturedProducts)
productRouter.get('/:idOrSlug', productController.getProductBySlugOrId)

// Protected supplier endpoints
productRouter.post('/', requireAuth, requireRole(['supplier']), productController.createProduct)
productRouter.put('/:id', requireAuth, requireRole(['supplier']), productController.updateProduct)
productRouter.delete('/:id', requireAuth, requireRole(['supplier']), productController.deleteProduct)
