import { Select, type SelectOption } from '@/shared/components/ui/select'
import { ArrowUpDown } from 'lucide-react'

export interface SortDropdownProps {
  options: SelectOption[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  label?: string
  className?: string
}

export function SortDropdown({
  options,
  value,
  onChange,
  label = 'Sort By',
  className,
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1 shrink-0">
        <ArrowUpDown size={14} /> {label}:
      </span>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        selectSize="sm"
        fullWidth={false}
        className={className}
      />
    </div>
  )
}
