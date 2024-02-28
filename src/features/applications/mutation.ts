import { axios } from '@/plugin/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAccessToken } from '../auth/hooks/use-auth'
import { ApplicationSchemaType } from './schema/applications'
import { Project } from '../projects/types/project'

export function useCreateApplicationMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async ({
      newApplication,
    }: {
      newApplication: ApplicationSchemaType
    }) => {
      return await axios.post('/applications/create', newApplication, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onSuccess: () => {
      toast('Successfully created  ✅', {
        description: 'New application has been created !',
      })
      navigate('/dashboard/applications')
    },
    onError: (error) => {
      console.log('e', error)
      let message = 'Unknown error. Please try again later'
      if (error instanceof AxiosError) {
        message = error.response?.data.message
      }
      toast.error('Failed to create new Application ❌', {
        description: message,
      })
    },
  })
}

export function useUpdateApplicationMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async (
      newApplication: Partial<ApplicationSchemaType> & {
        id: string
      }
    ) => {
      return await axios.patch(
        `/applications/${newApplication.id}`,
        newApplication,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onSuccess: () => {
      toast('Successfully updated ✅', {
        description: 'Application has been updated!',
      })
      navigate('/dashboard/applications')
    },
    onError: (error) => {
      console.log('e', error)
      let message = 'Unknown error. Please try again later'
      if (error instanceof AxiosError) {
        message = error.response?.data.message
      }
      toast.error('Failed to create new Application ❌', {
        description: message,
      })
    },
  })
}

export function useDeleteApplicationMutation() {
  const queryClient = useQueryClient()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async (id: Project['id']) => {
      return await axios.delete(`/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onSuccess: () => {
      toast('Successfully deleted  ✅', {
        description: 'Application has been deleted !',
      })
    },
    onError: (error) => {
      let message = 'Unknown error. Please try again later'
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message
        if (typeof serverMessage !== 'object') {
          message = serverMessage
        }
      }
      toast.error('Failed to delete Application ❌', {
        description: message,
      })
    },
  })
}
