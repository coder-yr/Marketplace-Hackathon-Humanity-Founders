import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { CheckCircle2, Package, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export function CheckoutConfirmationPage() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F7F8FA] min-h-[70vh] font-sans">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-[var(--success)] flex items-center justify-center mb-6 text-white shadow-lg"
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[32px] font-display font-bold text-[var(--heading)] mb-2 text-center"
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[15px] font-medium text-[var(--body)] mb-8 text-center max-w-md"
      >
        Your order has been sent to the supplier(s) for processing. You will receive an email confirmation shortly.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
      >
        <Button 
          onClick={() => navigate('/dashboard')}
          className="flex-1 bg-[var(--heading)] hover:bg-[#1E293B] text-white rounded-[12px] h-12 font-bold shadow-sm"
        >
          <Package className="w-4 h-4 mr-2" /> View Orders
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/marketplace')}
          className="flex-1 bg-white border-[var(--border)] hover:bg-[#F8FAFC] text-[var(--heading)] rounded-[12px] h-12 font-bold shadow-sm"
        >
          <Home className="w-4 h-4 mr-2" /> Return Home
        </Button>
      </motion.div>
    </div>
  )
}
