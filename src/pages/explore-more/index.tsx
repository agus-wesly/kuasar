import InfiniteScroll from '@/components/infinite-scroll'
import { Skeleton } from '@/components/ui/skeleton'
import { CardARCreation } from '@/features/projects/components/card-ar-creation'
import { useInfiniteProjectQuery } from '@/features/projects/query'

type Props = {}

export default function ExploreMorePage({}: Props) {
  const query = useInfiniteProjectQuery()
  const projects = query.data?.pages?.flatMap((item) => item.data) ?? []

  return (
    <section className="flex flex-col container gap-5 my-10 relative">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary text-center">
        AR Hall of Fame
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 place-items-center md:place-items-center overflow-hidden">
        {query.isLoading ? (
          Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="w-56 aspect-[9/16] rounded-lg shadow-md"
              />
            ))
        ) : projects.length > 0 ? (
          <InfiniteScroll query={query}>
            {(response) =>
              response.data.map((proj) => (
                <CardARCreation
                  key={proj.id}
                  video={proj.video}
                  created_by={proj.created_by}
                  title={proj.title}
                />
              ))
            }
          </InfiniteScroll>
        ) : null}
      </div>
    </section>
  )
}
