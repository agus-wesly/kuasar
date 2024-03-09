import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { axios } from '@/plugin/axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegisterSchema } from '@/features/user/schema/user'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

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

            <div className="flex gap-2 items-center text-sm">
              <Checkbox
                className="bg-neutral-50"
                onCheckedChange={(val) =>
                  form.setValue('asCreator', val as boolean)
                }
                id="as-creator"
              />
              <label className="select-none" htmlFor="as-creator">
                Register as creator
              </label>

              {errors.asCreator && (
                <p className="text-xs text-destructive">
                  {errors.asCreator.message}
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
      </div>
    </>
  )
}

export function useRegister() {
  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorRegister, setErrorRegister] = useState<AxiosError<{
    message: string
    statusCode: number
  }> | null>(null)
  const navigate = useNavigate()

  async function _handleRegister({
    username,
    email,
    password,
    asCreator,
  }: z.infer<typeof userRegisterSchema>) {
    try {
      setIsSubmitting(true)
      let registerUrl = '/auth/create/client'
      if (asCreator) {
        registerUrl = '/auth/create/freelancer'
      }

      const response = await axios.post(registerUrl, {
        username,
        email,
        password,
      })
      navigate(`/verify-account?email=${response.data.email}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorRegister(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = form.handleSubmit(_handleRegister)

  return {
    isSubmitting,
    handleRegister,
    errorRegister,
    form,
  }
}
