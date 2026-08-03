import { Request, Response } from 'express'
import { orderService } from '../services/order.service'

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'buyer') {
        res.status(403).json({ success: false, message: 'Only buyers can create orders' })
        return
      }

      // Automatically inject buyerId
      const orderData = { ...req.body, buyerId: (req.user as any)._id }
      const order = await orderService.createOrder(orderData)
      res.status(201).json({ success: true, order })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getBuyerOrders(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const orders = await orderService.getBuyerOrders((req.user as any)._id)
      res.status(200).json({ success: true, orders })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getSupplierOrders(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const orders = await orderService.getSupplierOrders((req.user as any)._id)
      res.status(200).json({ success: true, orders })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderService.getOrderById((req.params.id as string))
      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' })
        return
      }
      res.status(200).json({ success: true, order })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'supplier') {
        res.status(403).json({ success: false, message: 'Only suppliers can update order statuses' })
        return
      }

      const { status } = req.body
      const order = await orderService.updateOrderStatus((req.params.id as string), status)
      res.status(200).json({ success: true, order })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export const orderController = new OrderController()
