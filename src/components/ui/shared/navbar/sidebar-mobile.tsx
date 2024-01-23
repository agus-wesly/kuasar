import { HambergerMenu } from 'iconsax-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { NavLink, useLocation } from 'react-router-dom'
import { useUser } from '@/features/auth/use-auth'
import { Button } from '../../button'

const MENU_ITEMS = [
  { label: 'For Business', href: '/for-business' },
  { label: 'For Creators', href: '/' },
  { label: 'Reach Beyond Borders', href: '/' },
  { label: 'Page Explore More', href: '/' },
] as const

export default function SidebarMobile() {
  const location = useLocation()
  const user = useUser((state) => state.user)

  return (
    <div className="md:hidden">
      <AlertDialog>
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
              ) : (
                <AlertDialogTrigger>
                  <div className="flex flex-col mt-5 gap-3">
                    <p className="text-center">Username</p>
                    <Button
                      className="rounded-full"
                      size={'sm'}
                      variant={'destructive'}
                    >
                      Signout
                    </Button>
                  </div>
                </AlertDialogTrigger>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialogContent className="max-w-sm rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to signout ?</AlertDialogTitle>
            <AlertDialogDescription>
              You need to sign in back later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none text-foreground">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-700 hover:bg-red-700">
              Signout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}