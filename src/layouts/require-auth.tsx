import { useUser } from '@/features/auth/hooks/use-auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

type Props = {}

export default function RequireUnAuth({}: Props) {
  const user = useUser((val) => val.user)
  const location = useLocation()

  if (!user)
    return <Navigate to={{ pathname: '/login' }} state={{ from: location }} />

  return <Outlet />
}
