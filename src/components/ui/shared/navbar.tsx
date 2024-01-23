import { HambergerMenu } from 'iconsax-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { buttonVariants } from '../button'
import { cn } from '@/lib/utils'

import useScroll from '@/hooks/use-scroll'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUser } from '@/features/auth/use-auth'

const MENU_ITEMS = [
  { label: 'For Business', href: '/for-business' },
  { label: 'For Creators', href: '/' },
  { label: 'Reach Beyond Borders', href: '/' },
  { label: 'Page Explore More', href: '/' },
] as const

const MENU_ITEMS_DESKTOP = [
  { label: 'For Business', href: '/for-business' },
  { label: 'For Creators', href: '/' },
  { label: 'Schedule a Meeting', href: '/' },
] as const

type Props = {}

export default function Navbar({}: Props) {
  const scrolled = useScroll(20)
  const location = useLocation()
  const user = useUser((state) => state.user)

  return (
    <nav
      className={cn('sticky top-0 bg-white/80 backdrop-blur-lg z-[4]', {
        'border-b': scrolled,
      })}
    >
      <div className="container flex justify-between items-center py-3">
        <Link to={'/'}>
          <img
            src="https://static.wixstatic.com/media/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png/v1/fill/w_114,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9b385a_fe85acd294524651a9c73760dbaf3d31~mv2.png"
            className="w-[96px]"
          />
        </Link>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <HambergerMenu size="24" color="purple" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mt-6">
                <SheetTitle className="text-2xl">MENU</SheetTitle>
              </SheetHeader>
              <div className="pt-10 px-4 flex flex-col gap-2 text-sm text-neutral-900/80">
                {MENU_ITEMS.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <NavLink
                      className={`py-2 border-b ${
                        location.pathname === item.href
                          ? 'text-black font-semibold'
                          : ''
                      }`}
                      to={item.href}
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}

                {!user ? (
                  <>
                    <SheetClose asChild>
                      <NavLink
                        className="py-2 mt-5 text-center text-primary font-bold"
                        to={'/login'}
                      >
                        Login
                      </NavLink>
                    </SheetClose>

                    <SheetClose asChild>
                      <NavLink
                        className="py-2 text-center font-semibold bg-primary text-background rounded-full"
                        to={'/register'}
                      >
                        Register
                      </NavLink>
                    </SheetClose>
                  </>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>

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
                  }
                )
              }
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <NavLink
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: 'link',
                }),
                'rounded-full text-sm text-neutral-600 hover:text-neutral-900 hover:no-underline',
                {
                  'text-primary font-semibold hover:text-primary': isActive,
                }
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
                }
              )
            }
            to={'/register'}
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
