import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId
  receiverId: mongoose.Types.ObjectId
  contextType: 'RFQ' | 'Order'
  contextId: mongoose.Types.ObjectId
  content: string
  attachments?: string[]
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contextType: {
      type: String,
      enum: ['RFQ', 'Order'],
      required: true,
    },
    contextId: {
      type: Schema.Types.ObjectId,
      required: true,
      // Ref can be either Rfq or Order depending on contextType
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [{
      type: String,
    }],
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

messageSchema.index({ contextId: 1, createdAt: 1 })
messageSchema.index({ receiverId: 1, read: 1 })

export const Message = mongoose.model<IMessage>('Message', messageSchema)
