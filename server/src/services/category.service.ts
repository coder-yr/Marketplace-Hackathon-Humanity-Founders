import { CategoryRepository } from '../repositories/category.repository'
import { ICategory } from '../models/category.model'

export class CategoryService {
  private readonly repository: CategoryRepository

  constructor() {
    this.repository = new CategoryRepository()
  }

  async findAll(): Promise<ICategory[]> {
    return this.repository.findAll()
  }
}
