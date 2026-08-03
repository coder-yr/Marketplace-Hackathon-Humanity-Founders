import { api } from '../../../lib/axios'
import { AuthResponse } from '../types/auth.types'

// Define the payload interfaces based on the backend schemas
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
  role: 'buyer' | 'supplier'
}

export const authApi = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data.data
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },
}
