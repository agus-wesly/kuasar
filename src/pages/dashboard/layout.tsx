import { buttonVariants } from '@/components/ui/button'
import { useUser } from '@/features/auth/hooks/use-auth'
import { cn } from '@/lib/utils'
import { AppWindow, Briefcase, HomeIcon, PieChart } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

type Props = {}

export default function Dashboard({}: Props) {
  const role = useUser((state) => state.user?.role)

  return (
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
                }
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
                }
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
                  }
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
                }
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
  )
}
