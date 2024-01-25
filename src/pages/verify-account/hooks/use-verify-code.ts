import { axios } from '@/plugin/axios'
import { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export function useVerifyCode() {
  const [searchParam] = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const navigate = useNavigate()

  const email = searchParam.get('email')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const token = formData.get('token')

    try {
      setIsSubmitting(true)
      await axios.post('/auth/activate-account', {
        email,
        token,
      })
      toast('Successfully verified  ✅', {
        description: 'Your account has been verified !',
      })
      navigate('/login')
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
