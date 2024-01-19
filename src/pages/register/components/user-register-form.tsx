import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserRegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 text-sm">
          <div className="grid gap-1">
            <label htmlFor="fullName">Full Name</label>
            <Input
              id="fullName"
              placeholder="Your Fullname..."
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="name@example.com..."
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <Input
              placeholder="Your password..."
              id="password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Confirm Password</label>
            <Input
              placeholder="Your confirm password..."
              id="password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register Now
          </Button>
        </div>
      </form>

      <p className="text-xs bg-background text-muted-foreground py-2">
        Already have account ? Try{' '}
        <Link className="font-bold text-primary" to={'/login'}>
          Login
        </Link>
      </p>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
    </div>
  )
}
