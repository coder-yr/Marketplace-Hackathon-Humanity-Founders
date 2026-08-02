export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="animate-fade-in">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium mb-6">
          🚀 Phase 0 — Foundation Complete
        </span>
        <h1 className="text-5xl font-display font-bold gradient-text mb-6">
          B2B Textile Marketplace
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          Connecting textile suppliers and buyers worldwide. Powered by AI for smarter discovery.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-lg gradient-brand text-white font-semibold hover:opacity-90 transition-opacity">
            Explore Products
          </button>
          <button className="px-6 py-3 rounded-lg surface-card text-text-primary font-semibold hover:bg-surface-3 transition-colors">
            List Your Products
          </button>
        </div>
      </div>
    </div>
  )
}
