import React, { useState } from 'react'
import { Chip } from './chip'
import { cn } from '@/shared/utils/cn'

export interface TagInputProps {
  tags?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  className?: string
}

export function TagInput({
  tags = [],
  onChange,
  placeholder = 'Type tag & press Enter...',
  label,
  error,
  disabled,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const trimmed = inputValue.trim()
      if (trimmed && !tags.includes(trimmed)) {
        const next = [...tags, trimmed]
        onChange?.(next)
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange?.(tags.slice(0, -1))
    }
  }

  const handleRemove = (index: number) => {
    const next = tags.filter((_, i) => i !== index)
    onChange?.(next)
  }

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>}
      <div
        className={cn(
          'min-h-[2.5rem] p-2 rounded-lg border bg-[var(--surface-2)] flex flex-wrap items-center gap-2',
          error ? 'border-[var(--color-error)]' : 'border-[var(--border-color)] focus-within:border-[var(--color-brand-primary)]'
        )}
      >
        {tags.map((tag, i) => (
          <Chip key={i} variant="filled" onRemove={() => handleRemove(i)}>
            {tag}
          </Chip>
        ))}
        <input
          type="text"
          value={inputValue}
          disabled={disabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none min-w-[120px]"
        />
      </div>
      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
    </div>
  )
}
