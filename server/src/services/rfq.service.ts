import { Rfq } from '../models/rfq.model'
import { notificationService } from './notification.service'

export class RfqService {
  async createRfq(buyerId: string, data: any) {
    const rfq = new Rfq({
      buyerId,
      ...data,
      status: 'Submitted',
    })
    await rfq.save()
    
    // Notify supplier
    await notificationService.createNotification({
      userId: rfq.supplierId.toString(),
      type: 'New RFQ',
      title: 'New Request for Quote',
      message: `You have received a new RFQ for ${data.quantity} units.`,
    })

    return rfq
  }

  async getBuyerRfqs(buyerId: string) {
    return Rfq.find({ buyerId }).populate('productId').populate('supplierId', 'fullName email companyName').sort({ createdAt: -1 })
  }

  async getSupplierRfqs(supplierId: string) {
    return Rfq.find({ supplierId }).populate('productId').populate('buyerId', 'fullName email companyName').sort({ createdAt: -1 })
  }

  async getRfqById(rfqId: string) {
    return Rfq.findById(rfqId).populate('productId').populate('supplierId').populate('buyerId')
  }

  async updateRfqStatus(rfqId: string, status: string) {
    const rfq = await Rfq.findByIdAndUpdate(rfqId, { status }, { new: true })
    if (!rfq) throw new Error('RFQ not found')
    return rfq
  }
}

export const rfqService = new RfqService()
