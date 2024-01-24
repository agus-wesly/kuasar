import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { useVerifyToken } from './hooks/use-verify-token'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

type Props = {}

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = url.searchParams.get('email')

  if (!searchParams) throw redirect('/')
  return null
}

export default function VerifyAccount({}: Props) {
  const { email, handleSubmit, isSubmitting, error } = useVerifyToken()

  return (
    <main className="container my-10 min-h-[80vh] flex flex-col items-center">
      <div className="text-center space-y-2 mb-5">
        <h1 className="text-2xl font-bold">
          We have sent verification token to{' '}
          <span className="text-primary">{email || ''}</span>{' '}
        </h1>
        <p className="text-sm text-muted-foreground">
          Please kindly check it & input it below !
        </p>
      </div>
      {error ? (
        <Alert variant={'destructive'} className="my-5">
          <AlertTitle>Ooopss!</AlertTitle>
          <AlertDescription className="text-xs">
            The code you provide is invalid. Please check again.
          </AlertDescription>
        </Alert>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-xs md:text-sm w-full max-w-sm md:max-w-lg mx-auto"
      >
        <fieldset
          disabled={isSubmitting}
          className="grid w-full items-center gap-1.5"
        >
          <Input
            type="text"
            required
            id="code"
            name="code"
            className="w-48 mx-auto border-[1.5px] text-lg text-center"
          />
          <Button className="mt-5" type="submit">
            Verify
          </Button>
        </fieldset>
      </form>
    </main>
  )
}
