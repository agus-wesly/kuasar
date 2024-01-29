import useIntersection from './use-intersection'
import React, { useEffect } from 'react'
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { cn } from '@/lib/utils'

type Props<T extends Object> = {
  query: UseInfiniteQueryResult<InfiniteData<T, unknown>, Error>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  fallback?: React.ReactNode
  className?: string
}

function InfiniteScroll<T extends Object>({
  query,
  children,
  fallback,
  className,
}: Props<T>) {
  const [isIntersecting, ref] = useIntersection<HTMLDivElement>()

  const { data, fetchNextPage, hasNextPage } = query

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting])

  const defaultFallback = <p>Loading...</p>

  return (
    <>
      {typeof children === 'function'
        ? data?.pages?.map((result) => children(result))
        : children}

      <div
        ref={ref}
        className={cn('flex items-center justify-center w-full', className)}
      >
        {hasNextPage ? (fallback ? fallback : defaultFallback) : null}
      </div>
    </>
  )
}

export default InfiniteScroll
