import { axios } from '@/plugin/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Job } from './types/job'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAccessToken } from '../auth/hooks/use-auth'

export function useCreateJobMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async ({
      newJob,
    }: {
      newJob: Pick<Job, 'title' | 'description' | 'deadline' | 'type_id'>
    }) => {
      return await axios.post(
        '/jobs/create',
        { ...newJob },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
    onSuccess: () => {
      toast('Successfully created  ✅', {
        description: 'New job has been created !',
      })
      navigate('/dashboard/jobs')
    },
    onError: (error) => {
      console.log('e', error)
      let message = 'Unknown error. Please try again later'
      if (error instanceof AxiosError) {
        message = error.response?.data.message
      }
      toast.error('Failed to create new Job ❌', {
        description: message,
      })
    },
  })
}

export function useDeleteJobMutation() {
  const queryClient = useQueryClient()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async (id: Job['id']) => {
      return await axios.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
    onSuccess: () => {
      toast('Successfully deleted ✅', {
        description: 'Job has been deleted !',
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
      toast.error('Failed to delete Job ❌', {
        description: message,
      })
    },
  })
}
