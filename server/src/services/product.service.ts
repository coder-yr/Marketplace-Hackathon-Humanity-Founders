import { productRepository } from '../repositories/product.repository'
import { SupplierProfile } from '../models/supplier-profile.model'
import { AppError } from '../middleware/errorHandler'
import { CreateProductInput, UpdateProductInput, ProductQueryInput } from '../validators/product.validator'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export class ProductService {
  async getProducts(params: ProductQueryInput) {
    return await productRepository.findWithFilters(params)
  }

  async getProductBySlugOrId(idOrSlug: string) {
    const product = await productRepository.findByIdOrSlug(idOrSlug)
    if (!product) {
      throw new AppError('Product not found', 404)
    }

    // Attach supplier profile if available
    let supplierProfile = null
    if (product.supplierId && (product.supplierId as any)._id) {
      supplierProfile = await SupplierProfile.findOne({ userId: (product.supplierId as any)._id }).exec()
    }

    // Fetch related products in the same category
    const relatedProducts = await productRepository.findRelated(
      product.category._id ? product.category._id.toString() : product.category.toString(),
      product._id.toString(),
      4
    )

    return {
      product,
      supplierProfile,
      relatedProducts,
    }
  }

  async getFeaturedProducts(limit = 6) {
    return await productRepository.findFeatured(limit)
  }

  async createProduct(supplierId: string, data: CreateProductInput) {
    let baseSlug = slugify(data.title)
    let slug = baseSlug
    let counter = 1
    while (await productRepository.findByIdOrSlug(slug)) {
      slug = `${baseSlug}-${counter++}`
    }

    const newProduct = await productRepository.create({
      ...data,
      supplierId: supplierId as any,
      category: data.category as any,
      slug,
      specifications: data.specifications || {},
    })

    return newProduct
  }

  async updateProduct(supplierId: string, productId: string, data: UpdateProductInput) {
    const existing = await productRepository.findByIdOrSlug(productId)
    if (!existing) {
      throw new AppError('Product not found', 404)
    }

    const existingSupplierId = (existing.supplierId as any)._id
      ? (existing.supplierId as any)._id.toString()
      : existing.supplierId.toString()

    if (existingSupplierId !== supplierId) {
      throw new AppError('Unauthorized: You can only update your own products', 403)
    }

    const updatePayload: any = { ...data }
    if (data.category) {
      updatePayload.category = data.category as any
    }

    const updated = await productRepository.update(productId, updatePayload)
    return updated
  }

  async deleteProduct(supplierId: string, productId: string) {
    const existing = await productRepository.findByIdOrSlug(productId)
    if (!existing) {
      throw new AppError('Product not found', 404)
    }

    const existingSupplierId = (existing.supplierId as any)._id
      ? (existing.supplierId as any)._id.toString()
      : existing.supplierId.toString()

    if (existingSupplierId !== supplierId) {
      throw new AppError('Unauthorized: You can only delete your own products', 403)
    }

    return await productRepository.softDelete(productId)
  }

  async duplicateProduct(supplierId: string, productId: string) {
    const existing = await productRepository.findByIdOrSlug(productId)
    if (!existing) {
      throw new AppError('Product not found', 404)
    }

    const existingSupplierId = (existing.supplierId as any)._id
      ? (existing.supplierId as any)._id.toString()
      : existing.supplierId.toString()

    if (existingSupplierId !== supplierId) {
      throw new AppError('Unauthorized: You can only duplicate your own products', 403)
    }

    const duplicateData = existing.toObject()
    delete duplicateData._id
    delete duplicateData.slug
    delete duplicateData.createdAt
    delete duplicateData.updatedAt

    duplicateData.title = `${duplicateData.title} (Copy)`
    duplicateData.status = 'draft'
    duplicateData.published = false

    return await this.createProduct(supplierId, duplicateData as any)
  }
}

export const productService = new ProductService()
