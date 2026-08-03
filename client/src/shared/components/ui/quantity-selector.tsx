import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface QuantitySelectorProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  unit?: string
  size?: 'sm' | 'md' | 'lg'
}

export function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 10000,
  step = 1,
  disabled = false,
  unit,
  size = 'md',
}: QuantitySelectorProps) {
  const [val, setVal] = useState(value)

  const handleUpdate = (newVal: number) => {
    const clamped = Math.min(Math.max(newVal, min), max)
    setVal(clamped)
    onChange?.(clamped)
  }

  const sizes = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  }

  return (
    <div className="inline-flex items-center gap-1">
      <div
        className={cn(
          'inline-flex items-center rounded-lg border border-[var(--border-color)] bg-[var(--surface-2)] overflow-hidden',
          sizes[size]
        )}
      >
        <button
          type="button"
          disabled={disabled || val <= min}
          onClick={() => handleUpdate(val - step)}
          className="p-1 hover:bg-[var(--surface-3)] text-[var(--text-secondary)] disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>

        <input
          type="number"
          value={val}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(e) => handleUpdate(Number(e.target.value))}
          className="w-16 text-center bg-transparent font-semibold text-[var(--text-primary)] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          disabled={disabled || val >= max}
          onClick={() => handleUpdate(val + step)}
          className="p-1 hover:bg-[var(--surface-3)] text-[var(--text-secondary)] disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>
      {unit && <span className="text-xs font-medium text-[var(--text-muted)] ml-1">{unit}</span>}
    </div>
  )
}
