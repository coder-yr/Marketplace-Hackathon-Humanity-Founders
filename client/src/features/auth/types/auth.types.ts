export type UserRole = 'buyer' | 'supplier'

export interface User {
  _id: string
  fullName: string
  email: string
  role: UserRole
  isActive: boolean
  isOnboarded: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
}
