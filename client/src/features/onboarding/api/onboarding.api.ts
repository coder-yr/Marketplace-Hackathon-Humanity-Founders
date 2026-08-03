import { api } from '@/lib/axios'

export interface ProfileDraftData {
  [key: string]: any
}

export const onboardingApi = {
  saveBuyerDraft: async (data: ProfileDraftData) => {
    const response = await api.put('/profiles/buyer/draft', data)
    return response.data
  },
  saveSupplierDraft: async (data: ProfileDraftData) => {
    const response = await api.put('/profiles/supplier/draft', data)
    return response.data
  },
  completeOnboarding: async () => {
    const response = await api.post('/profiles/complete')
    return response.data
  },
  getMyProfile: async () => {
    const response = await api.get('/profiles/me')
    return response.data
  },
}
