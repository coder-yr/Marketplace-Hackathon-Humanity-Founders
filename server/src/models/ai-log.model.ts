import { Schema, model, Document } from 'mongoose'

export interface IAiLog extends Document {
  user?: string
  endpoint: string
  modelUsed: string
  tokens: number
  latency: number // in milliseconds
  cached: boolean
  cost: number // estimated cost in USD
  createdAt: Date
}

const aiLogSchema = new Schema<IAiLog>(
  {
    user: { type: String },
    endpoint: { type: String, required: true },
    modelUsed: { type: String, required: true },
    tokens: { type: Number, default: 0 },
    latency: { type: Number, required: true },
    cached: { type: Boolean, required: true },
    cost: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
)

export const AiLog = model<IAiLog>('AiLog', aiLogSchema)
