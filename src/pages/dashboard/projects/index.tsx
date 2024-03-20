import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useInfiniteProjectQuery } from '@/features/projects/query'
import { cn } from '@/lib/utils'
import { Info, MoreVertical, Pencil, PlusIcon, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Project } from '@/features/projects/types/project'
import InfiniteScroll from '@/components/infinite-scroll'
import { useDeleteProjectMutation } from '@/features/projects/mutation'
import { useUser } from '@/features/auth/hooks/use-auth'

type Props = {}

export function Component({}: Props) {
  const role = useUser((state) => state.user?.role)

  return (
    <div className="max-h-full md:max-h-[80vh] w-full">
      <div className="flex items-center justify-between w-full">
        <div>
          <h3 className="text-lg font-semibold md:text-2xl text-primary">
            Projects
          </h3>
        </div>

        {role === 'ADMIN' && (
          <Link
            to={'create'}
            className={cn(
              buttonVariants({
                variant: 'outline',
              }),
              'gap-2 px-2'
            )}
          >
            Create project
            <span>
              <PlusIcon />
            </span>
          </Link>
        )}
      </div>
      <ProjectList />
    </div>
  )
}

function ProjectList() {
  const query = useInfiniteProjectQuery()

  const projects = query.data?.pages?.flatMap((item) => item.data) ?? []

  return (
    <div className="grid flex-col max-h-full grid-cols-1 gap-10 my-6 overflow-hidden overflow-y-scroll h-fit md:pb-10 sm:grid-cols-2 md:grid-cols-3 place-items-center md:place-items-center">
      {query.isLoading ? (
        Array(8)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className="w-full aspect-[9/10] rounded-lg shadow-md"
            />
          ))
      ) : projects.length > 0 ? (
        <InfiniteScroll query={query}>
          {(response) =>
            response.data.map((proj) => (
              <ProjectItemCard key={proj.id} {...proj} />
            ))
          }
        </InfiniteScroll>
      ) : null}
    </div>
  )
}

function ProjectItemCard(props: Project) {
  const { mutate } = useDeleteProjectMutation()
  const role = useUser((state) => state.user?.role)

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md max-w-60 md:max-w-none">
      <div className="flex w-full bg-purple-100 aspect-[9/10] items-center justify-center p-0">
        {/* PLAYER HERE */}
        <video
          preload="none"
          controls
          loop={false}
          src={props.video ?? undefined}
          muted
          crossOrigin="anonymous"
          className="w-full h-full"
        ></video>
      </div>
      <div className="flex items-center justify-between p-4 text-xs text-center">
        <p className="line-clamp-2">Created by {props.created_by}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center gap-3 text-xs cursor-pointer"
                to={`${props.id}`}
              >
                <Info className="size-4" />
                Detail
              </Link>
            </DropdownMenuItem>
            {role === 'ADMIN' && (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    className="flex items-center gap-3 text-xs cursor-pointer"
                    to={`${props.id}/update`}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => mutate(props.id)}
                  className="flex items-center gap-3 text-xs cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
