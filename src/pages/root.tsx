import Footer from '@/components/ui/shared/footer'
import Navbar from '@/components/ui/shared/navbar'
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
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
