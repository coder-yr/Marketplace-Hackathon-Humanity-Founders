import { Modal, type ModalProps } from './modal'
import { Button } from '@/shared/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export interface ConfirmationDialogProps extends Omit<ModalProps, 'footer'> {
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'primary'
  onConfirm: () => void
  loading?: boolean
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  loading = false,
  children,
  ...props
}: ConfirmationDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : variant === 'warning' ? 'secondary' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
      {...props}
    >
      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-3)]/50 text-sm text-[var(--text-secondary)]">
        <AlertTriangle className="text-[var(--color-warning)] shrink-0" size={20} />
        <span>{children ?? 'Please confirm if you want to proceed with this operation.'}</span>
      </div>
    </Modal>
  )
}
