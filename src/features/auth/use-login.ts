import { AxiosError } from 'axios'
import { useState } from 'react'
import { useAuth } from './use-auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { axios } from '@/plugin/axios'

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<AxiosError<{
    message: string
    statusCode: number
  }> | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const setAccessToken = useAuth((state) => state.setAccessToken)

  const from = location.state?.from?.pathname || '/'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      setIsSubmitting(true)
      const response = await axios.post('/auth/login', {
        email: formData.get('email') || '',
        password: formData.get('password') || '',
      })
      setAccessToken(response.data.access_token)
      navigate(from)
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    error,
    onSubmit,
  }
}
