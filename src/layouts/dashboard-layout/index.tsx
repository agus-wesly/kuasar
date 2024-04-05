import { Button } from '@/components/ui/button'
import { useUser } from '@/features/auth/hooks/use-auth'
import { useLogout } from '@/features/auth/hooks/use-logout'
import { cn } from '@/lib/utils'
import { Link, Outlet } from 'react-router-dom'

type Props = {}

function NavbarDashboard() {
  const user = useUser((state) => state.user)
  const { logOut } = useLogout()

  if (!user) return null

  return (
    <nav className={cn('sticky top-0 bg-white/80 backdrop-blur-lg z-[4]', {})}>
      <div className="container flex justify-between items-center py-3">
        <Link to={'/dashboard'}>
          <img
            alt="kuasar-logo"
            src="https://static.wixstatic.com/media/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png/v1/fill/w_114,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png"
            className="w-[96px]"
          />
        </Link>

        <div className="flex gap-4 text-sm items-center">
          <p>{user.username}</p>
          <Button onClick={() => logOut()} variant={'destructive'}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default function DashboardPageLayout({}: Props) {
  return (
    <>
      <NavbarDashboard />
      <Outlet />
    </>
  )
}
