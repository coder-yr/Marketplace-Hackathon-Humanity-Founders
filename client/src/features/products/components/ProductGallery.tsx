import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Factory, Box, CheckCircle2, Microscope, Package, FileBadge } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  title: string
}

const STAGES = [
  { label: 'Fabric', icon: Box },
  { label: 'Factory', icon: Factory },
  { label: 'Machine', icon: CheckCircle2 },
  { label: 'QC Lab', icon: Microscope },
  { label: 'Packaging', icon: Package },
  { label: 'Certificate', icon: FileBadge },
]

// Real contextual fallback images for stages
const FALLBACKS = [
  'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=1000&q=80', // Fabric
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80', // Factory/Industrial
  'https://images.unsplash.com/photo-1504917595217-d4f3e3ceb693?auto=format&fit=crop&w=1000&q=80', // Machine/Textile
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=1000&q=80', // QC Lab
  'https://images.unsplash.com/photo-1603525208646-7c93cb669fc9?auto=format&fit=crop&w=1000&q=80', // Packaging
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80', // Certificate/Paperwork
]

export function ProductGallery({ images, title }: ProductGalleryProps) {
  // Ensure we have exactly 6 images mapped to the stages
  const imageList = STAGES.map((_, i) => {
    return images[i] ? images[i] : FALLBACKS[i]
  })

  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <div className="flex flex-col gap-5">
      {/* Main Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm group">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageList[selectedIdx]}
            src={imageList[selectedIdx]}
            alt={`${title} - ${STAGES[selectedIdx].label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </AnimatePresence>
        
        {/* Overlay Label on Main Image */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-[12px] shadow-sm border border-[#E2E8F0] flex items-center gap-2">
          {(() => { const Icon = STAGES[selectedIdx].icon; return <Icon className="w-4 h-4 text-[#0A2540]" /> })()}
          <span className="text-[12px] font-bold text-[#0A2540] tracking-wide">{STAGES[selectedIdx].label} Inspection</span>
        </div>
      </div>

      {/* Thumbnails list */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {imageList.map((img, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="flex flex-col items-center gap-1.5 focus:outline-none group"
            >
              <div className={`relative h-14 w-full sm:h-16 overflow-hidden rounded-[12px] border-2 transition-all duration-200 ${
                selectedIdx === idx
                  ? 'border-[#0066FF] ring-2 ring-[#0066FF]/20 scale-[1.05] shadow-sm'
                  : 'border-transparent opacity-70 group-hover:opacity-100 group-hover:border-[#E2E8F0]'
              }`}>
                <img src={img} alt={`${title} thumb ${idx + 1}`} className="h-full w-full object-cover" />
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider flex flex-col items-center gap-0.5 transition-colors ${selectedIdx === idx ? 'text-[#0066FF]' : 'text-[#94A3B8] group-hover:text-[#0A2540]'}`}>
                {STAGES[idx].label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
