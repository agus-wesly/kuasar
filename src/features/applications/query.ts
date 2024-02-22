import { axios } from '@/plugin/axios'
import { ApplicationResponse } from './types/application'
import { useQuery } from '@tanstack/react-query'

export function useApplicationsQuery() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      console.log('called')
      const response = await axios.get<{
        data: Array<ApplicationResponse>
      }>('/applications')
      return response.data
    },
  })
}
