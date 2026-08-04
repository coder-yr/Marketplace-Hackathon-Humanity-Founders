import mongoose, { Document, Schema } from 'mongoose'

export interface IQuote extends Document {
  rfqId: mongoose.Types.ObjectId
  supplierId: mongoose.Types.ObjectId
  buyerId: mongoose.Types.ObjectId
  offeredPrice: number
  leadTime: string
  validUntil: Date
  notes?: string
  status: 'Pending' | 'Accepted' | 'Rejected'
  
  // AI Advisor Fields
  aiRiskAnalysis?: {
    level: 'Low' | 'Medium' | 'High'
    reasons: string[]
  }
  aiCostInsights?: {
    marketAverage: number
    suggestedTarget: number
  }
  aiNegotiationSuggestions?: {
    suggestedCounterOffer: number
    reasons: string[]
  }
  aiAlternativeSuppliers?: Array<{
    name: string
    matchScore: number
  }>
  
  createdAt: Date
  updatedAt: Date
}

const quoteSchema = new Schema<IQuote>(
  {
    rfqId: {
      type: Schema.Types.ObjectId,
      ref: 'Rfq',
      required: true,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    offeredPrice: {
      type: Number,
      required: true,
    },
    leadTime: {
      type: String,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    
    // AI Advisor Fields
    aiRiskAnalysis: {
      level: { type: String, enum: ['Low', 'Medium', 'High'] },
      reasons: [String],
    },
    aiCostInsights: {
      marketAverage: Number,
      suggestedTarget: Number,
    },
    aiNegotiationSuggestions: {
      suggestedCounterOffer: Number,
      reasons: [String],
    },
    aiAlternativeSuppliers: [
      {
        name: String,
        matchScore: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
quoteSchema.index({ rfqId: 1 })
quoteSchema.index({ buyerId: 1, status: 1 })
quoteSchema.index({ supplierId: 1, status: 1 })

export const Quote = mongoose.model<IQuote>('Quote', quoteSchema)
