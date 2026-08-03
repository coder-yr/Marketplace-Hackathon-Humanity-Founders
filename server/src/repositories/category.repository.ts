import { Category, ICategory } from '../models/category.model'

export class CategoryRepository {
  async findAll(query: { featured?: boolean; limit?: number } = {}): Promise<ICategory[]> {
    const filter: any = { isActive: true }
    if (query.featured !== undefined) {
      filter.featured = query.featured
    }

    let mongooseQuery = Category.find(filter).sort({ sortOrder: 1, name: 1 })
    if (query.limit) {
      mongooseQuery = mongooseQuery.limit(query.limit)
    }

    return await mongooseQuery.exec()
  }

  async findBySlug(slug: string): Promise<ICategory | null> {
    return await Category.findOne({ slug: slug.toLowerCase(), isActive: true }).exec()
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id).exec()
  }

  async create(data: Partial<ICategory>): Promise<ICategory> {
    const category = new Category(data)
    return await category.save()
  }
}

export const categoryRepository = new CategoryRepository()
