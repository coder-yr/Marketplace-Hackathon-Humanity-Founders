import { Quote } from '../models/quote.model'
import { rfqService } from './rfq.service'
import { notificationService } from './notification.service'

export class QuoteService {
  async createQuote(supplierId: string, data: any) {
    const quote = new Quote({
      supplierId,
      ...data,
      status: 'Pending',
    })
    await quote.save()
    
    // Update RFQ status to Responded
    await rfqService.updateRfqStatus(data.rfqId, 'Responded')

    // Notify buyer
    await notificationService.createNotification({
      userId: quote.buyerId.toString(),
      type: 'Quote Received',
      title: 'New Quote Received',
      message: `A supplier has responded to your RFQ with a quote of ${data.offeredPrice}.`,
    })

    return quote
  }

  async getBuyerQuotes(buyerId: string) {
    return Quote.find({ buyerId }).populate('rfqId').populate('supplierId', 'fullName email companyName').sort({ createdAt: -1 })
  }

  async getSupplierQuotes(supplierId: string) {
    return Quote.find({ supplierId }).populate('rfqId').populate('buyerId', 'fullName email companyName').sort({ createdAt: -1 })
  }

  async getQuoteById(quoteId: string) {
    return Quote.findById(quoteId).populate('rfqId').populate('supplierId').populate('buyerId')
  }

  async updateQuoteStatus(quoteId: string, status: 'Pending' | 'Accepted' | 'Rejected') {
    const quote = await Quote.findByIdAndUpdate(quoteId, { status }, { new: true })
    if (!quote) throw new Error('Quote not found')
    
    // If accepted, we will handle order creation elsewhere, but we can notify the supplier
    if (status === 'Accepted') {
      await rfqService.updateRfqStatus(quote.rfqId.toString(), 'Accepted')
      await notificationService.createNotification({
        userId: quote.supplierId.toString(),
        type: 'Order Updated', // Or a new type like Quote Accepted
        title: 'Quote Accepted',
        message: `Your quote for RFQ has been accepted by the buyer.`,
      })
    } else if (status === 'Rejected') {
      await rfqService.updateRfqStatus(quote.rfqId.toString(), 'Rejected')
    }

    return quote
  }
}

export const quoteService = new QuoteService()
