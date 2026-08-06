export interface WorkspaceStats {
  activeRfqs: number
  quotesReceived: number
  activeOrders: number
  pendingDeliveries: number
  savedSuppliers: number
  publishedProducts?: number
  pendingRfqs?: number
  lowStock?: number
}

export interface WorkspaceAnalytics {
  monthlySpend?: number
  supplierPerformance?: number
  activeQuotesCount?: number
  totalSpend?: number
  spendByMonth?: Array<{ month: string; amount: number }>
  orderVolumeByMonth?: Array<{ month: string; count: number }>
}

export interface AIInsights {
  marketTrend: { direction: 'up' | 'down' | 'stable'; description: string }
  riskAlerts: Array<{ severity: 'high' | 'medium' | 'low'; message: string }>
  costSavings: Array<{ opportunity: string; estimatedSavings: number }>
  supplierRecommendations: Array<{ supplierId: string; reason: string }>
}

export interface WorkspaceResponse {
  user: any
  stats: WorkspaceStats
  rfqs: any[]
  orders: any[]
  quotes: any[]
  shipments: any[]
  activities: any[]
  notifications: any[]
  analytics: WorkspaceAnalytics
  inventory: any
  recommendations: any[]
  aiInsights: AIInsights
  recentProducts: any[]
  savedSuppliers: any[]
}
