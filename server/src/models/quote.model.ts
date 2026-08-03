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
