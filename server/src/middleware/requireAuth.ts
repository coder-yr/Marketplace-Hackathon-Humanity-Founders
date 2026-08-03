import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt.util'
import { userRepository } from '../repositories/user.repository'
import { AppError } from './errorHandler'

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken
    
    if (!token) {
      throw new AppError('Unauthorized: No token provided', 401)
    }

    // Verify token
    const decoded = verifyAccessToken(token)

    // Check if user still exists
    const user = await userRepository.findById(decoded.id)
    if (!user) {
      throw new AppError('Unauthorized: User no longer exists', 401)
    }

    if (!user.isActive) {
      throw new AppError('Forbidden: Account is disabled', 403)
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error) {
    if (error instanceof AppError) {
      return next(error)
    }
    // Handle JWT specific errors (expired, invalid signature)
    return next(new AppError('Unauthorized: Invalid or expired token', 401))
  }
}
