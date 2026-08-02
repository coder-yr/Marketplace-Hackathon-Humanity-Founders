import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-surface-3 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">T</span>
            </div>
            <span className="font-display font-bold text-lg text-text-primary">
              TextileHub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Home
            </a>
            <a href="/products" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Products
            </a>
            <a href="/suppliers" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Suppliers
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-surface-3 bg-surface-2 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted text-sm">
          © 2026 TextileHub. Built for the Humanity Founders Hackathon.
        </div>
      </footer>
    </div>
  )
}
