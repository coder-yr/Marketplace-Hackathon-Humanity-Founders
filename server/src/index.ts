import 'dotenv/config'
import app from './app'
import { connectDatabase } from './config/database'
import { logger } from './config/logger'
import { env } from './config/env'

const PORT = env.PORT

async function start() {
  try {
    await connectDatabase()

    app.listen(PORT, () => {
      logger.info({ port: PORT, env: env.NODE_ENV }, '🚀 Server started')
    })
  } catch (error) {
    logger.error({ error }, 'Failed to start server')
    process.exit(1)
  }
}

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled rejection')
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  logger.error({ error }, 'Uncaught exception')
  process.exit(1)
})

void start()
