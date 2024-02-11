import { axios } from '@/plugin/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Job } from './types/job'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export function useCreateJobMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({
      newJob,
      accessToken,
    }: {
      newJob: Pick<Job, 'title' | 'description' | 'deadline' | 'type_id'>
      accessToken: string | null
    }) => {
      return await axios.post(
        '/jobs/create',
        {
          ...newJob,
        },
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
