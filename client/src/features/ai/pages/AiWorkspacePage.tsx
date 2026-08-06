import { Container } from '@/shared/components/layout/container'
import { Sparkles, Command, FileText, Search, ShieldCheck, Zap, Activity } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { motion } from 'framer-motion'

export function AiWorkspacePage() {
  const openCopilot = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
  }

  return (
    <Container className="pt-10 pb-24 max-w-[1200px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0A2540] rounded-[32px] p-10 lg:p-16 text-center shadow-2xl relative overflow-hidden mb-12"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#0066FF] blur-[120px] opacity-20 rounded-full" />
          <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] bg-[#38BDF8] blur-[140px] opacity-20 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-8 h-8 text-[#38BDF8]" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight font-display">
            TextileHub <span className="text-[#38BDF8]">Enterprise AI</span>
          </h1>
          
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Your intelligent procurement orchestrator. Automate supplier discovery, analyze real-time market trends, and generate structured RFQs instantly using advanced LLMs.
          </p>

          <Button 
            onClick={openCopilot}
            className="h-14 px-8 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0A2540] font-bold rounded-full text-[16px] gap-3 transition-transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" /> Launch AI Copilot
            <div className="flex items-center gap-1 bg-white/30 px-2 py-1 rounded-[6px] ml-2">
              <Command className="w-3.5 h-3.5" />
              <span className="text-[11px]">K</span>
            </div>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Search className="w-6 h-6 text-[#10B981]" />}
          title="Intelligent Discovery"
          description="Find specific suppliers and materials using natural language. No more manual filtering."
          bg="bg-[#10B981]/10"
        />
        <FeatureCard 
          icon={<FileText className="w-6 h-6 text-[#8B5CF6]" />}
          title="Instant RFQ Generation"
          description="Describe your needs in plain text, and AI will structure it into a professional RFQ draft."
          bg="bg-[#8B5CF6]/10"
        />
        <FeatureCard 
          icon={<Activity className="w-6 h-6 text-[#F59E0B]" />}
          title="Market Intelligence"
          description="Get real-time insights on pricing trends, demand, and best buy windows for any fabric."
          bg="bg-[#F59E0B]/10"
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-6 h-6 text-[#3B82F6]" />}
          title="Supplier Risk Analysis"
          description="AI automatically scores suppliers based on trust, capacity, and historical performance."
          bg="bg-[#3B82F6]/10"
        />
        <FeatureCard 
          icon={<Zap className="w-6 h-6 text-[#EC4899]" />}
          title="Quote Comparison"
          description="Upload multiple supplier quotes and let AI identify the fairest price and hidden risks."
          bg="bg-[#EC4899]/10"
        />
        <FeatureCard 
          icon={<Command className="w-6 h-6 text-[#64748B]" />}
          title="Global Orchestration"
          description="Hit Cmd+K from anywhere in the app to access the Copilot and orchestrate your workflow."
          bg="bg-[#F1F5F9]"
        />
      </div>
    </Container>
  )
}

function FeatureCard({ icon, title, description, bg }: { icon: React.ReactNode, title: string, description: string, bg: string }) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${bg}`}>
        {icon}
      </div>
      <h3 className="text-[18px] font-bold text-[#0A2540] mb-3">{title}</h3>
      <p className="text-[14px] text-[#64748B] font-medium leading-relaxed">
        {description}
      </p>
    </div>
  )
}
