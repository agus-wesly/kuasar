import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useJobTypesQuery, useJobsQuery } from '@/features/jobs/query'
import { Job } from '@/features/jobs/types/job'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatDate'
import { PencilLine, PlusIcon, SearchIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
import { useDeleteJobMutation } from '@/features/jobs/mutation'

type Props = {}

export default function DashboardAdminJobsPage({}: Props) {
  const navigate = useNavigate()
  const [searchParam] = useSearchParams()
  const searchQuery = searchParam.get('q') ?? ''

  return (
    <div className="max-h-full md:max-h-[80vh] w-full">
      <div className="w-full flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            Jobs
          </h3>
        </div>

        <Link
          to={'create'}
          className={cn(
            buttonVariants({
              variant: 'outline',
            }),
            'gap-2 px-2'
          )}
        >
          Create job
          <span>
            <PlusIcon />
          </span>
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate(`?q=${e.currentTarget.q.value}`)
        }}
        className="my-3 w-full flex items-center justify-between border rounded-lg p-2 gap-2 text-xs md:text-sm"
      >
        <input
          type="text"
          name="q"
          id="search"
          className="w-full flex-1 outline-none"
          placeholder="Search job..."
          key={searchQuery}
          defaultValue={searchQuery}
        />

        <button type="submit">
          <SearchIcon className="size-4" />
        </button>
      </form>

      <JobList />
    </div>
  )
}

function LoadingJobSkeleton() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="border rounded-xl space-y-4 p-4 h-fit max-h-full mb-2"
        >
          <Skeleton className="w-[80%] h-4" />
          <Skeleton className="w-[30%] h-4" />
          <Skeleton className="w-[30%] h-4" />
          <Skeleton className="w-[50%] h-4" />
        </div>
      ))}
    </>
  )
}

function JobList() {
  const { data: dataJobs, isLoading: isLoadingJob } = useJobsQuery()
  const { data: dataJobTypes, isLoading: isLoadingJobType } = useJobTypesQuery()
  const { mutateAsync, isPending: isDeletingJob } = useDeleteJobMutation()

  const [searchParam] = useSearchParams()

  const [activeDialogDeleteId, setActiveDialogDeleteId] = useState<
    number | null
  >(null)

  if (isLoadingJob || isLoadingJobType) return <LoadingJobSkeleton />

  let jobs = dataJobs?.data ?? []
  const jobTypes = dataJobTypes?.data ?? []

  const searchQuery = (searchParam.get('q') ?? '').toLowerCase()
  if (jobs.length) {
    jobs = jobs.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
    )
  }

  function showDialogDelete(id: number) {
    setActiveDialogDeleteId(id)
  }

  if (!jobs.length) return <p className="my-5 font-semibold">No job found.</p>

  return (
    <div className="border rounded-xl divide-y-[1px] h-fit flex flex-col gap-5 max-h-full overflow-y-scroll md:pb-20">
      {[...jobs].reverse().map((job) => {
        const jobType =
          jobTypes.find((item) => item.id === job.type_id)?.type || ''
        return (
          <JobItemCard
            key={job.id}
            {...job}
            jobType={jobType}
            onClickDeleteButton={showDialogDelete}
          />
        )
      })}

      {/* DELETE ALERT DIALOG */}
      <AlertDialog
        open={activeDialogDeleteId !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActiveDialogDeleteId(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this job ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the job
              from our servers.
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
              {isDeletingJob ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function JobItemCard(
  props: Job & { jobType: string; onClickDeleteButton: (id: number) => void }
) {
  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-primary md:text-lg font-semibold">{props.title}</p>
        <div className="space-x-2">
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'text-xs md:text-sm py-2 h-min border-muted'
            )}
            to={`/dashboard/jobs/update/${props.id}`}
          >
            <PencilLine className="size-4 md:size-5" />
          </Link>
          <Button
            onClick={() => props.onClickDeleteButton(props.id)}
            variant={'destructive'}
            className={cn('text-xs md:text-sm py-2 h-min border-muted')}
          >
            <Trash2 className="size-4 md:size-5" />
          </Button>
        </div>
      </div>

      <div className="text-xs md:text-sm text-muted-foreground flex flex-col gap-2">
        <p className="line-clamp-3">
          {props.description} Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Assumenda ipsum provident reprehenderit, quis
          soluta, dolore accusantium fugit laboriosam a dolores iusto alias
          excepturi nostrum, accusamus ratione. Nostrum voluptates ipsam
          recusandae doloremque quis vitae odio quae odit, dolorem voluptatum
          mollitia repudiandae et laboriosam, repellendus nesciunt est possimus
          incidunt. Tempore, odit doloremque.{' '}
        </p>

        <p className="text-xs md:text-sm text-neutral-900">
          Deadline : {formatDate(props.deadline)}
        </p>

        <p className="text-xs md:text-sm text-neutral-900 font-semibold">
          {props.jobType}
        </p>

        <Link className="text-primary font-bold w-fit" to={`${props.id}`}>
          See more...
        </Link>
      </div>
    </div>
  )
}
