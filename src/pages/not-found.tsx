import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {}

export default function NotFoundPage({}: Props) {
  return (
    <main className="container min-h-screen flex justify-center pt-20">
      <div className="flex flex-col items-center gap-2  ">
        <AlertTriangle width={80} height={80} className="text-neutral-000" />
        <h1 className="text-3xl font-bold">Oopsss....</h1>
        <p className="text-muted-foreground">
          The page you are looking for not found !
        </p>

        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'mt-10 rounded-full'
          )}
          to={'/'}
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
