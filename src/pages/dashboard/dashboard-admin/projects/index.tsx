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
import { formatUrlLink } from '@/utils/formatUrl'

type Props = {}

export default function DashboardAdminProjectsPage({}: Props) {
  return (
    <div className="max-h-full md:max-h-[80vh] w-full">
      <div className="w-full flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            Projects
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
          Create project
          <span>
            <PlusIcon />
          </span>
        </Link>
      </div>
      <ProjectList />
    </div>
  )
}

function ProjectList() {
  const query = useInfiniteProjectQuery()

  const projects = query.data?.pages?.flatMap((item) => item.data) ?? []

  return (
    <div className="h-fit flex-col max-h-full overflow-y-scroll md:pb-10 my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center md:place-items-center overflow-hidden">
      {query.isLoading ? (
        Array(8)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className="w-60 aspect-[9/10] rounded-lg shadow-md"
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

  return (
    <div className="w-full max-w-60 md:max-w-none rounded-lg overflow-hidden shadow-md relative">
      <div className="flex w-full bg-purple-100 aspect-[9/10] items-center justify-center p-0">
        {/* PLAYER HERE */}
        <video
          preload="none"
          controls
          loop={false}
          src={formatUrlLink(props.video) ?? undefined}
          muted
          crossOrigin="anonymous"
          className="h-full w-full"
        ></video>
      </div>
      <div className="p-4 text-xs text-center flex items-center justify-between">
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
                className="cursor-pointer text-xs flex gap-3 items-center"
                to={`${props.id}`}
              >
                <Info className="size-4" />
                Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="cursor-pointer text-xs flex gap-3 items-center"
                to={`update/${props.id}`}
              >
                <Pencil className="size-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => mutate(props.id)}
              className="cursor-pointer text-xs flex gap-3 items-center"
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
