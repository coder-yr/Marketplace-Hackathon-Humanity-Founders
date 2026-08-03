import { Request, Response, NextFunction } from 'express'
import { AppError } from './errorHandler'
import { UserRole } from '../models/user.model'

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized: User not authenticated', 401))
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Forbidden: Requires one of these roles: ${allowedRoles.join(', ')}`,
          403,
        ),
      )
    }

    next()
  }
}
