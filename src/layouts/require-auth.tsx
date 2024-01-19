import { useAuth } from '@/features/auth/use-auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

type Props = {}

export default function RequireUnAuth({}: Props) {
  const user = useAuth((state) => state.user)
  const location = useLocation()

  if (!user)
    return <Navigate to={{ pathname: '/login' }} state={{ from: location }} />

  return <Outlet />
}
