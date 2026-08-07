import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { 
  ArrowLeft, MessageSquare, ShieldAlert, Sparkles, TrendingDown,
  Scale, FileText, CheckCircle2
} from 'lucide-react'
import { rfqsApi } from '../api/rfqs.api'
import { ordersApi } from '../api/orders.api'
import { useWorkspace } from '../hooks/useWorkspace'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { formatDistanceToNow } from 'date-fns'
import { useAiTask } from '@/shared/hooks/useAiTask'
import { toast } from 'sonner'

// Removed MOCK_INSIGHTS in favor of backend AI

export function RfqWorkspace() {
  const { id } = useParams()
  const { workspace } = useWorkspace()
  const { user } = useAuthStore()
  const [rfq, setRfq] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false)

  const [aiData, setAiData] = useState<any>(null)
  const { runAiTask, isThinking, progress, step } = useAiTask()

  const handleAnalyzeRfq = () => {
    runAiTask({
      endpoint: '/ai/rfq-analysis',
      payload: { rfq },
      onSuccess: (data) => {
        setAiData(data)
        toast.success('RFQ Analysis Complete')
      },
      onError: (err) => toast.error(err.message)
    })
  }

  const handleAcceptQuote = async () => {
    try {
      setIsAccepting(true)
      
      // Create the order from the RFQ
      const newOrder = await ordersApi.createOrder({
        rfqId: rfq._id,
        productId: rfq.productId?._id || rfq.productId,
        supplierId: rfq.supplierId?._id || rfq.supplierId,
        quantity: rfq.quantity,
        finalPrice: rfq.targetPrice || 18.50,
      })

      // Update RFQ status
      await rfqsApi.updateRfqStatus(rfq._id, 'Accepted')

      toast.success('Quote Accepted! Order created successfully.')
      // Redirect to the new order page
      navigate(`/dashboard/orders/${newOrder._id}`)
    } catch (error: any) {
      toast.error('Failed to accept quote: ' + error.message)
      setIsAccepting(false)
    }
  }

  const handleSupplierAction = async (action: 'Quoted' | 'Rejected') => {
    try {
      if (action === 'Quoted') setIsSubmittingQuote(true)
      if (action === 'Rejected') setIsRejecting(true)

      await rfqsApi.updateRfqStatus(rfq._id, action)
      setRfq((prev: any) => ({ ...prev, status: action }))
      toast.success(`RFQ successfully ${action.toLowerCase()}.`)
    } catch (error: any) {
      toast.error(`Failed to update RFQ: ${error.message}`)
    } finally {
      setIsSubmittingQuote(false)
      setIsRejecting(false)
    }
  }

  useEffect(() => {
    const fetchRfq = async () => {
      try {
        let rfqId = id
        // If the URL has 'active', we try to fallback to the first valid RFQ in the user's workspace
        if (id === 'active' && workspace && workspace.rfqs.length > 0) {
          const firstActive = workspace.rfqs.find((r: any) => r.status !== 'Draft' && r.status !== 'Expired') || workspace.rfqs[0]
          rfqId = firstActive._id
        }

        if (rfqId && rfqId !== 'active') {
          const data = await rfqsApi.getRfqById(rfqId)
          setRfq(data)
        }
      } catch (error) {
        console.error('Failed to fetch RFQ:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    if (workspace || id !== 'active') {
      fetchRfq()
    }
  }, [id, workspace])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066FF]" />
      </div>
    )
  }

  if (!rfq) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[14px] font-bold text-[#64748B]">No RFQ found or none are currently active.</p>
          <Link to="/dashboard/procurement">
            <Button className="bg-[#0A2540] hover:bg-[#1E293B] text-white">Back to Workspace</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Derive dynamic fields
  const displayId = `RFQ-${rfq._id.substring(rfq._id.length - 4).toUpperCase()}`
  const title = rfq.productId?.title || 'Unknown Product'
  const supplierName = rfq.supplierId?.fullName || 'Unknown Supplier'
  const quantity = rfq.quantity
  const targetPrice = rfq.targetPrice || 18.50
  const status = rfq.status
  const date = formatDistanceToNow(new Date(rfq.createdAt), { addSuffix: true })
  const totalValue = targetPrice * quantity

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20 shadow-sm">
        <Container className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard/procurement" className="flex items-center gap-2 text-[13px] font-bold text-[#64748B] hover:text-[#0A2540] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Workspace
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-amber-100 text-amber-700 border-transparent font-bold tracking-wider px-2 py-0.5 rounded-[6px] text-[10px] uppercase">
                  {status}
                </Badge>
                <span className="text-[13px] font-bold text-[#94A3B8]">ID: {displayId}</span>
                <span className="text-[12px] font-medium text-[#94A3B8]">Created {date}</span>
              </div>
              <h1 className="text-[32px] font-display font-bold text-[#0A2540]">{title}</h1>
              <p className="text-[14px] font-medium text-[#64748B] flex items-center gap-2 mt-1">
                Requested from <strong className="text-[#0A2540]">{supplierName}</strong> • {quantity} units
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] font-bold rounded-[8px] h-10">
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </Button>
              {user?.role === 'buyer' && (
                <Button 
                  onClick={handleAcceptQuote} 
                  disabled={isAccepting || status === 'Accepted'}
                  className="bg-[#0A2540] hover:bg-[#1E293B] text-white font-bold rounded-[8px] h-10 px-6"
                >
                  {isAccepting ? 'Accepting...' : status === 'Accepted' ? 'Accepted' : 'Accept Quote'}
                </Button>
              )}
              {user?.role === 'supplier' && (
                <>
                  <Button 
                    onClick={() => handleSupplierAction('Rejected')}
                    disabled={isRejecting || isSubmittingQuote || status === 'Rejected' || status === 'Accepted'}
                    variant="outline"
                    className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold rounded-[8px] h-10 px-6"
                  >
                    {isRejecting ? 'Rejecting...' : status === 'Rejected' ? 'Rejected' : 'Reject Request'}
                  </Button>
                  <Button 
                    onClick={() => handleSupplierAction('Quoted')}
                    disabled={isRejecting || isSubmittingQuote || status === 'Quoted' || status === 'Accepted'}
                    className="bg-[#0A2540] hover:bg-[#1E293B] text-white font-bold rounded-[8px] h-10 px-6"
                  >
                    {isSubmittingQuote ? 'Submitting...' : status === 'Quoted' ? 'Quote Submitted' : 'Submit Quote'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT: Quote Details */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            
            <Card className="rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066FF]" /> Quote Details
              </h2>
              
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-6 mb-6">
                <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-6 mb-6">
                  <div>
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Unit Price</p>
                    <p className="text-[36px] font-display font-bold text-[#0A2540] leading-none">${targetPrice.toFixed(2)}<span className="text-[16px] text-[#94A3B8]">/unit</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Total Estimated</p>
                    <p className="text-[24px] font-display font-bold text-[#0A2540] leading-none">${totalValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Lead Time</p>
                    <p className="text-[15px] font-bold text-[#0A2540]">{rfq.timeline || '14 Days'}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Valid Until</p>
                    <p className="text-[15px] font-bold text-[#0A2540]">
                      {new Date(new Date(rfq.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Custom Requirements</p>
                <p className="text-[14px] text-[#0A2540] leading-relaxed bg-[#F1F5F9] p-4 rounded-[12px]">
                  {rfq.notes ? `"${rfq.notes}"` : '"Premium combed cotton. Price includes export packaging."'}
                </p>
              </div>
              
              {rfq.deliveryAddress && (
                <div className="mt-4">
                  <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Delivery Address</p>
                  <p className="text-[14px] text-[#0A2540] leading-relaxed bg-[#F1F5F9] p-4 rounded-[12px]">
                    {rfq.deliveryAddress}
                  </p>
                </div>
              )}
            </Card>

          </div>

          {/* RIGHT: AI Procurement Advisor */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            
            <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-[24px] border border-[#0066FF]/20 p-1 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
              
              <div className="bg-white rounded-[20px] p-6 relative z-10 h-full">
                <div className="flex items-center gap-2 mb-6 border-b border-[#E2E8F0] pb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <h2 className="text-[16px] font-bold text-[#0A2540]">AI Procurement Advisor</h2>
                </div>                
                
                {/* Content switching based on AI state */}
                {!aiData ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    {isThinking ? (
                      <div className="flex flex-col items-center gap-4 w-full px-6">
                        <div className="w-8 h-8 border-4 border-[#0066FF]/20 border-t-[#0066FF] rounded-full animate-spin" />
                        <div className="text-center w-full">
                          <p className="text-[14px] font-bold text-[#0A2540] mb-2">{step}</p>
                          <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0066FF] transition-all duration-300" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-[14px] font-medium text-[#64748B] mb-4">Run AI Analysis to benchmark this quote against market data.</p>
                        <Button onClick={handleAnalyzeRfq} className="bg-[#0A2540] hover:bg-[#1E293B] text-white">
                          <Sparkles className="w-4 h-4 mr-2" /> Analyze Quote
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Cost Insights */}
                    <div className="mb-6">
                      <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" /> Cost Insights
                      </h3>
                      <div className="bg-[#F8FAFC] rounded-[12px] p-4 border border-[#E2E8F0]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[13px] font-medium text-[#64748B]">Market Average</span>
                          <span className="font-bold text-[#0A2540]">${aiData.costAnalysis?.marketAverage?.toFixed(2)}/unit</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-[#0066FF]">AI Target Price</span>
                          <span className="font-bold text-[#0066FF]">${aiData.recommendedBudget?.toFixed(2)}/unit</span>
                        </div>
                      </div>
                      <p className="text-[12px] text-[#64748B] mt-2 font-medium">Quote is <strong className="text-rose-500">+{(targetPrice / (aiData.costAnalysis?.marketAverage || 17.20) * 100 - 100).toFixed(1)}%</strong> above market average.</p>
                    </div>

                    {/* Negotiation Advice */}
                    <div className="mb-6">
                      <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Scale className="w-4 h-4" /> Negotiation Strategy
                      </h3>
                      <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-100">
                        <p className="text-[13px] font-bold text-[#0A2540] mb-2">
                          Suggested Counter: <span className="text-[#0066FF]">${aiData.recommendedBudget?.toFixed(2)}/unit</span>
                        </p>
                        <ul className="space-y-1.5">
                          {aiData.negotiationStrategy?.reasons?.map((r: string, i: number) => (
                            <li key={i} className="text-[12px] text-[#475569] flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" /> {r}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-4 bg-white text-[#0066FF] hover:bg-blue-100 border border-blue-200 font-bold text-[12px] h-8">
                          Auto-Draft Counter Offer
                        </Button>
                      </div>
                    </div>

                    {/* Supplier Risk */}
                    <div>
                      <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Risk Analysis
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`border-transparent font-bold ${aiData.risk?.level === 'LOW' ? 'bg-emerald-100 text-emerald-700' : aiData.risk?.level === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                          {aiData.risk?.level} Risk
                        </Badge>
                      </div>
                      <ul className="space-y-1.5">
                        {aiData.risk?.reasons?.map((r: string, i: number) => (
                          <li key={i} className="text-[12px] text-[#475569] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
