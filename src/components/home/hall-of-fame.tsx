import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '../ui/card'
import { buttonVariants } from '../ui/button'
import { useProjectsQuery } from '@/features/projects/query'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function HallOfFame({}: Props) {
  return (
    <section className="container flex flex-col my-10 mt-20 text-center gap-2">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
        AR Hall of Fame
      </h2>

      <p className="mb-5">Best of AR creation from our community</p>

      <ProjectShowcaseSection />

      <a
        href="#"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'mt-5 rounded-full z-[3] px-7 w-fit mx-auto'
        )}
      >
        Explore more
      </a>
    </section>
  )
}

function ProjectShowcaseSection() {
  const { isLoading, data } = useProjectsQuery()

  // const projects = data?.data || []
  const projects = []

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 place-items-center md:place-items-center">
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

function CardARCreation(
  props: Pick<Project, 'created_by' | 'video' | 'title'>
) {
  return (
    <Card className="w-60 rounded-lg overflow-hidden shadow-md">
      <CardContent className="flex w-full bg-purple-100 aspect-[9/16] items-center justify-center p-0">
        {/* PLAYER HERE */}
        <video
          preload="none"
          controls
          autoPlay={true}
          loop={false}
          playsInline={true}
          src={props.video}
          muted
          crossOrigin="anonymous"
          className="w-full h-full"
        ></video>
      </CardContent>
      <CardFooter className="p-4 text-xs text-center flex items-center justify-center">
        Created by {props.created_by}
      </CardFooter>
    </Card>
  )
}
