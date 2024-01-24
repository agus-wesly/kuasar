import { axios } from '@/plugin/axios'
import { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useVerifyToken() {
  const [searchParam] = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const email = searchParam.get('email')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const code = formData.get('code')

    try {
      setIsSubmitting(true)
      axios.post('/auth/activate-account', {
        email,
        code,
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    isSubmitting,
    handleSubmit,
    error,
  }
}
