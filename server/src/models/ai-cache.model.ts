import { Schema, model, Document } from 'mongoose'

export interface IAiCache extends Document {
  promptHash: string
  response: string
  aiModel: string
  endpoint: string
  createdAt: Date
}

const aiCacheSchema = new Schema<IAiCache>(
  {
    promptHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    response: {
      type: String,
      required: true,
    },
    aiModel: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // TTL: 24 hours in seconds
    },
  },
  {
    versionKey: false,
  },
)

export const AiCache = model<IAiCache>('AiCache', aiCacheSchema)
