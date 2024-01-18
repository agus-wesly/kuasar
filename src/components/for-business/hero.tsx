import { cn } from '@/lib/utils'
import './style/style.css'
import { buttonVariants } from '../ui/button'

type Props = {}

export default function Hero({}: Props) {
  return (
    <section className="flex flex-col gap-5 __gradient">
      <div className="text-background text-center gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 container">
        <div className="flex flex-col items-center border border-muted/30 rounded-lg py-10 md:col-span-3">
          <h1 className="text-4xl md:text-5xl font-bold">
            Elevate Your <br /> Brand
          </h1>
          <div className="flex gap-5 py-4">
            <img src="/idea.svg" className="size-8 md:size-9 object-cover" />
            <img src="/social.png" className="size-8 md:size-9 object-cover" />
            <img src="/brain.png" className="size-8 md:size-9 object-cover" />
          </div>
          <p className="text-neutral-200 font-light text-md md:text-xl">
            Innovative, Engaging, Memorable
          </p>
          <a
            href="#"
            className={cn(
              buttonVariants(),
              'mt-3 bg-white text-purple-900 w-fit rounded-full font-bold hover:bg-background/90'
            )}
          >
            Learn More
          </a>
        </div>

        <div className="flex flex-col items-center border border-muted/30 rounded-lg p-10 gap-2 lg:gap-3">
          <h3 className="text-xl font-semibold">
            Want to bring AR in your marketing strategy but don't know where to
            start?
          </h3>
          <img />
          <p className="text-sm text-neutral-100 font-light">
            Reach us and discuss to know more how we can collaborate
          </p>
          <a
            href="#"
            className={cn(
              buttonVariants(),
              'mt-3 bg-white text-purple-900 w-fit rounded-full font-bold hover:bg-background/90'
            )}
          >
            Learn More
          </a>
        </div>

        <div className="flex flex-col items-center border border-muted/30 rounded-lg p-10 md:col-span-2 gap-2 lg:gap-3">
          <h3 className="text-xl font-semibold">
            Already have an idea on how to implement AR for business in your
            next campaign ?
          </h3>
          <img />
          <p className="text-sm text-neutral-100 font-light">
            Schedule a call with our team and get a free consultation.
          </p>
          <a
            href="#"
            className={cn(
              buttonVariants(),
              'mt-3 bg-white text-purple-900 w-fit rounded-full font-bold hover:bg-background/90'
            )}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
