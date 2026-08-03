import { userRepository } from '../repositories/user.repository'
import { RegisterInput, LoginInput } from '../validators/auth.validator'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.util'
import { AppError } from '../middleware/errorHandler'

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new AppError('User with this email already exists', 400)
    }

    const user = await userRepository.create(data)
    
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return { user, accessToken, refreshToken }
  }

  async login(data: LoginInput) {
    // We need the password to compare
    const user = await userRepository.findByEmail(data.email, true)
    
    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    if (!user.isActive) {
      throw new AppError('Account is disabled. Please contact support.', 403)
    }

    const isMatch = await user.comparePassword(data.password)
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401)
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    // Remove password from returned user object
    const userObj = user.toJSON()

    return { user: userObj, accessToken, refreshToken }
  }

  async refreshTokens(token: string) {
    try {
      const payload = verifyRefreshToken(token)
      
      const user = await userRepository.findById(payload.id)
      if (!user || !user.isActive) {
        throw new AppError('Invalid or expired refresh token', 401)
      }

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      return { user: user.toJSON(), accessToken, refreshToken }
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 401)
    }
  }
}

export const authService = new AuthService()
