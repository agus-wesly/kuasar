import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useProjectsQuery } from '@/features/projects/query'
import { Skeleton } from '@/components/ui/skeleton'
import { Project } from '@/features/projects/types/project'
import { Link } from 'react-router-dom'
import { CardARCreation } from '@/features/projects/components/card-ar-creation'

type Props = {}

export default function HallOfFame({}: Props) {
  return (
    <section
      id="showcase"
      className="container flex flex-col my-10 mt-20 text-center gap-2"
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
        AR Hall of Fame
      </h2>

      <p className="mb-5">Best of AR creation from our community</p>

      <ProjectShowcaseSection />

      <Link
        to="/hall-of-fame"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'mt-5 rounded-full z-[3] px-7 w-fit mx-auto'
        )}
      >
        Explore more
      </Link>
    </section>
  )
}

function ProjectShowcaseSection() {
  const { isLoading, data } = useProjectsQuery()

  let projects: Array<Project> = []
  // I NEED THIS BECAUSE IN DEV MODE MY COMPUTER IS SO SLOWWWWWW 😂
  if (import.meta.env.MODE === 'production') {
    projects = data?.data || []
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 place-items-center md:place-items-center overflow-hidden">
      {isLoading
        ? Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="w-56 aspect-[9/16] rounded-lg shadow-md"
              />
            ))
        : projects.length > 0
        ? projects.map((proj) => {
            if (!proj.highlight) return
            return (
              <CardARCreation
                key={proj.id}
                video={proj.video}
                created_by={proj.created_by}
                title={proj.title}
              />
            )
          })
        : null}
    </div>
  )
}
