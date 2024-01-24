import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRegister } from '@/features/auth/hooks/use-register'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserRegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const { isSubmitting, errorRegister, handleRegister, form } = useRegister()
  const errors = form.formState.errors

  return (
    <>
      {errorRegister && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-xs">
            {errorRegister.response?.data?.message ||
              'Registration failed. Please try again later !'}
          </AlertDescription>
        </Alert>
      )}
      <div className={cn('', className)} {...props}>
        <form onSubmit={handleRegister}>
          <fieldset disabled={isSubmitting} className="grid gap-4 text-sm">
            <div className="grid gap-1">
              <label htmlFor="fullName">Username</label>
              <Input
                id="fullName"
                placeholder="Your Fullname..."
                type="text"
                {...form.register('username')}
              />
              {errors.username && (
                <p className="text-xs text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="name@example.com..."
                type="email"
                autoCapitalize="none"
                autoCorrect="off"
                {...form.register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password</label>
              <Input
                placeholder="Your password..."
                id="password"
                type="password"
                autoCorrect="off"
                {...form.register('password')}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Confirm Password</label>
              <Input
                placeholder="Your confirm password..."
                id="password"
                type="password"
                autoCorrect="off"
                {...form.register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register Now
            </Button>
          </fieldset>
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
    </>
  )
}
