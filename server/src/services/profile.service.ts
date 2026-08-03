import { BuyerProfile } from '../models/buyer-profile.model'
import { SupplierProfile } from '../models/supplier-profile.model'
import { User } from '../models/user.model'
import { AppError } from '../middleware/errorHandler'
import { BuyerProfileInput, SupplierProfileInput } from '../validators/profile.validator'

export class ProfileService {
  private calculateCompletion(data: any): number {
    // Simple logic: count defined fields vs total possible fields (excluding _id, userId, etc)
    const keys = Object.keys(data)
    if (keys.length === 0) return 0
    let filled = 0
    for (const key of keys) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        if (Array.isArray(data[key]) && data[key].length === 0) {
          continue
        }
        filled++
      }
    }
    // Cap at 100 for now, could be more sophisticated per role
    return Math.min(100, Math.round((filled / 15) * 100))
  }

  async saveBuyerDraft(userId: string, data: BuyerProfileInput) {
    const profileCompletion = this.calculateCompletion(data)
    const profile = await BuyerProfile.findOneAndUpdate(
      { userId },
      { ...data, profileCompletion },
      { new: true, upsert: true }
    )
    return profile
  }

  async saveSupplierDraft(userId: string, data: SupplierProfileInput) {
    const profileCompletion = this.calculateCompletion(data)
    const profile = await SupplierProfile.findOneAndUpdate(
      { userId },
      { ...data, profileCompletion },
      { new: true, upsert: true }
    )
    return profile
  }

  async completeOnboarding(userId: string) {
    const user = await User.findById(userId)
    if (!user) throw new AppError('User not found', 404)
    
    // In a real app we'd verify the profile actually has the minimum required fields
    user.isOnboarded = true
    await user.save()
    
    return user
  }

  async getProfile(userId: string, role: string) {
    if (role === 'buyer') {
      return await BuyerProfile.findOne({ userId })
    } else {
      return await SupplierProfile.findOne({ userId })
    }
  }
}

export const profileService = new ProfileService()
