import { axios } from '@/plugin/axios'
import { Job } from './types/job'
import { useQuery } from '@tanstack/react-query'

export function useJobsQuery() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await axios.get<{
        data: Array<Job>
      }>('/jobs')
      return response.data
    },
  })
}
