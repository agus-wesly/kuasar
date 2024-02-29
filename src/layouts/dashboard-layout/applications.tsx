import { useUser } from '@/features/auth/hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'

export default function ApplicationLayout() {
  const role = useUser((state) => state.user?.role)

  return role === 'ADMIN' || role === 'FREELANCER' ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} />
  )
}
