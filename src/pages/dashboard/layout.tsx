import { Button, buttonVariants } from '@/components/ui/button'
import { useUser } from '@/features/auth/hooks/use-auth'
import { useLogout } from '@/features/auth/hooks/use-logout'
import { cn } from '@/lib/utils'
import { AppWindow, Briefcase, HomeIcon, PieChart } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

type Props = {}

export function Component({}: Props) {
  const role = useUser((state) => state.user?.role)

  return (
    <>
      <NavbarDashboard />
      <main className="container flex flex-col md:flex-row min-h-screen py-2 gap-5 md:gap-10">
        <ul className="flex flex-row md:gap-5 md:flex-col justify-between md:justify-start text-sm">
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs md:py-8 md:text-sm',
                  {
                    'bg-muted text-black': isActive,
                  },
                )
              }
              to="/dashboard"
              end
            >
              <span>
                <HomeIcon className="text-current size-4" />
              </span>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs md:py-8 md:text-sm',
                  {
                    'bg-muted text-black': isActive,
                  },
                )
              }
              to="/dashboard/jobs"
            >
              <span>
                <Briefcase className="text-current size-4" />
              </span>
              Jobs
            </NavLink>
          </li>
          {role === 'ADMIN' || role === 'FREELANCER' ? (
            <li>
              <NavLink
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: 'ghost' }),
                    'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs md:py-8 md:text-sm',
                    {
                      'bg-muted text-black': isActive,
                    },
                  )
                }
                to="/dashboard/applications"
              >
                <span>
                  <AppWindow className="text-current size-4" />
                </span>
                Applications
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs md:py-8 md:text-sm',
                  {
                    'bg-muted text-black': isActive,
                  },
                )
              }
              to="/dashboard/projects"
            >
              <span>
                <PieChart className="text-current size-4" />
              </span>
              Projects
            </NavLink>
          </li>
        </ul>

        <Outlet />
      </main>
    </>
  )
}

function NavbarDashboard() {
  const user = useUser((state) => state.user)
  const { logOut } = useLogout()

  if (!user) return null

  return (
    <nav className={cn('sticky top-0 bg-white/80 backdrop-blur-lg z-[4]', {})}>
      <div className="container flex justify-between items-center py-3">
        <Link to={'/dashboard'}>
          <img
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
