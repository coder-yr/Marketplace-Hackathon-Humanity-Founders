import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { IUser } from '../models/user.model'

export interface JwtPayload {
  id: string
  role: string
}

export const generateAccessToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: user._id as unknown as string,
    role: user.role,
  }
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  })
}

export const generateRefreshToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: user._id as unknown as string,
    role: user.role,
  }
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES as jwt.SignOptions['expiresIn'],
  })
}

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload
}

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload
}
