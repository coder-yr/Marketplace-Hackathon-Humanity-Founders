import { Request, Response, NextFunction } from 'express'
import { profileService } from '../services/profile.service'
import { buyerProfileSchema, supplierProfileSchema } from '../validators/profile.validator'
import { AppError } from '../middleware/errorHandler'

export class ProfileController {
  async saveBuyerDraft(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can save buyer profiles', 403)
      }
      const validatedData = buyerProfileSchema.parse(req).body
      const profile = await profileService.saveBuyerDraft(req.user._id.toString(), validatedData)
      
      res.status(200).json({
        success: true,
        data: profile,
      })
    } catch (error) {
      next(error)
    }
  }

  async saveSupplierDraft(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'supplier') {
        throw new AppError('Only suppliers can save supplier profiles', 403)
      }
      const validatedData = supplierProfileSchema.parse(req).body
      const profile = await profileService.saveSupplierDraft(req.user._id.toString(), validatedData)
      
      res.status(200).json({
        success: true,
        data: profile,
      })
    } catch (error) {
      next(error)
    }
  }

  async completeOnboarding(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401)
      }
      const user = await profileService.completeOnboarding(req.user._id.toString())
      
      res.status(200).json({
        success: true,
        data: { user: user.toJSON() },
      })
    } catch (error) {
      next(error)
    }
  }

  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401)
      }
      const profile = await profileService.getProfile(req.user._id.toString(), req.user.role)
      
      res.status(200).json({
        success: true,
        data: profile || {},
      })
    } catch (error) {
      next(error)
    }
  }
}

export const profileController = new ProfileController()
