import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Props = {}

export default function Collaborate({}: Props) {
  return (
    <section className="container my-10 flex flex-col gap-8">
      <p className="text-2xl text-center font-bold">Let's collaborate</p>
      <form className="flex flex-col gap-5 text-xs md:text-sm w-full max-w-sm md:max-w-lg mx-auto">
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="firstName">Firstname</label>
          <Input
            type="text"
            required
            id="firstName"
            placeholder="First Name"
            className=""
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input required type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Message</label>
          <Textarea required placeholder="Type your message here." />
        </div>

        <Button type="submit">Send message</Button>
      </form>
    </section>
  )
}
