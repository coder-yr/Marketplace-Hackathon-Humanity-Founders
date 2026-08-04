import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { 
  ShieldCheck, MapPin, Globe, Clock, Package, Zap,
  TrendingUp, Award, BarChart3, Factory
} from 'lucide-react'

// Mock Data
const mockSupplier = {
  name: 'Kuroki Textiles',
  type: 'Manufacturer',
  location: 'Okayama, Japan',
  description: 'Premium denim manufacturer specializing in selvedge denim and sustainable dyeing processes. Operating since 1984.',
  trustScore: 96,
  ordersCompleted: 420,
  leadTime: '9 Days',
  capacity: '25,000m/month',
  responseRate: '97%',
  countriesExported: 28,
  certifications: ['ISO 9001:2015', 'OEKO-TEX Standard 100', 'GOTS'],
  categories: ['Denim', 'Cotton', 'Sustainable']
}

export function SupplierProfilePage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24 font-sans">
      
      {/* Banner & Header */}
      <div className="bg-[#0A2540] text-white pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <Container className="relative z-10 max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-[24px] bg-white p-2 shadow-2xl flex items-center justify-center border border-white/20">
                <Factory className="w-16 h-16 text-[#0A2540]" />
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 flex items-center gap-1.5 font-bold tracking-widest px-3 py-1 rounded-[8px] text-[11px] uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" /> AI Verified
                  </Badge>
                  <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest">Member since 2024</span>
                </div>
                <h1 className="text-[40px] md:text-[56px] font-display font-extrabold leading-none tracking-tight mb-2">{mockSupplier.name}</h1>
                <p className="text-[16px] font-medium text-slate-300 flex items-center gap-2 mt-2">
                  <MapPin className="w-5 h-5" /> {mockSupplier.location} <span className="mx-2 opacity-50">•</span> {mockSupplier.type}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 pb-2">
              <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold rounded-[14px] h-14 px-8 text-[15px] backdrop-blur-md">
                Save Supplier
              </Button>
              <Button className="bg-[#0066FF] hover:bg-[#2563EB] text-white font-bold rounded-[14px] h-14 px-8 text-[15px] shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                Request Quote
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-10 max-w-[1400px]">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT: Overview & Products */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            
            {/* About */}
            <Card className="rounded-[32px] border border-[#E2E8F0] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white">
              <h2 className="text-[24px] font-display font-bold text-[#0A2540] mb-4">About {mockSupplier.name}</h2>
              <p className="text-[#64748B] text-[16px] leading-relaxed font-medium">
                {mockSupplier.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#E2E8F0]">
                {mockSupplier.categories.map((cat, i) => (
                  <Badge key={i} className="bg-[#F8FAFC] text-[#0A2540] border-[#E2E8F0] font-bold px-4 py-2 rounded-[10px] text-[13px]">
                    {cat}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="rounded-[32px] border border-[#E2E8F0] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white">
              <h2 className="text-[24px] font-display font-bold text-[#0A2540] mb-8 flex items-center gap-3">
                <Award className="w-7 h-7 text-[#0066FF]" /> Quality & Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSupplier.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0066FF]/30 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-[10px] shadow-sm flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="font-bold text-[#0A2540] text-[15px]">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* RIGHT: Intelligence KPIs */}
          <div className="xl:col-span-4 flex flex-col gap-8">
            
            <Card className="rounded-[32px] border border-[#E2E8F0] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF]/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="font-bold text-[#0A2540] text-[18px] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#0066FF]" /> AI Trust Score
                </h3>
                <span className="text-[40px] font-display font-extrabold text-[#10B981] leading-none">{mockSupplier.trustScore}</span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-[16px] border border-[#E2E8F0]">
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2"><Package className="w-4 h-4 text-[#0066FF]"/> Orders</span>
                  <span className="font-bold text-[#0A2540] text-[16px]">{mockSupplier.ordersCompleted}</span>
                </div>
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-[16px] border border-[#E2E8F0]">
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2"><Clock className="w-4 h-4 text-[#0066FF]"/> Lead Time</span>
                  <span className="font-bold text-[#0A2540] text-[16px]">{mockSupplier.leadTime}</span>
                </div>
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-[16px] border border-[#E2E8F0]">
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#0066FF]"/> Capacity</span>
                  <span className="font-bold text-[#0A2540] text-[16px]">{mockSupplier.capacity}</span>
                </div>
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-[16px] border border-[#E2E8F0]">
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2"><Globe className="w-4 h-4 text-[#0066FF]"/> Markets</span>
                  <span className="font-bold text-[#0A2540] text-[16px]">{mockSupplier.countriesExported}</span>
                </div>
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-[16px] border border-[#E2E8F0]">
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#10B981]"/> Response</span>
                  <span className="font-bold text-[#10B981] text-[16px]">{mockSupplier.responseRate}</span>
                </div>
              </div>
            </Card>

          </div>

        </div>
      </Container>
    </div>
  )
}
