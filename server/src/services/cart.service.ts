import { BuyerProfile, ICartItem } from '../models/buyer-profile.model'

import { AppError } from '../middleware/errorHandler'

export class CartService {
  async getCart(userId: string) {
    const profile = await BuyerProfile.findOne({ userId }).populate({
      path: 'cart.productId',
      select: 'title images priceRange moq leadTime'
    })
    
    if (!profile) {
      // If no profile, they don't have a cart yet. 
      return []
    }
    
    return profile.cart || []
  }

  async addToCart(userId: string, item: Omit<ICartItem, 'price'> & { price?: number }) {
    let profile = await BuyerProfile.findOne({ userId })
    if (!profile) {
      throw new AppError('Buyer profile not found', 404)
    }

    if (!profile.cart) {
      profile.cart = []
    }

    // Check if product with same color already exists in cart
    const existingItemIndex = profile.cart.findIndex(
      (c) => c.productId.toString() === item.productId.toString() && c.color === item.color
    )

    if (existingItemIndex > -1) {
      profile.cart[existingItemIndex].quantity += item.quantity
    } else {
      profile.cart.push(item as any)
    }

    await profile.save()
    
    // Return populated cart
    return this.getCart(userId)
  }

  async updateCartItem(userId: string, itemId: string, quantity: number) {
    const profile = await BuyerProfile.findOne({ userId })
    if (!profile || !profile.cart) {
      throw new AppError('Cart not found', 404)
    }

    const itemIndex = profile.cart.findIndex((c) => (c as any)._id.toString() === itemId)
    if (itemIndex === -1) {
      throw new AppError('Item not found in cart', 404)
    }

    if (quantity <= 0) {
      profile.cart.splice(itemIndex, 1)
    } else {
      profile.cart[itemIndex].quantity = quantity
    }

    await profile.save()
    return this.getCart(userId)
  }

  async removeFromCart(userId: string, itemId: string) {
    const profile = await BuyerProfile.findOne({ userId })
    if (!profile || !profile.cart) {
      throw new AppError('Cart not found', 404)
    }

    profile.cart = profile.cart.filter((c) => (c as any)._id.toString() !== itemId)
    await profile.save()
    
    return this.getCart(userId)
  }

  async clearCart(userId: string) {
    const profile = await BuyerProfile.findOne({ userId })
    if (profile) {
      profile.cart = []
      await profile.save()
    }
    return []
  }
}

export const cartService = new CartService()
