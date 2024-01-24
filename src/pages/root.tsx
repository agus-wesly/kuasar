import Footer from '@/components/ui/shared/footer'
import Navbar from '@/components/ui/shared/navbar'
import { useAccessToken, useUser } from '@/features/auth/hooks/use-auth'
import useRefreshToken from '@/features/auth/hooks/use-refresh-token'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

function RootLayout() {
  const { refresh } = useRefreshToken()
  const accessToken = useAccessToken((val) => val.accessToken)
  const user = useUser((val) => val.user)
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
    !accessToken || !user ? verifyRefreshToken() : setIsLoadingApp(false)
  }, [])

  return (
    <>
      <Navbar />
      {isLoadingApp ? <LoadingAppComponent /> : <Outlet />}
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
    <div className="min-h-[80vh] container flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}

export default RootLayout
