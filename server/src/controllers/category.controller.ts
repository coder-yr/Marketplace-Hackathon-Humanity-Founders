import { Request, Response, NextFunction } from 'express'
import { CategoryService } from '../services/category.service'

const categoryService = new CategoryService()

export async function getAllCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const categories = await categoryService.findAll()
    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    next(error)
  }
}
