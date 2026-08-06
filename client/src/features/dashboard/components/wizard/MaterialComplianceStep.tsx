import { useProductWizardStore } from '../../store/useProductWizardStore'
import { Checkbox } from '@/shared/components/ui/checkbox'

const COMMON_CERTIFICATIONS = [
  { id: 'gots', label: 'GOTS (Global Organic Textile Standard)', desc: 'Ensures organic status of textiles from harvesting to manufacturing.' },
  { id: 'oeko-tex', label: 'OEKO-TEX Standard 100', desc: 'Tested for harmful substances and safe for human use.' },
  { id: 'grs', label: 'GRS (Global Recycled Standard)', desc: 'Verifies recycled content and responsible production practices.' },
  { id: 'iso-9001', label: 'ISO 9001:2015', desc: 'Quality Management Systems certification.' },
  { id: 'reach', label: 'REACH Compliant', desc: 'Complies with EU regulations for chemical substances.' },
]

export function MaterialComplianceStep() {
  const { draft, updateDraft } = useProductWizardStore()
  
  const certifications = draft.certifications || []

  const toggleCert = (id: string, checked: boolean) => {
    if (checked) {
      updateDraft({ certifications: [...certifications, id] })
    } else {
      updateDraft({ certifications: certifications.filter(c => c !== id) })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[20px] font-display font-bold text-[#0A2540] mb-1">Certifications & Compliance</h2>
        <p className="text-[14px] text-[#64748B] font-medium">Enterprise buyers prioritize suppliers with verified sustainability and quality credentials.</p>
      </div>

      <div className="space-y-4">
        {COMMON_CERTIFICATIONS.map(cert => (
          <div 
            key={cert.id} 
            className={`flex items-start gap-4 p-4 rounded-[12px] border transition-all ${
              certifications.includes(cert.id) 
                ? 'bg-blue-50/50 border-[#0066FF]' 
                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="pt-1">
              <Checkbox 
                id={cert.id} 
                checked={certifications.includes(cert.id)}
                onChange={(e) => toggleCert(cert.id, e.target.checked)}
                className="data-[state=checked]:bg-[#0066FF] data-[state=checked]:border-[#0066FF]"
              />
            </div>
            <div className="space-y-1 flex-1">
              <label htmlFor={cert.id} className="text-[#0A2540] font-bold text-[14px] cursor-pointer block">
                {cert.label}
              </label>
              <p className="text-[#64748B] text-[13px]">{cert.desc}</p>
              
              {/* Placeholder for future file uploads */}
              {certifications.includes(cert.id) && (
                <div className="mt-3 bg-white border border-[#E2E8F0] border-dashed rounded-[6px] p-3 text-center">
                  <span className="text-[12px] font-bold text-[#0066FF] cursor-pointer hover:underline">Upload Certificate Document</span>
                  <span className="text-[11px] text-[#94A3B8] ml-2">(Coming soon for Hackathon)</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
