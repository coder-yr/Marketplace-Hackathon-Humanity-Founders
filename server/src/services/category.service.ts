import { categoryRepository } from '../repositories/category.repository'
import { AppError } from '../middleware/errorHandler'
import { CategoryQueryInput } from '../validators/category.validator'

export class CategoryService {
  async getAllCategories(query: Partial<CategoryQueryInput> = {}) {
    return await categoryRepository.findAll(query)
  }

  async getCategoryBySlug(slug: string) {
    const category = await categoryRepository.findBySlug(slug)
    if (!category) {
      throw new AppError('Category not found', 404)
    }
    return category
  }
}

export const categoryService = new CategoryService()
