import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { axios } from '@/plugin/axios'
import { useAuth } from '@/features/auth/use-auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserLoginForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const setAccessToken = useAuth((state) => state.setAccessToken)

  const from = location.state?.from?.pathname || '/'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await axios.post('/auth/login', {
        email: formData.get('email') || '',
        password: formData.get('password') || '',
      })
      setAccessToken(response.data.access_token)
      navigate(from)
    } catch (error) {
      alert('Error')
    }
  }

  return (
    <div className={cn('', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 text-sm">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="name@example.com"
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
              placeholder="Your password"
              id="password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>

      <p className="text-xs bg-background text-muted-foreground py-2">
        Don't have account yet ? Try{' '}
        <Link className="font-bold text-primary" to={'/register'}>
          Register
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
