import { buttonVariants } from '@/components/ui/button'
import { useApplicationsQuery } from '@/features/applications/query'
import { Application } from '@/features/applications/types/application'
import { useUser } from '@/features/auth/hooks/use-auth'
import { useState } from 'react'
import { useDeleteApplicationMutation } from '@/features/applications/mutation'
import { cn } from '@/lib/utils'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function Component() {
  const { data, isLoading, isError } = useApplicationsQuery()
  const { mutateAsync, isPending: isDeletingApplication } =
    useDeleteApplicationMutation()
  const [activeDialogDeleteId, setActiveDialogDeleteId] = useState<
    number | null
  >(null)
  const role = useUser((state) => state.user?.role)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  function showDialogDelete(id: number) {
    setActiveDialogDeleteId(id)
  }

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
              onClickDeleteButton={showDialogDelete}
            />
          ))}
        </div>
      )}

      <AlertDialog
        open={activeDialogDeleteId !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActiveDialogDeleteId(null)
        }}
      >
        <AlertDialogContent className="w-[80%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              application from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (activeDialogDeleteId === null) return
                await mutateAsync(activeDialogDeleteId)
                setActiveDialogDeleteId(null)
              }}
              className="bg-red-800 hover:bg-red-800"
            >
              {isDeletingApplication ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function ApplicationItemCard(
  props: Pick<Application, 'name' | 'address' | 'AR_tools' | 'email' | 'id'> & {
    onClickDeleteButton: (id: number) => void
  }
) {
  const role = useUser((state) => state.user?.role)

  return (
    <div className="text-xs md:text-sm p-4 space-y-2 border">
      <div className="flex justify-between items-center">
        <p className="capitalize text-lg md:text-xl text-primary font-semibold">
          {props.name}
        </p>

        {role === 'ADMIN' ? (
          <div className="space-x-3">
            <Link className="inline-block" to={`${props.id}/update`}>
              <PencilIcon className="size-4 text-primary" />
            </Link>
            <button onClick={() => props.onClickDeleteButton(Number(props.id))}>
              <TrashIcon className="size-4 text-destructive" />
            </button>
          </div>
        ) : null}
      </div>
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
