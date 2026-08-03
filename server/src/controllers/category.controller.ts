import { Request, Response, NextFunction } from 'express'
import { categoryService } from '../services/category.service'
import { categoryQuerySchema } from '../validators/category.validator'

export async function getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = categoryQuerySchema.parse(req).query
    const categories = await categoryService.getAllCategories(query)
    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    next(error)
  }
}

export async function getCategoryBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string
    const category = await categoryService.getCategoryBySlug(slug)
    res.status(200).json({
      success: true,
      data: category,
    })
  } catch (error) {
    next(error)
  }
}
