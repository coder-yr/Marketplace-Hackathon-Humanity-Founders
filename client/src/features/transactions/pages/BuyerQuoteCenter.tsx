import { useState, useEffect } from 'react'
import { Rfq, Quote } from '../types/transactions.types'
import { transactionsApi } from '../api/transactions.api'
import { FileText, Loader2, Package, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'

export function BuyerQuoteCenter() {
  const [rfqs, setRfqs] = useState<Rfq[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [rfqRes, quoteRes] = await Promise.all([
        transactionsApi.getBuyerRfqs(),
        transactionsApi.getBuyerQuotes()
      ])
      if (rfqRes.success) setRfqs(rfqRes.rfqs)
      if (quoteRes.success) setQuotes(quoteRes.quotes)
    } catch (error) {
      console.error('Failed to fetch quote center data', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptQuote = async (quoteId: string) => {
    try {
      const res = await transactionsApi.updateQuoteStatus(quoteId, 'Accepted')
      if (res.success) {
        setQuotes(quotes.map(q => q._id === quoteId ? { ...q, status: 'Accepted' } : q))
        // Create order automatically in a real scenario, or prompt buyer to confirm order.
      }
    } catch (error) {
      console.error('Failed to accept quote', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Quote Center</h1>
          <p className="text-text-secondary">Manage your RFQs and incoming quotes from suppliers.</p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" /> Incoming Quotes
        </h2>
        
        {quotes.length === 0 ? (
          <div className="bg-surface-2 rounded-2xl p-8 text-center text-text-tertiary">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p>You have no incoming quotes yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {quotes.map(quote => {
              const supplier = typeof quote.supplierId === 'object' ? quote.supplierId : null
              return (
                <div key={quote._id} className="bg-surface-50 border border-border-color rounded-2xl p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        quote.status === 'Pending' ? 'bg-warning/10 text-warning' :
                        quote.status === 'Accepted' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}>
                        {quote.status}
                      </span>
                      <span className="text-xs text-text-tertiary">Quote #{quote._id.slice(-6).toUpperCase()}</span>
                    </div>
                    <h3 className="font-bold text-text-primary text-lg">
                      {supplier?.fullName || 'Supplier'} offered ${quote.offeredPrice}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Lead Time: {quote.leadTime} • Valid Until: {new Date(quote.validUntil).toLocaleDateString()}
                    </p>
                    {quote.notes && (
                      <p className="text-sm text-text-tertiary mt-2 italic">"{quote.notes}"</p>
                    )}
                  </div>
                  
                  {quote.status === 'Pending' && (
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" className="flex-1 md:flex-none">Reject</Button>
                      <Button onClick={() => handleAcceptQuote(quote._id)} className="flex-1 md:flex-none bg-brand-primary">
                        Accept & Order
                      </Button>
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
          <Clock className="w-5 h-5" /> Your RFQs (Requests)
        </h2>
        
        {rfqs.length === 0 ? (
          <div className="bg-surface-2 rounded-2xl p-8 text-center text-text-tertiary">
            <p>You haven't requested any quotes yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {rfqs.map(rfq => {
              const product = typeof rfq.productId === 'object' ? rfq.productId : null
              return (
                <div key={rfq._id} className="bg-surface-50 border border-border-color rounded-2xl p-5 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-text-primary">{product?.title || 'Product'}</h3>
                    <p className="text-sm text-text-secondary">Requested {rfq.quantity} units • Target: ${rfq.targetPrice}</p>
                    <p className="text-xs text-text-tertiary mt-1">Status: <span className="font-medium text-brand-primary">{rfq.status}</span></p>
                  </div>
                  <Link to={`/products/${product?.slug || product?._id}`} className="text-brand-primary text-sm font-bold flex items-center gap-1 hover:underline">
                    View Product <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
