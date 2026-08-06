import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './shared/context/theme-context'
import { AppRouter } from './routes/AppRouter'
import { useEffect } from 'react'
import { useAuthStore } from './features/auth/store/auth.store'

function App() {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster
          position="top-right"
          richColors
          expand={false}
          duration={4000}
          toastOptions={{
            style: {
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--heading)',
              fontFamily: 'var(--font-body)',
              zIndex: 9999,
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
