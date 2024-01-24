import { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { axios } from '@/plugin/axios'
import { useAccessToken } from './use-auth'
import { useUser } from './use-auth'

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<AxiosError<{
    message: string
    statusCode: number
  }> | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const { setAccessToken } = useAccessToken()
  const setUser = useUser((val) => val.setUser)

  const from = location.state?.from?.pathname || '/'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      setIsSubmitting(true)
      const loginResponse = await axios.post(
        '/auth/login',
        {
          email: formData.get('email') || '',
          password: formData.get('password') || '',
        }
        // {
        //   withCredentials: true,
        // }
      )
      const accesTokenRetrieved = loginResponse.data.data.access_token
      const userDataResponse = await axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accesTokenRetrieved}`,
        },
      })

      setAccessToken(accesTokenRetrieved)
      setUser(userDataResponse.data.data)
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
