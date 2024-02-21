import Footer from '@/components/ui/shared/footer'
import { useUser } from '@/features/auth/hooks/use-auth'
import useRefreshToken from '@/features/auth/hooks/use-refresh-token'
import { AlertTriangle, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, ScrollRestoration } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function RootLayout() {
  const { refresh } = useRefreshToken()
  const user = useUser((state) => state.user)
  const [isLoadingApp, setIsLoadingApp] = useState(true)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
      } finally {
        setIsLoadingApp(false)
      }
    }
    !user ? verifyRefreshToken() : setIsLoadingApp(false)
  }, [])

  return (
    <>
      {isLoadingApp ? <LoadingAppComponent /> : <Outlet />}
      <Toaster />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname
        }}
      />
      <Footer />
    </>
  )
}

function LoadingAppComponent() {
  return (
    <div className="min-h-[80vh] md:min-h-screen container flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}

export default RootLayout

export function ErrorBoundary() {
  return (
    <main className="container min-h-screen flex justify-center pt-36">
      <div className="flex flex-col items-center">
        <AlertTriangle className="text-neutral-800 size-16" />
        <h1 className="text-xl md:text-3xl font-semibold text-foreground mt-2">
          Oopsss....
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Application error! Please try again later
        </p>

        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'mt-5 rounded-full'
          )}
          to={'/'}
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
