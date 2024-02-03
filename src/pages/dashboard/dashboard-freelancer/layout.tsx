import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Briefcase, HomeIcon, PieChart } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

type Props = {}

export default function DashboardFreelancer({}: Props) {
  return (
    <main className="container min-h-screen py-2">
      <ul className="flex justify-between text-sm">
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: 'ghost' }),
                'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs',
                {
                  'bg-muted': isActive,
                }
              )
            }
            to="/dashboard"
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
                'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs',
                {
                  'bg-muted': isActive,
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
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: 'ghost' }),
                'flex flex-col justify-center hover:bg-neutral-200 text-neutral-700 hover:text-foreground py-6 text-xs',
                {
                  'bg-muted': isActive,
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
      </ul>

      <Outlet />
    </main>
  )
}
