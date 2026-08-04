export interface PriceRange {
  min: number
  max: number
  currency: string
  unit: string
}

export interface Moq {
  value: number
  unit: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  imageUrl?: string
  icon?: string
  featured?: boolean
  sortOrder?: number
}

export interface SupplierSummary {
  _id: string
  fullName: string
  email: string
  role: string
  createdAt?: string
}

export interface SupplierProfileSummary {
  companyName: string
  gstNumber?: string
  factoryAddress?: string
  certifications?: string[]
  verified: boolean
  logo?: string
  banner?: string
  website?: string
  phone?: string
  email?: string
  yearsInBusiness?: number
  aiTrustScore?: number
  totalOrders?: number
  responseRate?: number
  rfqWinRate?: number
  revenue?: number
}

export interface Product {
  _id: string
  supplierId: SupplierSummary
  title: string
  slug: string
  shortDescription: string
  description: string
  category: Category
  subCategory?: string
  fabricType: string
  images: string[]
  priceRange: PriceRange
  moq: Moq
  leadTime: string
  stockStatus: 'in_stock' | 'made_to_order' | 'out_of_stock'
  certifications: string[]
  tags: string[]
  specifications: Record<string, string>
  featured: boolean
  published: boolean
  status: 'active' | 'draft' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface ProductDetailResponse {
  product: Product
  supplierProfile?: SupplierProfileSummary | null
  relatedProducts: Product[]
}

export interface ProductFilterParams {
  search?: string
  category?: string
  fabricType?: string
  maxMoq?: number
  minPrice?: number
  maxPrice?: number
  stockStatus?: string
  featured?: boolean
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'moq_asc' | 'title_asc'
  page?: number
  limit?: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface PaginatedProductsResponse {
  success: boolean
  data: Product[]
  pagination: Pagination
}
