import { Request, Response, NextFunction } from 'express'
import { productService } from '../services/product.service'
import {
  productQuerySchema,
  createProductSchema,
  updateProductSchema,
} from '../validators/product.validator'
import { AppError } from '../middleware/errorHandler'

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = productQuerySchema.parse(req).query
      const result = await productService.getProducts(query)
      res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      })
    } catch (error) {
      next(error)
    }
  }

  async getFeaturedProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 6
      const products = await productService.getFeaturedProducts(limit)
      res.status(200).json({
        success: true,
        data: products,
      })
    } catch (error) {
      next(error)
    }
  }

  async getProductBySlugOrId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idOrSlug = req.params.idOrSlug as string
      const result = await productService.getProductBySlugOrId(idOrSlug)
      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'supplier') {
        throw new AppError('Only authenticated suppliers can create products', 403)
      }

      const body = createProductSchema.parse(req).body
      const product = await productService.createProduct(req.user._id.toString(), body)

      res.status(201).json({
        success: true,
        data: product,
      })
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'supplier') {
        throw new AppError('Only authenticated suppliers can update products', 403)
      }

      const { params, body } = updateProductSchema.parse(req)
      const productId = params.id as string
      const updated = await productService.updateProduct(req.user._id.toString(), productId, body)

      res.status(200).json({
        success: true,
        data: updated,
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'supplier') {
        throw new AppError('Only authenticated suppliers can delete products', 403)
      }

      const productId = req.params.id as string
      await productService.deleteProduct(req.user._id.toString(), productId)

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}

export const productController = new ProductController()
