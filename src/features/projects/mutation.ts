import { axios } from '@/plugin/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { Project, ProjectResponse } from './types/project'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAccessToken } from '../auth/hooks/use-auth'
import { ProjectCreate } from './schema'

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async ({ newProject }: { newProject: ProjectCreate }) => {
      return await axios.post(
        '/projects/create',
        { ...newProject },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['infinite', 'projects'] })
    },
    onSuccess: () => {
      toast('Successfully created  ✅', {
        description: 'New project has been created !',
      })
      navigate('/dashboard/projects')
    },
    onError: (error) => {
      console.log('e', error)
      let message = 'Unknown error. Please try again later'
      if (error instanceof AxiosError) {
        message = error.response?.data.message
      }
      toast.error('Failed to create new project❌', {
        description: message,
      })
    },
  })
}

// export function useUpdateJobMutation() {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   const accessToken = useAccessToken((state) => state.accessToken)

//   return useMutation({
//     mutationFn: async (
//       newJob: Pick<Job, 'title' | 'description' | 'deadline' | 'type_id' | 'id'>
//     ) => {
//       return await axios.patch(`/jobs/${newJob.id}/update`, newJob, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['jobs'] })
//     },
//     onSuccess: () => {
//       toast('Successfully updated ✅', {
//         description: 'Job has been updated!',
//       })
//       navigate('/dashboard/jobs')
//     },
//     onError: (error) => {
//       console.log('e', error)
//       let message = 'Unknown error. Please try again later'
//       if (error instanceof AxiosError) {
//         message = error.response?.data.message
//       }
//       toast.error('Failed to create new Job ❌', {
//         description: message,
//       })
//     },
//   })
// }

// export function useDeleteJobMutation() {
//   const queryClient = useQueryClient()
//   const accessToken = useAccessToken((state) => state.accessToken)

//   return useMutation({
//     mutationFn: async (id: Job['id']) => {
//       return await axios.delete(`/jobs/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['jobs'] })
//     },
//     onSuccess: () => {
//       toast('Successfully deleted  ✅', {
//         description: 'Job has been deleted !',
//       })
//     },
//     onError: (error) => {
//       let message = 'Unknown error. Please try again later'
//       if (error instanceof AxiosError) {
//         const serverMessage = error.response?.data.message
//         if (typeof serverMessage !== 'object') {
//           message = serverMessage
//         }
//       }
//       toast.error('Failed to delete Job ❌', {
//         description: message,
//       })
//     },
//   })
// }
