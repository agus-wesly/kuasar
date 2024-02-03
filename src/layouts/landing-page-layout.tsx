import NavbarLandingPage from '@/components/ui/shared/navbar'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function LandingPageLayout({}: Props) {
  return (
    <>
      <NavbarLandingPage />
      <Outlet />
    </>
  )
}
