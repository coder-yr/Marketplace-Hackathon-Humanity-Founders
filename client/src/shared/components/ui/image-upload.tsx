import { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, X } from 'lucide-react'
import { Button } from './button'

interface ImageUploadProps {
  label: string
  value?: string
  onChange: (base64: string) => void
  error?: string
}

export function ImageUpload({ label, value, onChange, error }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      onChange(base64String)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-bold text-[var(--heading)]">
        {label}
      </label>
      
      <div 
        className={`relative border-2 border-dashed rounded-[16px] p-6 transition-colors duration-[120ms] ease-out cursor-pointer flex flex-col items-center justify-center min-h-[160px] overflow-hidden ${
          isDragging ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--border)] bg-[#F7F8FA] hover:bg-[#F1F5F9]'
        } ${error ? 'border-[var(--error)]' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />

        {value ? (
          <>
            <img src={value} alt="Upload preview" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
            <div className="relative z-10 flex flex-col items-center bg-white/90 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm">
              <ImageIcon className="w-6 h-6 text-[var(--primary)] mb-1" />
              <span className="text-[12px] font-bold text-[var(--heading)]">Image Selected</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-7 text-[11px] text-[var(--error)] hover:text-[var(--error)] hover:bg-[var(--error)]/10"
                onClick={handleRemove}
              >
                <X className="w-3 h-3 mr-1" /> Remove
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-[var(--body)] pointer-events-none">
            <UploadCloud className="w-8 h-8 mb-3 text-[var(--primary)] opacity-80" />
            <p className="text-[14px] font-bold mb-1 text-[var(--heading)]">
              Click to upload or drag & drop
            </p>
            <p className="text-[12px] font-medium opacity-70">
              SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        )}
      </div>
      
      {error && <span className="text-[12px] font-bold text-[var(--error)] mt-0.5">{error}</span>}
    </div>
  )
}
