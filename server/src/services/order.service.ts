import { Order } from '../models/order.model'
import { notificationService } from './notification.service'

export class OrderService {
  async createOrder(data: any) {
    const order = new Order({
      ...data,
      status: 'Pending',
    })
    await order.save()
    
    // Notify supplier
    await notificationService.createNotification({
      userId: order.supplierId.toString(),
      type: 'Order Updated',
      title: 'New Order Received',
      message: `A buyer has placed an order based on your accepted quote.`,
    })

    return order
  }

  async getBuyerOrders(buyerId: string) {
    return Order.find({ buyerId }).populate('quoteId').populate('productId').populate('supplierId', 'fullName email companyName').sort({ createdAt: -1 })
  }

  async getSupplierOrders(supplierId: string) {
    return Order.find({ supplierId }).populate('quoteId').populate('productId').populate('buyerId', 'fullName email companyName').sort({ createdAt: -1 })
  }

  async getOrderById(orderId: string) {
    return Order.findById(orderId).populate('quoteId').populate('productId').populate('supplierId').populate('buyerId')
  }

  async updateOrderStatus(orderId: string, status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Completed') {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
    if (!order) throw new Error('Order not found')
    
    // Notify buyer
    await notificationService.createNotification({
      userId: order.buyerId.toString(),
      type: 'Order Updated',
      title: 'Order Status Updated',
      message: `Your order status has been updated to: ${status}`,
    })

    return order
  }
}

export const orderService = new OrderService()
