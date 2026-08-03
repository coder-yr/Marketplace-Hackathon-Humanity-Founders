import { Product, IProduct } from '../models/product.model'
import { Category } from '../models/category.model'
import { ProductQueryInput } from '../validators/product.validator'

export interface PaginatedProducts {
  products: IProduct[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export class ProductRepository {
  async findWithFilters(params: ProductQueryInput): Promise<PaginatedProducts> {
    const {
      search,
      category,
      fabricType,
      maxMoq,
      minPrice,
      maxPrice,
      stockStatus,
      featured,
      sort = 'newest',
      page = 1,
      limit = 12,
    } = params

    const filter: any = {
      isDeleted: false,
      published: true,
      status: 'active',
    }

    // Keyword Search
    if (search && search.trim()) {
      filter.$text = { $search: search.trim() }
    }

    // Category Filter (by ObjectId or Slug)
    if (category) {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        filter.category = category
      } else {
        const catDoc = await Category.findOne({ slug: category.toLowerCase(), isActive: true })
        if (catDoc) {
          filter.category = catDoc._id
        }
      }
    }

    // Fabric Type Filter
    if (fabricType) {
      filter.fabricType = { $regex: new RegExp(`^${fabricType}$`, 'i') }
    }

    // Max MOQ Filter
    if (maxMoq !== undefined && !isNaN(maxMoq)) {
      filter['moq.value'] = { $lte: maxMoq }
    }

    // Price Range Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter['priceRange.min'] = {}
      if (minPrice !== undefined) filter['priceRange.min'].$gte = minPrice
      if (maxPrice !== undefined) filter['priceRange.min'].$lte = maxPrice
    }

    // Stock Status
    if (stockStatus) {
      filter.stockStatus = stockStatus
    }

    // Featured
    if (featured !== undefined) {
      filter.featured = featured
    }

    // Sorting
    let sortOption: any = { createdAt: -1 }
    switch (sort) {
      case 'price_asc':
        sortOption = { 'priceRange.min': 1 }
        break
      case 'price_desc':
        sortOption = { 'priceRange.min': -1 }
        break
      case 'moq_asc':
        sortOption = { 'moq.value': 1 }
        break
      case 'title_asc':
        sortOption = { title: 1 }
        break
      case 'newest':
      default:
        sortOption = { createdAt: -1 }
        break
    }

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug icon imageUrl')
        .populate('supplierId', 'fullName email role')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .exec(),
      Product.countDocuments(filter),
    ])

    const pages = Math.ceil(total / limit) || 1

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    }
  }

  async findByIdOrSlug(idOrSlug: string): Promise<IProduct | null> {
    const isObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
    const query = isObjectId
      ? { _id: idOrSlug, isDeleted: false }
      : { slug: idOrSlug.toLowerCase(), isDeleted: false }

    return await Product.findOne(query)
      .populate('category', 'name slug icon imageUrl description')
      .populate('supplierId', 'fullName email role createdAt')
      .exec()
  }

  async findFeatured(limit = 6): Promise<IProduct[]> {
    return await Product.find({ isDeleted: false, published: true, status: 'active', featured: true })
      .populate('category', 'name slug')
      .populate('supplierId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec()
  }

  async findRelated(categoryId: string, currentProductId: string, limit = 4): Promise<IProduct[]> {
    return await Product.find({
      category: categoryId,
      _id: { $ne: currentProductId },
      isDeleted: false,
      published: true,
      status: 'active',
    })
      .populate('category', 'name slug')
      .limit(limit)
      .exec()
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(data)
    return await product.save()
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true, runValidators: true }
    ).exec()
  }

  async softDelete(id: string): Promise<boolean> {
    const res = await Product.updateOne({ _id: id }, { $set: { isDeleted: true } })
    return res.modifiedCount > 0
  }
}

export const productRepository = new ProductRepository()
