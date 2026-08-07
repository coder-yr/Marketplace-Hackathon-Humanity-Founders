import { Types } from 'mongoose'
import { Rfq } from '../models/rfq.model'
import { Order } from '../models/order.model'
import { Quote } from '../models/quote.model'
import { Product } from '../models/product.model'
import { Notification } from '../models/notification.model'
import { User } from '../models/user.model'
import { WorkspaceResponse, WorkspaceStats, WorkspaceAnalytics, AIInsights } from '../types/workspace.types'

export class WorkspaceService {
  async getWorkspaceData(userId: string, role: 'buyer' | 'supplier'): Promise<WorkspaceResponse> {
    const userObjectId = new Types.ObjectId(userId)
    const user = await User.findById(userId).select('-password')

    let rfqs: any[] = []
    let orders: any[] = []
    let quotes: any[] = []
    let products: any[] = []
    let notifications: any[] = []

    if (role === 'buyer') {
      rfqs = await Rfq.find({ buyerId: userObjectId })
        .populate('buyerId', 'fullName email companyName')
        .populate('supplierId', 'fullName email companyName')
        .populate('productId', 'title name')
        .sort({ createdAt: -1 })
        .limit(50)
      orders = await Order.find({ buyerId: userObjectId })
        .populate('buyerId', 'fullName email companyName')
        .populate('supplierId', 'fullName email companyName')
        .populate('productId', 'title name')
        .sort({ createdAt: -1 })
        .limit(50)
      quotes = await Quote.find({ buyerId: userObjectId }).sort({ createdAt: -1 }).limit(50)
    } else {
      rfqs = await Rfq.find({ supplierId: userObjectId })
        .populate('buyerId', 'fullName email companyName')
        .populate('supplierId', 'fullName email companyName')
        .populate('productId', 'title name')
        .sort({ createdAt: -1 })
        .limit(50)
      orders = await Order.find({ supplierId: userObjectId })
        .populate('buyerId', 'fullName email companyName')
        .populate('supplierId', 'fullName email companyName')
        .populate('productId', 'title name')
        .sort({ createdAt: -1 })
        .limit(50)
      quotes = await Quote.find({ supplierId: userObjectId }).sort({ createdAt: -1 }).limit(50)
      products = await Product.find({ supplierId: userObjectId }).sort({ createdAt: -1 }).limit(50)
    }

    notifications = await Notification.find({ userId: userObjectId }).sort({ createdAt: -1 }).limit(20)

    // Compute Stats
    const stats: WorkspaceStats = {
      activeRfqs: rfqs.filter(r => r.status !== 'Expired' && r.status !== 'Draft' && r.status !== 'Rejected' && r.status !== 'Accepted').length,
      quotesReceived: quotes.length,
      activeOrders: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Completed').length,
      pendingDeliveries: orders.filter(o => o.status === 'Shipped').length,
      savedSuppliers: 12, // Mocked for now
      ...(role === 'supplier' && {
        publishedProducts: products.length,
        pendingRfqs: rfqs.length,
        lowStock: products.filter(p => p.stock < (p.moq || 50)).length
      })
    }

    // Compute Analytics
    const analytics: WorkspaceAnalytics = {
      monthlySpend: orders.reduce((sum, o) => sum + (o.finalPrice * o.quantity || 0), 0),
      supplierPerformance: 94,
      activeQuotesCount: quotes.length,
      totalSpend: orders.reduce((sum, o) => sum + (o.finalPrice * o.quantity || 0), 0) * 1.5,
      spendByMonth: (() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const currentMonth = new Date().getMonth()
        const result: { month: string, amount: number }[] = []
        // Generate last 6 months
        for (let i = 5; i >= 0; i--) {
          const m = (currentMonth - i + 12) % 12
          result.push({ month: months[m], amount: 0 })
        }
        
        orders.forEach(o => {
          const d = new Date(o.createdAt)
          const mIndex = (currentMonth - d.getMonth() + 12) % 12
          if (mIndex < 6) { // if within last 6 months
            const targetMonth = months[d.getMonth()]
            const record = result.find(r => r.month === targetMonth)
            if (record) {
              record.amount += (o.finalPrice * o.quantity) || 0
            }
          }
        })
        return result
      })(),
      orderVolumeByMonth: (() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const currentMonth = new Date().getMonth()
        const result: { month: string, count: number }[] = []
        for (let i = 5; i >= 0; i--) {
          const m = (currentMonth - i + 12) % 12
          result.push({ month: months[m], count: 0 })
        }
        
        orders.forEach(o => {
          const d = new Date(o.createdAt)
          const mIndex = (currentMonth - d.getMonth() + 12) % 12
          if (mIndex < 6) {
            const targetMonth = months[d.getMonth()]
            const record = result.find(r => r.month === targetMonth)
            if (record) {
              record.count += 1
            }
          }
        })
        return result
      })()
    }

    // Fake AI Insights (Would connect to AI engine)
    const aiInsights: AIInsights = {
      marketTrend: { direction: 'up', description: 'Cotton prices expected to rise 4% next quarter.' },
      riskAlerts: [
        { severity: 'high', message: 'Supplier "Global Textiles" has a 3-day delay average on recent orders.' }
      ],
      costSavings: [
        { opportunity: 'Consolidate denim orders', estimatedSavings: 1250 }
      ],
      supplierRecommendations: [
        { supplierId: 'sup1', reason: 'Matches your sustainability requirements.' }
      ]
    }

    // Map activities
    const activities = notifications.map(n => ({
      id: n._id,
      title: n.title,
      description: n.message,
      date: n.createdAt,
      type: n.type,
      read: n.isRead
    }))

    return {
      user,
      stats,
      rfqs,
      orders,
      quotes,
      shipments: orders.filter(o => o.status === 'Shipped' || o.status === 'Processing'),
      activities,
      notifications,
      analytics,
      inventory: products,
      recommendations: [],
      aiInsights,
      recentProducts: products.slice(0, 5),
      savedSuppliers: []
    }
  }
}

export const workspaceService = new WorkspaceService()
