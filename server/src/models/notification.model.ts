import mongoose, { Document, Schema } from 'mongoose'

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  type: 'New RFQ' | 'Quote Received' | 'Order Updated' | 'AI Recommendation' | 'Product Published' | 'Shipment Delayed' | 'Price Changed' | 'Certificate Uploaded' | 'Production Updated' | 'RFQ Accepted'
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['New RFQ', 'Quote Received', 'Order Updated', 'AI Recommendation', 'Product Published', 'Shipment Delayed', 'Price Changed', 'Certificate Uploaded', 'Production Updated', 'RFQ Accepted'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 })

export const Notification = mongoose.model<INotification>('Notification', notificationSchema)
