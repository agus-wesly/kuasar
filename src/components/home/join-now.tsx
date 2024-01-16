import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

type Props = {}

export default function JoinNow({}: Props) {
  return (
    <section className="container my-10 mt-20">
      <div className="bg-[#ab0ddf]/35 rounded-xl flex flex-col p-8 gap-8 shadow-md">
        <div className="space-y-2">
          <p className="text-center text-lg md:text-xl lg:text-2xl font-bold">
            Join the Next Wave of the Future of Creative XR Innovators
          </p>
          <p className="text-sm md:text-base lg:text-lg text-center leading-relaxed">
            Apply as an AR/MR/VR creator and get a chance to be featured on
            Kuasar
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'rounded-full z-[3]  bg-purple-700 hover:bg-purple-800 flex-1 mx-auto md:text-base'
            )}
          >
            Apply Now
          </a>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'rounded-full z-[3]  flex-1 mx-auto md:text-base'
            )}
          >
            Join Community
          </a>
        </div>
      </div>
    </section>
  )
}
