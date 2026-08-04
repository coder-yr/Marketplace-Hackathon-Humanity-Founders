import mongoose, { Document, Schema } from 'mongoose'

export interface IOrder extends Document {
  quoteId: mongoose.Types.ObjectId
  buyerId: mongoose.Types.ObjectId
  supplierId: mongoose.Types.ObjectId
  productId: mongoose.Types.ObjectId
  finalPrice: number
  quantity: number
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Completed'
  shippingDetails?: {
    address: string
    trackingNumber?: string
    carrier?: string
    container?: string
    port?: string
    method?: string
    expectedArrival?: Date
  }
  timeline?: Array<{
    stage: 'Order Confirmed' | 'Raw Material' | 'Manufacturing' | 'Quality Check' | 'Packaging' | 'Shipping' | 'Delivered'
    status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed'
    progress: number
    eta?: Date
    notes?: string
    updatedAt: Date
  }>
  documents?: Array<{
    type: string
    name: string
    url: string
    uploadedAt: Date
  }>
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    quoteId: {
      type: Schema.Types.ObjectId,
      ref: 'Quote',
      required: true,
    },
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
    finalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Completed'],
      default: 'Pending',
    },
    shippingDetails: {
      address: String,
      trackingNumber: String,
      carrier: String,
      container: String,
      port: String,
      method: String,
      expectedArrival: Date,
    },
    timeline: [
      {
        stage: { type: String, enum: ['Order Confirmed', 'Raw Material', 'Manufacturing', 'Quality Check', 'Packaging', 'Shipping', 'Delivered'] },
        status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Delayed'], default: 'Pending' },
        progress: { type: Number, default: 0 },
        eta: Date,
        notes: String,
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    documents: [
      {
        type: { type: String },
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
)

orderSchema.index({ buyerId: 1, status: 1 })
orderSchema.index({ supplierId: 1, status: 1 })

export const Order = mongoose.model<IOrder>('Order', orderSchema)
