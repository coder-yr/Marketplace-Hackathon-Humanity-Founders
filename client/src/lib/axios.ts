import axios from 'axios'
import { useAuthStore } from '../features/auth/store/auth.store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
})

// Response interceptor to handle 401 and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Call refresh endpoint directly with axios (not api) to avoid infinite loops.
        // It will automatically send the HttpOnly refreshToken cookie.
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true } // Ensure refresh cookie is sent
        )

        // Retry original request. The new HttpOnly accessToken cookie will be sent automatically.
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, clear session and force logout
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
