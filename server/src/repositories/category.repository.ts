import { Category, ICategory } from '../models/category.model'

export class CategoryRepository {
  async findAll(): Promise<ICategory[]> {
    return Category.find({ isActive: true }).sort({ name: 1 }).lean()
  }

  async findBySlug(slug: string): Promise<ICategory | null> {
    return Category.findOne({ slug, isActive: true }).lean()
  }

  async create(data: Partial<ICategory>): Promise<ICategory> {
    const category = new Category(data)
    return category.save()
  }
}
