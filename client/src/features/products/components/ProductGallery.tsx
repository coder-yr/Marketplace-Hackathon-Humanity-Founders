import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductGalleryProps {
  images: string[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const imageList = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=1000&q=80']

  const [selectedImage, setSelectedImage] = useState(imageList[0])

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-none group">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails list */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-[12px] border-2 transition-all duration-200 focus:outline-none ${
                selectedImage === img
                  ? 'border-[#0066FF] ring-2 ring-[#0066FF]/20 scale-[1.02]'
                  : 'border-[#E2E8F0] opacity-70 hover:opacity-100 hover:border-[#0066FF]/40'
              }`}
            >
              <img src={img} alt={`${title} thumb ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
