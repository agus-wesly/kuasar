import { buttonVariants } from '@/components/ui/button'
// import { useApplicationsQuery } from '@/features/applications/query'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

type Props = {}

export default function DashboardAdminApplicationsPage({}: Props) {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            Applications
          </h3>
          <p className="text-sm md:text-base mb-3 text-muted-foreground">
            Applications's overview
          </p>
        </div>

        <Link to={'create'} className={cn(buttonVariants({}))}>
          Create
        </Link>
      </div>

      <ApplicationList />
    </div>
  )
}

function ApplicationList() {
  // const { data, isLoading } = useApplicationsQuery()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      Application List here
    </div>
  )
}
