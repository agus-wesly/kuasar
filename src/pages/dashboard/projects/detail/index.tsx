import ErrorPage from '@/components/shared/error-page'
import { Button, buttonVariants } from '@/components/ui/button'
import { useDeleteProjectMutation } from '@/features/projects/mutation'
import { useProjectDetailQuery } from '@/features/projects/query'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatDate'
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
          className="flex items-center gap-2 text-lg font-semibold md:text-xl text-primary"
        >
          <span>
            <ArrowLeft />
          </span>
          <span>All Projects</span>
        </Link>
      </div>

      <div className="flex flex-col w-full gap-5 p-0 my-3 mb-5 text-sm md:my-5 md:text-base">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold capitalize md:text-xl">
            {projectDetail.title}
          </p>

          <div className="flex items-center gap-4">
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
              className="flex items-center gap-2 border-destructive text-destructive"
            >
              <Trash2 className="size-4" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>

        {projectDetail.image ? (
          <div className="w-full">
            <img src={projectDetail.image ?? undefined} className="" />
          </div>
        ) : null}

        <div className="w-full aspect-video">
          <video
            preload="none"
            controls
            autoPlay={false}
            loop={false}
            playsInline={true}
            src={projectDetail.video ?? undefined}
            muted
            crossOrigin="anonymous"
            className="size-full"
          ></video>
        </div>

        <div className="space-y-2 text-neutral-600">
          <p className="font-semibold text-neutral-800 md:text-lg">
            Created by : {projectDetail.created_by}
          </p>

          <p className="text-xs font-semibold md:text-sm text-primary">
            {formatDate(projectDetail.createdAt)}
          </p>

          <p>{projectDetail.description} </p>
        </div>
      </div>
    </div>
  )
}
