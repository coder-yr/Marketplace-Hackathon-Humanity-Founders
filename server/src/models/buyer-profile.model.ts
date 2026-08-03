import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IBuyerProfile extends Document {
  userId: mongoose.Types.ObjectId
  companyName: string
  businessType?: string
  industry?: string
  companySize?: string
  
  // Contact
  country?: string
  state?: string
  city?: string
  website?: string
  phone?: string
  
  // AI/Matching Preferences
  monthlyRequirement?: string
  preferredCategories?: string[]
  preferredFabrics?: string[]
  moqPreference?: string
  budgetRange?: string
  preferredSupplierType?: string
  domesticOrInternational?: string
  buyingFrequency?: string
  preferredPaymentTerms?: string
  
  profileCompletion: number
  createdAt: Date
  updatedAt: Date
}

const buyerProfileSchema = new Schema<IBuyerProfile>(
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
    industry: String,
    companySize: String,

    country: String,
    state: String,
    city: String,
    website: String,
    phone: String,

    monthlyRequirement: String,
    preferredCategories: [String],
    preferredFabrics: [String],
    moqPreference: String,
    budgetRange: String,
    preferredSupplierType: String,
    domesticOrInternational: String,
    buyingFrequency: String,
    preferredPaymentTerms: String,

    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
)

export const BuyerProfile: Model<IBuyerProfile> = mongoose.model<IBuyerProfile>(
  'BuyerProfile',
  buyerProfileSchema
)
