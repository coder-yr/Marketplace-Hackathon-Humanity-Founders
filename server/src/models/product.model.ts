import { Schema, model, Document, Types } from 'mongoose'

export interface IPriceRange {
  min: number
  max: number
  currency: string
  unit: string
}

export interface IMoq {
  value: number
  unit: string
}

export interface IProduct extends Document {
  supplierId: Types.ObjectId
  title: string
  slug: string
  shortDescription: string
  description: string
  category: Types.ObjectId
  subCategory?: string
  fabricType: string
  images: string[]
  priceRange: IPriceRange
  moq: IMoq
  leadTime: string
  stockStatus: 'in_stock' | 'made_to_order' | 'out_of_stock'
  certifications: string[]
  tags: string[]
  specifications: Record<string, string>
  featured: boolean
  published: boolean
  status: 'active' | 'draft' | 'archived'
  isDeleted: boolean
  aiSummary?: string
  aiSummaryGeneratedAt?: Date
  aiSummaryProvider?: string
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Supplier ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    fabricType: {
      type: String,
      required: [true, 'Fabric type is required'],
      trim: true,
      index: true,
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required'],
      default: [],
    },
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      unit: { type: String, default: 'meter' },
    },
    moq: {
      value: { type: Number, required: true },
      unit: { type: String, default: 'meters' },
    },
    leadTime: {
      type: String,
      required: [true, 'Lead time is required'],
      trim: true,
    },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'made_to_order', 'out_of_stock'],
      default: 'made_to_order',
    },
    certifications: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    aiSummary: {
      type: String,
    },
    aiSummaryGeneratedAt: {
      type: Date,
    },
    aiSummaryProvider: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Text Index for search
productSchema.index(
  {
    title: 'text',
    description: 'text',
    shortDescription: 'text',
    tags: 'text',
    fabricType: 'text',
  },
  {
    weights: {
      title: 10,
      tags: 5,
      fabricType: 5,
      shortDescription: 3,
      description: 1,
    },
    name: 'product_text_search',
  },
)

// Compound Index for browsing & filtering
productSchema.index({ isDeleted: 1, published: 1, status: 1, category: 1 })
productSchema.index({ isDeleted: 1, published: 1, status: 1, fabricType: 1 })
productSchema.index({ isDeleted: 1, published: 1, status: 1, featured: 1 })

export const Product = model<IProduct>('Product', productSchema)
