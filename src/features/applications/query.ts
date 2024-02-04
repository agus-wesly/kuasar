import { axios } from '@/plugin/axios'
import { Application } from './types/application'
import { useQuery } from '@tanstack/react-query'

export function useApplicationsQuery() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await axios.get<{
        data: Array<Application>
      }>('/jobs')
      return response.data
    },
  })
}
