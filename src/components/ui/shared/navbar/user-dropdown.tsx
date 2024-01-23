import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

import { ChevronDown, LogOut } from 'lucide-react'

export default function UserDropdown() {
  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex gap-2 items-center text-muted-foreground font-semibold text-sm">
              <span className="flex-1">User 1</span>
              <span>
                <ChevronDown className="size-4" />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialogTrigger asChild>
              <DropdownMenuItem asChild>
                <button className="flex gap-2 w-full cursor-pointer">
                  <span>
                    <LogOut width={16} height={16} />
                  </span>
                  <span>Sign Out</span>
                </button>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
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
            <AlertDialogAction className="bg-red-700">
              Signout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
