import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLogin } from '@/features/auth/hooks/use-login'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserLoginForm({
  className,
  ...props
}: UserAuthFormProps) {
  const { error, isSubmitting, onSubmit } = useLogin()

  return (
    <>
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-xs">
            {error.response?.data.message ||
              'Failed to sign in. Please try again later'}
          </AlertDescription>
        </Alert>
      ) : null}

      <div className={cn('', className)} {...props}>
        <form onSubmit={onSubmit}>
          <fieldset disabled={isSubmitting} className="grid gap-4 text-sm">
            <div className="grid gap-1">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password</label>
              <Input
                placeholder="Your password"
                id="password"
                name="password"
                type="password"
                autoCorrect="off"
                required
              />
            </div>
            <Button>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </fieldset>
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
    </>
  )
}
