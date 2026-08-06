import { create } from 'zustand'
import { Product } from '@/features/products/types/products.types'
import { productsApi } from '@/features/products/api/products.api'

interface WizardState {
  currentStep: number
  productId: string | null
  draft: Partial<Product>
  isSaving: boolean
  lastSavedAt: Date | null
  
  // Actions
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateDraft: (updates: Partial<Product>) => void
  saveDraft: () => Promise<void>
  setProductId: (id: string | null) => void
  reset: () => void
}

const initialDraft: Partial<Product> = {
  title: '',
  shortDescription: '',
  description: '',
  category: undefined,
  subCategory: '',
  fabricType: '',
  images: [],
  priceRange: { min: 0, max: 0, currency: 'USD', unit: 'meter' },
  moq: { value: 1, unit: 'meters' },
  leadTime: '',
  stockStatus: 'made_to_order',
  variants: [],
  certifications: [],
  tags: [],
  specifications: {},
  status: 'draft',
}

export const useProductWizardStore = create<WizardState>((set, get) => ({
  currentStep: 1,
  productId: null,
  draft: { ...initialDraft },
  isSaving: false,
  lastSavedAt: null,

  setStep: (step: number) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep, saveDraft } = get()
    if (currentStep < 6) {
      set({ currentStep: currentStep + 1 })
      saveDraft() // Autosave on step change
    }
  },
  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 })
    }
  },
  updateDraft: (updates) => {
    set((state) => ({ draft: { ...state.draft, ...updates } }))
  },
  saveDraft: async () => {
    const { draft, productId, isSaving } = get()
    if (isSaving || !draft.title) return // Require at least a title to save a draft

    set({ isSaving: true })
    try {
      // Clean draft payload to remove empty strings/arrays so Zod partial() treats them as undefined 
      // instead of failing on .min() constraints
      const payload: any = { ...draft, status: 'draft' }
      if (payload.title === '') delete payload.title
      if (payload.shortDescription === '') delete payload.shortDescription
      if (payload.description === '') delete payload.description
      if (payload.fabricType === '') delete payload.fabricType
      if (payload.category === '') delete payload.category
      if (payload.leadTime === '') delete payload.leadTime
      if (Array.isArray(payload.images) && payload.images.length === 0) delete payload.images

      if (productId) {
        // Update existing
        await productsApi.updateProduct(productId, payload)
        set({ lastSavedAt: new Date() })
      } else {
        // Create new
        const res = await productsApi.createProduct(payload)
        set({ productId: res.data._id, lastSavedAt: new Date() })
      }
    } catch (error) {
      console.error('Failed to save draft:', error)
    } finally {
      set({ isSaving: false })
    }
  },
  setProductId: (id) => set({ productId: id }),
  reset: () => set({
    currentStep: 1,
    productId: null,
    draft: { ...initialDraft },
    isSaving: false,
    lastSavedAt: null,
  })
}))
