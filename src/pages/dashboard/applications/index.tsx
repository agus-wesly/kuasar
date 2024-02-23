import { buttonVariants } from '@/components/ui/button'
import { useApplicationsQuery } from '@/features/applications/query'
import { Application } from '@/features/applications/types/application'
import { useUser } from '@/features/auth/hooks/use-auth'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

type Props = {}

export default function DashboardApplicationsPage({}: Props) {
  const { data, isLoading, isError } = useApplicationsQuery()
  const role = useUser((state) => state.user?.role)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  const applications = data?.data

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            Applications
          </h3>
          <p className="text-sm md:text-base mb-3 text-muted-foreground">
            Applications's overview
          </p>
        </div>

        {role === 'FREELANCER' && (
          <Link to={'create'} className={cn(buttonVariants({}))}>
            Create
          </Link>
        )}
      </div>

      {!applications?.length ? (
        <p>No application</p>
      ) : (
        <div className="border rounded-xl h-fit flex-col max-h-full overflow-y-scroll grid grid-cols-1 md:grid-cols-2 md:max-h-[80vh]">
          {applications.map((item) => (
            <ApplicationItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              AR_tools={item.AR_tools}
              email={item.email}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ApplicationItemCard(
  props: Pick<Application, 'name' | 'address' | 'AR_tools' | 'email' | 'id'>
) {
  return (
    <div className="text-xs md:text-sm p-4 space-y-2 border">
      <p className="capitalize text-lg md:text-xl text-primary font-semibold">
        {props.name}
      </p>
      <p className="text-sm font-medium">{props.email}</p>
      <p>{props.address}</p>
      <p>AR Skill : {props.AR_tools}</p>

      <Link
        className="inline-block text-primary font-semibold"
        to={`${props.id}`}
      >
        See more...
      </Link>
    </div>
  )
}
