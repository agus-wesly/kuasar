import { cn } from '@/lib/utils'
import './style/style.css'
import { buttonVariants } from '../ui/button'

type Props = {}

export default function Hero({}: Props) {
  return (
    <main className="flex flex-col gap-5 __gradient">
      <div className="text-background text-center flex flex-col gap-12 pt-8 pb-16 container">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">
            Elevate Your <br /> Brand
          </h1>
          <div className="flex gap-5 pt-4">
            <img src="/idea.svg" className="size-8 object-cover" />
            <img src="/social.png" className="size-8 object-cover" />
            <img src="/brain.png" className="size-8 object-cover" />
          </div>
          <p className="text-neutral-200 font-light text-md">
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
        <div className="flex flex-col gap-1 items-center">
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
        <div className="flex flex-col gap-1 items-center">
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
    </main>
  )
}
