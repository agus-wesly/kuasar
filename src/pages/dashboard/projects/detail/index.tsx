import ErrorPage from '@/components/shared/error-page'
import { Button, buttonVariants } from '@/components/ui/button'
import { useDeleteProjectMutation } from '@/features/projects/mutation'
import { useProjectDetailQuery } from '@/features/projects/query'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatDate'
import { formatUrlLink } from '@/utils/formatUrl'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function Component() {
  const { id: projectId } = useParams()
  const { data, isLoading, isError } = useProjectDetailQuery({ id: projectId })
  const { mutateAsync, isPending: isDeleting } = useDeleteProjectMutation()
  const navigate = useNavigate()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <ErrorPage />

  const projectDetail = data?.data
  if (!projectDetail) return <p>Not found....</p>

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between">
        <Link
          to={'/dashboard/projects'}
          className="flex gap-2 items-center font-semibold text-lg md:text-xl text-primary"
        >
          <span>
            <ArrowLeft />
          </span>
          <span>All Projects</span>
        </Link>
      </div>

      <div className="p-0 mb-5 w-full  my-3 md:my-5 flex flex-col gap-5 text-sm md:text-base">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-xl font-bold capitalize">
            {projectDetail.title}
          </p>

          <div className="flex gap-4 items-center">
            <Link
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'flex gap-2 items-center',
              )}
              to={'update'}
            >
              <Pencil className="size-4" />
              Edit
            </Link>

            <Button
              disabled={isDeleting}
              onClick={async () => {
                await mutateAsync(Number(projectId))
                navigate('/dashboard/projects')
              }}
              variant={'outline'}
              className="border-destructive text-destructive flex gap-2 items-center"
            >
              <Trash2 className="size-4" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>

        {projectDetail.image ? (
          <div className="w-full">
            <img
              src={formatUrlLink(projectDetail.image) ?? undefined}
              className=""
            />
          </div>
        ) : null}

        <div className="aspect-video w-full">
          <video
            preload="none"
            controls
            autoPlay={false}
            loop={false}
            playsInline={true}
            src={formatUrlLink(projectDetail.video) ?? undefined}
            muted
            crossOrigin="anonymous"
            className="size-full"
          ></video>
        </div>

        <div className="text-neutral-600 space-y-2">
          <p className="text-neutral-800 font-semibold md:text-lg">
            Created by : {projectDetail.created_by}
          </p>

          <p className="font-semibold text-xs md:text-sm text-primary">
            {formatDate(projectDetail.createdAt)}
          </p>

          <p>
            {projectDetail.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Necessitatibus voluptatibus voluptatem laboriosam
            harum accusantium sequi et laborum quos. Animi quos ipsam assumenda
            culpa beatae nesciunt laboriosam! Cumque delectus voluptates
            ratione!
          </p>
        </div>
      </div>
    </div>
  )
}
