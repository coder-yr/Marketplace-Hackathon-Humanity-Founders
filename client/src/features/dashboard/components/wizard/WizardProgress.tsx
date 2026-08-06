import { Check } from 'lucide-react'

const STEPS = [
  'Basic Information',
  'Technical Specs',
  'Procurement',
  'Compliance',
  'Media',
  'AI Review'
]

interface Props {
  currentStep: number
  onStepClick?: (step: number) => void
}

export function WizardProgress({ currentStep, onStepClick }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#E2E8F0] -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--primary)] -z-10 transition-all duration-300 ease-in-out" 
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} 
        />
        
        {STEPS.map((stepName, idx) => {
          const stepNum = idx + 1
          const isCompleted = currentStep > stepNum
          const isCurrent = currentStep === stepNum
          
          return (
            <div key={stepName} className="flex flex-col items-center gap-2 group" onClick={() => onStepClick && onStepClick(stepNum)}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-[var(--primary)] text-white' 
                    : isCurrent 
                      ? 'bg-white border-2 border-[var(--primary)] text-[var(--primary)]' 
                      : 'bg-white border-2 border-[#E2E8F0] text-[#94A3B8]'
                } ${onStepClick ? 'cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)]' : ''}`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span className={`text-[12px] font-bold ${isCurrent || isCompleted ? 'text-[var(--heading)]' : 'text-[#94A3B8]'}`}>
                {stepName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
