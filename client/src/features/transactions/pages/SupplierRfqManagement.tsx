import { useState, useEffect } from 'react'
import { Rfq, Quote } from '../types/transactions.types'
import { transactionsApi } from '../api/transactions.api'
import { FileText, Loader2, Store, Send, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export function SupplierRfqManagement() {
  const [rfqs, setRfqs] = useState<Rfq[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Quick state for drafting a quote inline
  const [draftQuoteFor, setDraftQuoteFor] = useState<string | null>(null)
  const [draftPrice, setDraftPrice] = useState('')
  const [draftLeadTime, setDraftLeadTime] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [rfqRes, quoteRes] = await Promise.all([
        transactionsApi.getSupplierRfqs(),
        transactionsApi.getSupplierQuotes()
      ])
      if (rfqRes.success) setRfqs(rfqRes.rfqs)
      if (quoteRes.success) setQuotes(quoteRes.quotes)
    } catch (error) {
      console.error('Failed to fetch RFQ data', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitQuote = async (rfqId: string) => {
    try {
      const res = await transactionsApi.createQuote({
        rfqId,
        offeredPrice: Number(draftPrice),
        leadTime: draftLeadTime,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      })
      if (res.success) {
        setQuotes([res.quote, ...quotes])
        setRfqs(rfqs.map(r => r._id === rfqId ? { ...r, status: 'Responded' } : r))
        setDraftQuoteFor(null)
        setDraftPrice('')
        setDraftLeadTime('')
      }
    } catch (error) {
      console.error('Failed to submit quote', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    )
  }

  const pendingRfqs = rfqs.filter(r => r.status === 'Submitted' || r.status === 'Viewed')

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <Store className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">RFQ Management</h1>
          <p className="text-text-secondary">Review incoming RFQs and submit quotes to buyers.</p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" /> Incoming RFQs (Action Required)
        </h2>
        
        {pendingRfqs.length === 0 ? (
          <div className="bg-surface-2 rounded-2xl p-8 text-center text-text-tertiary">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p>You have no pending RFQs.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingRfqs.map(rfq => {
              const buyer = typeof rfq.buyerId === 'object' ? rfq.buyerId : null
              const product = typeof rfq.productId === 'object' ? rfq.productId : null
              const isDrafting = draftQuoteFor === rfq._id

              return (
                <div key={rfq._id} className="bg-surface-50 border border-border-color rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-text-primary text-lg">
                        {buyer?.fullName || 'Buyer'} is requesting {product?.title || 'Product'}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        Quantity: <span className="font-medium text-text-primary">{rfq.quantity}</span> • 
                        Target Price: <span className="font-medium text-text-primary">${rfq.targetPrice || 'N/A'}</span>
                      </p>
                      {rfq.notes && <p className="text-sm text-text-tertiary mt-2 italic">"{rfq.notes}"</p>}
                    </div>
                    {!isDrafting && (
                      <Button onClick={() => setDraftQuoteFor(rfq._id)} className="bg-brand-primary">
                        Respond
                      </Button>
                    )}
                  </div>

                  {isDrafting && (
                    <div className="mt-4 p-4 bg-surface-1 border border-brand-primary/20 rounded-xl">
                      <h4 className="font-bold text-sm text-brand-primary mb-3">Draft Quote</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs text-text-secondary mb-1">Offered Price ($)</label>
                          <input 
                            type="number" 
                            value={draftPrice}
                            onChange={(e) => setDraftPrice(e.target.value)}
                            className="w-full bg-surface-50 border border-border-color rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                            placeholder="e.g. 150"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-text-secondary mb-1">Lead Time</label>
                          <input 
                            type="text" 
                            value={draftLeadTime}
                            onChange={(e) => setDraftLeadTime(e.target.value)}
                            className="w-full bg-surface-50 border border-border-color rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                            placeholder="e.g. 2 weeks"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDraftQuoteFor(null)}>Cancel</Button>
                        <Button onClick={() => handleSubmitQuote(rfq._id)} className="bg-brand-primary flex items-center gap-2">
                          <Send className="w-4 h-4" /> Send Quote
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Submitted Quotes
        </h2>
        {quotes.length === 0 ? (
          <p className="text-text-tertiary text-sm">No quotes submitted yet.</p>
        ) : (
          <div className="grid gap-3">
            {quotes.map(q => (
              <div key={q._id} className="bg-surface-1 border border-border-color p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-text-primary">Quote for ${q.offeredPrice}</p>
                  <p className="text-xs text-text-secondary">Lead Time: {q.leadTime}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  q.status === 'Pending' ? 'bg-warning/10 text-warning' :
                  q.status === 'Accepted' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
