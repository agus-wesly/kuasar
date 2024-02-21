import { axios } from '@/plugin/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { Project, ProjectResponse } from './types/project'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAccessToken } from '../auth/hooks/use-auth'
import { Project } from './types/project'

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async ({ newProject }: { newProject: FormData }) => {
      return await axios.post('/projects/create', newProject, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      })
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

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async ({
      newProject,
      id,
    }: {
      newProject: FormData
      id: string
    }) => {
      return await axios.patch(`/projects/${id}`, newProject, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['infinite', 'projects'] })
    },
    onSuccess: () => {
      toast('Successfully updated ✅', {
        description: 'Project has been updated!',
      })
      navigate('/dashboard/projects')
    },
    onError: (error) => {
      console.log('e', error)
      let message = 'Unknown error. Please try again later'
      if (error instanceof AxiosError) {
        message = error.response?.data.message
      }
      toast.error('Failed to create new Project ❌', {
        description: message,
      })
    },
  })
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient()
  const accessToken = useAccessToken((state) => state.accessToken)

  return useMutation({
    mutationFn: async (id: Project['id']) => {
      return await axios.delete(`/projects/gcp/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['infinite', 'projects'] })
    },
    onSuccess: () => {
      toast('Successfully deleted  ✅', {
        description: 'Project has been deleted !',
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
