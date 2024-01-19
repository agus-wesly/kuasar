import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import GradientHome from './gradient-home'

type Props = {}

export default function Hero({}: Props) {
  return (
    <section className="flex flex-col container gap-5 mt-5 relative md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-5 md:mb-8 text-primary">
          Build, Show, Earn
        </h1>

        <p className="text-2xl font-medium text-muted-foreground">
          Creator of the Future
        </p>
        <p className="text-2xl font-medium text-muted-foreground">
          Let's Augment the world !
        </p>

        <a
          href="#"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'mt-5 rounded-full z-[3] px-7 '
          )}
        >
          Explore more
        </a>
      </div>

      <img
        src="https://static.wixstatic.com/media/1bf780_01b5374f635d4167bbaee4e0e1b99bfe~mv2.png/v1/crop/x_1255,y_0,w_2301,h_2000/fill/w_564,h_490,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/6485323.png"
        className="size-[320px] lg:size-[400px] object-cover mx-auto md:mx-0"
      />

      <GradientHome />
    </section>
  )
}
