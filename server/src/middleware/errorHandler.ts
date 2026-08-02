import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { logger } from '../config/logger'
import { env } from '../config/env'

interface MongoError extends Error {
  statusCode?: number
  code?: number | string
}

export function errorHandler(
  error: MongoError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Log the error
  logger.error(
    {
      error: {
        message: error.message,
        stack: env.NODE_ENV === 'development' ? error.stack : undefined,
        code: error.code,
      },
    },
    'Request error',
  )

  // Zod validation error
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: error.issues.map((issue: ZodIssue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      },
    })
    return
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_KEY',
        message: 'A record with this value already exists',
      },
    })
    return
  }

  // Default error
  const statusCode = error.statusCode ?? 500
  res.status(statusCode).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message:
        env.NODE_ENV === 'production' && statusCode === 500
          ? 'An unexpected error occurred'
          : error.message,
    },
  })
}

export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
  ) {
    super(message)
    this.name = 'AppError'
  }
}
