import Footer from '@/components/ui/shared/footer'
import Navbar from '@/components/ui/shared/navbar'
import { useAccessToken, useUser } from '@/features/auth/use-auth'
import useRefreshToken from '@/features/auth/use-refresh-token'
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
      {isLoadingApp ? <p>Loading...</p> : <Outlet />}
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname
        }}
      />
      <Footer />
    </>
  )
}

export default RootLayout
