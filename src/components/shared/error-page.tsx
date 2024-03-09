import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

export default function ErrorPage() {
  return (
    <div className="container min-h-screen flex justify-center pt-36">
      <div className="flex flex-col items-center">
        <AlertTriangle className="text-neutral-800 size-16" />
        <h1 className="text-xl md:text-3xl font-semibold text-foreground mt-2">
          Oopsss....
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Application error! Please try again later
        </p>

        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'mt-5 rounded-full',
          )}
          to={'..'}
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
