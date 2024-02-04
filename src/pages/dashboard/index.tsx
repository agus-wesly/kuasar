import { useUser } from '@/features/auth/hooks/use-auth'
import DashboardAdmin from './dashboard-admin/layout'
import DashboardFreelancerIndexPage from './dashboard-freelancer'
import DashboardAdminIndexPage from './dashboard-admin'
import DashboardFreelancer from './dashboard-freelancer/layout'
import DashboardAdminProjectsPage from './dashboard-admin/projects'
import DashboardAdminApplicationsPage from './dashboard-admin/applications'
import DashboardAdminJobsPage from './dashboard-admin/jobs'

type Props = {}

export default function DashboardPage({}: Props) {
  const role = useUser((state) => state.user?.role)
  if (!role) return null

  if (role === 'ADMIN') return <DashboardAdmin />
  if (role === 'FREELANCER') return <DashboardFreelancer />

  return null
}

export function DashboardIndexPage() {
  const role = useUser((state) => state.user?.role)
  if (!role) return null

  if (role === 'ADMIN') return <DashboardAdminIndexPage />
  if (role === 'FREELANCER') return <DashboardFreelancerIndexPage />

  return null
}

export function DashboardProjectsPage() {
  const role = useUser((state) => state.user?.role)
  if (!role) return null

  if (role === 'ADMIN') return <DashboardAdminProjectsPage />
  // if (role === 'FREELANCER') return <DashboardFreelancerIndexPage />

  return null
}

export function DashboardApplicationsPage() {
  const role = useUser((state) => state.user?.role)
  if (!role) return null

  if (role === 'ADMIN') return <DashboardAdminApplicationsPage />
  // if (role === 'FREELANCER') return <DashboardFreelancerIndexPage />

  return null
}

export function DashboardJobsPage() {
  const role = useUser((state) => state.user?.role)
  if (!role) return null

  if (role === 'ADMIN') return <DashboardAdminJobsPage />
  // if (role === 'FREELANCER') return <DashboardFreelancerIndexPage />

  return null
}
