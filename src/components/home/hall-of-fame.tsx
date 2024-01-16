import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '../ui/card'
import { buttonVariants } from '../ui/button'

type Props = {}

const CARD_ITEM = [1, 2, 3, 4, 5]

export default function HallOfFame({}: Props) {
  return (
    <section className="container flex flex-col my-10 mt-20 text-center gap-2">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
        AR Hall of Fame
      </h2>

      <p className="mb-5">Best of AR creation from our community</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-2 md:gap-y-10 place-items-center md:place-items-center">
        {CARD_ITEM.map((item) => (
          <CardARCreation />
        ))}
      </div>

      <a
        href="#"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'mt-5 rounded-full z-[3] px-7 border-purple-900 text-purple-900 w-fit mx-auto'
        )}
      >
        Explore more
      </a>
    </section>
  )
}

function CardARCreation() {
  return (
    <Card className="w-60 rounded-lg overflow-hidden shadow-md">
      <CardContent className="flex w-full bg-purple-100 aspect-[9/16] items-center justify-center">
        {/* PLAYER HERE */}
        <div className=""></div>
      </CardContent>
      <CardFooter className="p-4 text-xs text-center flex items-center justify-center">
        Created by User123
      </CardFooter>
    </Card>
  )
}
