import mongoose from 'mongoose'
import { env } from './env'
import { logger } from './logger'

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })

    logger.info({ uri: env.MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@') }, '✅ MongoDB connected')

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected')
    })

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected')
    })

    mongoose.connection.on('error', (error: Error) => {
      logger.error({ error }, 'MongoDB error')
    })
  } catch (error) {
    logger.error({ error }, '❌ MongoDB connection failed')
    throw error
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect()
  logger.info('MongoDB disconnected gracefully')
}
