import { AiLog } from '../models/ai-log.model'

export const DAILY_BUDGET_USD = 5.0

export class CostGuard {
  static async getTodaySpend(): Promise<number> {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const logs = await AiLog.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, totalCost: { $sum: '$cost' } } }
    ])

    return logs.length > 0 ? logs[0].totalCost : 0
  }

  static async isBudgetExceeded(): Promise<boolean> {
    const spend = await this.getTodaySpend()
    return spend >= DAILY_BUDGET_USD
  }
}
