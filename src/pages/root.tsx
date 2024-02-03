import Footer from '@/components/ui/shared/footer'
import { useUser } from '@/features/auth/hooks/use-auth'
import useRefreshToken from '@/features/auth/hooks/use-refresh-token'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

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
