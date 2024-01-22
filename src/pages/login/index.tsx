import UserLoginForm from './components/user-login-form'
import withPageTransition from '@/components/hoc/with-page-transition'

type Props = {}

function LoginPage({}: Props) {
  return (
    <main className="mb-10 mt-5">
      <div className="container relative h-[600px] flex-col items-center justify-center md:grid pt-20 md:pt-0 lg:max-w-none lg:grid-cols-2 lg:px-0 md:shadow-md">
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex overflow-hidden shadow-lg border">
          <img src="/man-with-vr.jpg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In to account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email & password to Sign in
              </p>
            </div>

            <UserLoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default withPageTransition(LoginPage)
