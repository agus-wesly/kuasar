import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type Props = {}

export default function JoinNow({}: Props) {
  return (
    <section className="container my-10 mt-20 ">
      <div className="bg-[#35004F] rounded-xl flex flex-col p-8 md:p-16 gap-8 shadow-md text-muted relative overflow-hidden">
        <div className="space-y-6">
          <p className="text-center text-2xl md:text-4xl font-bold">
            Join the Next Wave of the Future of Creative XR Innovators
          </p>
          <p className="text-sm text-center max-w-xl mx-auto leading-relaxed">
            Apply as an AR/MR/VR creator and get a chance to be featured on
            Kuasar
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSftVdIwmCgbL1f7VTy01Zpr9kZTJqgJ2MqVs49z46uSZcVN5w/viewform?usp=send_form"
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'rounded-full z-[3]  bg-[#471062] hover:bg-[#471062]/90 shadow-md flex-1 mx-auto md:text-base'
            )}
          >
            Apply Now
          </a>
          <a
            href="https://www.tiktok.com/@kuasar.emea"
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-muted rounded-full z-[3]  flex-1 mx-auto md:text-base'
            )}
          >
            Join Community
          </a>
        </div>

        <div className="bg-purple-600/70 absolute size-[90px] md:size-[160px] pointer-events-none left-6 top-0 -rotate-45 blur-2xl opacity-20 z-[1]" />

        <div className="bg-purple-600/70 absolute size-[90px] md:size-[200px] pointer-events-none right-6 bottom-0 -rotate-45 blur-2xl opacity-20 z-[1]" />
      </div>
    </section>
  )
}
