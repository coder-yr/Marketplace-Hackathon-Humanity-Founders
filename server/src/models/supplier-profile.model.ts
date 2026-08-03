import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISupplierProfile extends Document {
  userId: mongoose.Types.ObjectId
  companyName: string
  businessType?: string
  description?: string
  gstNumber?: string
  
  // Contact & Branding
  website?: string
  phone?: string
  email?: string
  socialLinks?: {
    linkedin?: string
    instagram?: string
    twitter?: string
  }
  logo?: string
  banner?: string
  
  // Operations
  factoryAddress?: string
  countriesServed?: string[]
  exportMarkets?: string[]
  businessHours?: string
  
  // AI/Matching Capabilities
  categories?: string[]
  productTypes?: string[]
  moq?: string
  productionCapacity?: string
  leadTime?: string
  certifications?: string[] // e.g., ISO9001
  
  profileCompletion: number
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

const supplierProfileSchema = new Schema<ISupplierProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One profile per user
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    businessType: String,
    description: String,
    gstNumber: String,

    website: String,
    phone: String,
    email: String,
    socialLinks: {
      linkedin: String,
      instagram: String,
      twitter: String,
    },
    logo: String,
    banner: String,

    factoryAddress: String,
    countriesServed: [String],
    exportMarkets: [String],
    businessHours: String,

    categories: [String],
    productTypes: [String],
    moq: String,
    productionCapacity: String,
    leadTime: String,
    certifications: [String],

    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const SupplierProfile: Model<ISupplierProfile> = mongoose.model<ISupplierProfile>(
  'SupplierProfile',
  supplierProfileSchema
)
