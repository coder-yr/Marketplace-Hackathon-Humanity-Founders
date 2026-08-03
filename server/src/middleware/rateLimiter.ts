import rateLimit from 'express-rate-limit'

// Limit for sensitive routes like login and register
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs for auth routes
  message: {
    success: false,
    error: {
      message: 'Too many authentication attempts. Please try again later.',
    },
  },
  standardHeaders: true, 
  legacyHeaders: false, 
})
