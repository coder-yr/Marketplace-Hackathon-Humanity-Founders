import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { HomePage } from '@/features/home/pages/HomePage'
import { NotFoundPage } from '@/shared/pages/NotFoundPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
