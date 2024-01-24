import { axios } from '@/plugin/axios'
import { Project } from './types/project'
import { useQuery } from '@tanstack/react-query'

export function useProjectsQuery() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get<{
        data: Array<Project>
      }>('/projects', {
        params: {
          page: 1,
          perPage: 10,
        },
      })
      return response.data
    },
  })
}
