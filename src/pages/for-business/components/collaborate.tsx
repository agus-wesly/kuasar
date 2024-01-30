import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { axios } from '@/plugin/axios'
import { Loader2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

type Props = {}

export default function Collaborate({}: Props) {
  const { handleSubmit, isSubmitting } = useCollaborateForm()

  return (
    <section className="container my-10 flex flex-col gap-8">
      <p className="text-2xl text-center font-bold">Let's collaborate</p>
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-sm md:max-w-lg mx-auto"
      >
        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-5 text-xs md:text-sm"
        >
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="firstName">Firstname</label>
            <Input
              type="text"
              required
              id="firstName"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="lastname">Lastname</label>
            <Input
              type="text"
              required
              id="lastName"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="email">Email</label>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="email">Message</label>
            <Textarea
              required
              placeholder="Type your message here."
              name="message"
            />
          </div>
          <Button type="submit">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Send message</span>
          </Button>
        </fieldset>
      </form>
    </section>
  )
}

function useCollaborateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      setIsSubmitting(true)
      await axios.post('/contact-message', {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message'),
      })
      toast.success('Successfully send message', {
        style: {
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
      })
    } catch (error) {
      toast.error('Failed to send message', {
        style: {
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    handleSubmit,
  }
}
