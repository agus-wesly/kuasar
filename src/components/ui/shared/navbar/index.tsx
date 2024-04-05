import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import useScroll from '@/hooks/use-scroll'
import { Link, NavLink } from 'react-router-dom'
import { useUser } from '@/features/auth/hooks/use-auth'
import { useShallow } from 'zustand/react/shallow'

import { Suspense, lazy } from 'react'
const SidebarMobile = lazy(() => import('./sidebar-mobile'))
const UserDropdown = lazy(() => import('./user-dropdown'))

const MENU_ITEMS_DESKTOP = [
  { label: 'For Business', href: '/for-business' },
  { label: 'For Creators', href: '/for-creator' },
] as const

export default function NavbarLandingPage() {
  const scrolled = useScroll(20)
  const user = useUser(useShallow((state) => state.user))

  return (
    <nav
      className={cn('sticky top-0 bg-white/80 backdrop-blur-lg z-[4]', {
        'border-b': scrolled,
      })}
    >
      <div className="container flex justify-between items-center py-3">
        <Link to={'/'}>
          <img
            alt="kuasar-logo"
            src="https://static.wixstatic.com/media/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png/v1/fill/w_114,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png"
            className="w-[96px]"
          />
        </Link>

        <Suspense fallback={null}>
          <SidebarMobile />
        </Suspense>

        <div className="hidden md:flex gap-4">
          {MENU_ITEMS_DESKTOP.map((item) => (
            <NavLink
              key={item.label}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: 'link',
                  }),
                  'rounded-full text-sm text-neutral-600 hover:text-neutral-900 hover:no-underline',
                  {
                    'text-primary font-semibold hover:text-primary': isActive,
                  },
                )
              }
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            target="_blank"
            className={cn(
              buttonVariants({
                variant: 'link',
              }),
              'rounded-full text-sm text-neutral-600 hover:text-neutral-900 hover:no-underline',
            )}
            href="https://calendly.com/kuasar-michaela/30min"
          >
            Schedule a meeting
          </a>
        </div>

        <div className="hidden md:flex gap-4">
          {user ? (
            <Suspense fallback={null}>
              <UserDropdown />
            </Suspense>
          ) : (
            <NavLinkAuthentication />
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLinkAuthentication() {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: 'link',
            }),
            'rounded-full text-sm text-neutral-600 hover:text-neutral-900 hover:no-underline',
            {
              'text-primary font-semibold hover:text-primary': isActive,
            },
          )
        }
        to={'/login'}
      >
        Login
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: 'link',
            }),
            'rounded-full text-sm text-neutral-600 hover:text-neutral-900 hover:no-underline',
            {
              'text-primary font-semibold hover:text-primary': isActive,
            },
          )
        }
        to={'/register'}
      >
        Register
      </NavLink>
    </>
  )
}
