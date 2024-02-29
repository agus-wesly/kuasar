import { axios } from '@/plugin/axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegisterSchema } from '@/features/user/schema/user'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

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
