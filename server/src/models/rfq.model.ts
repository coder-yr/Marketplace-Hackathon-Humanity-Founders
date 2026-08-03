import mongoose, { Document, Schema } from 'mongoose'

export interface IRfq extends Document {
  buyerId: mongoose.Types.ObjectId
  supplierId: mongoose.Types.ObjectId
  productId: mongoose.Types.ObjectId
  quantity: number
  targetPrice?: number
  deliveryAddress?: string
  timeline?: string
  notes?: string
  status: 'Draft' | 'Submitted' | 'Viewed' | 'Responded' | 'Accepted' | 'Rejected' | 'Expired'
  createdAt: Date
  updatedAt: Date
}

const rfqSchema = new Schema<IRfq>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    targetPrice: {
      type: Number,
    },
    deliveryAddress: {
      type: String,
    },
    timeline: {
      type: String,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Viewed', 'Responded', 'Accepted', 'Rejected', 'Expired'],
      default: 'Submitted',
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
rfqSchema.index({ buyerId: 1, status: 1 })
rfqSchema.index({ supplierId: 1, status: 1 })

export const Rfq = mongoose.model<IRfq>('Rfq', rfqSchema)
