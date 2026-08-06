import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { ProcurementWorkspace } from '../pages/ProcurementWorkspace'
import { RfqWorkspace } from '../pages/RfqWorkspace'
import { ShipmentWorkspace } from '../pages/ShipmentWorkspace'
import { AnalyticsDashboard } from '../pages/AnalyticsDashboard'
import { ActivityFeed } from '../pages/ActivityFeed'
import { BuyerOverview } from '../pages/BuyerOverview'
import { SupplierOverview } from '../pages/SupplierOverview'
import { SettingsPage } from '../pages/SettingsPage'
import { ProductsPage } from '../pages/ProductsPage'
import { AddProductWizard } from '../pages/AddProductWizard'

export function DashboardRouter() {
  const { user } = useAuthStore()
  
  if (!user) return <Navigate to="/login" />

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
        
        {/* We can route to Buyer or Supplier overview based on role, but we'll default to BuyerOverview for now to show the nice new UI */}
        <Route path="/overview" element={user.role === 'supplier' ? <SupplierOverview /> : <BuyerOverview />} />
        
        <Route path="/procurement" element={<ProcurementWorkspace />} />
        <Route path="/rfqs/:id" element={<RfqWorkspace />} />
        <Route path="/orders/:id" element={<ShipmentWorkspace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<AddProductWizard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/activity" element={<ActivityFeed />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
      </Route>
    </Routes>
  )
}
