import { Request, Response, NextFunction } from 'express'
import { cartService } from '../services/cart.service'
import { orderService } from '../services/order.service'
import { AppError } from '../middleware/errorHandler'

export class CartController {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can access the cart', 403)
      }
      
      const cart = await cartService.getCart(req.user._id.toString())
      
      res.status(200).json({
        success: true,
        data: cart,
      })
    } catch (error) {
      next(error)
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can add to cart', 403)
      }

      const cart = await cartService.addToCart(req.user._id.toString(), req.body)
      
      res.status(200).json({
        success: true,
        data: cart,
      })
    } catch (error) {
      next(error)
    }
  }

  async updateCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can update cart', 403)
      }

      const { itemId } = req.params
      const { quantity } = req.body

      const cart = await cartService.updateCartItem(req.user._id.toString(), itemId as string, quantity)
      
      res.status(200).json({
        success: true,
        data: cart,
      })
    } catch (error) {
      next(error)
    }
  }

  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can remove from cart', 403)
      }

      const { itemId } = req.params

      const cart = await cartService.removeFromCart(req.user._id.toString(), itemId as string)
      
      res.status(200).json({
        success: true,
        data: cart,
      })
    } catch (error) {
      next(error)
    }
  }

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can clear cart', 403)
      }

      const cart = await cartService.clearCart(req.user._id.toString())
      
      res.status(200).json({
        success: true,
        data: cart,
      })
    } catch (error) {
      next(error)
    }
  }
  async checkoutCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'buyer') {
        throw new AppError('Only buyers can checkout', 403)
      }

      const userId = req.user._id.toString()
      const cart = await cartService.getCart(userId)
      
      if (!cart || cart.length === 0) {
        throw new AppError('Cart is empty', 400)
      }

      const { shippingDetails } = req.body

      const orders = []
      for (const item of cart) {
        const orderData = {
          buyerId: userId,
          supplierId: item.supplierId,
          productId: (item.productId as any)._id || item.productId,
          finalPrice: item.price || (item.productId as any).priceRange?.min || 0,
          quantity: item.quantity,
          shippingDetails,
          status: 'Pending'
        }
        const order = await orderService.createOrder(orderData)
        orders.push(order)
      }

      await cartService.clearCart(userId)

      res.status(200).json({
        success: true,
        data: orders,
      })
    } catch (error) {
      next(error)
    }
  }
}

export const cartController = new CartController()
