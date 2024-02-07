import { axios } from '@/plugin/axios'
import { Job, JobType } from './types/job'
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

export function useJobTypesQuery() {
  return useQuery({
    queryKey: ['jobs/types'],
    queryFn: async () => {
      const response = await axios.get<{
        data: Array<JobType>
      }>('/jobs/types')
      return response.data
    },
  })
}

export function useJobDetailQuery({ id }: { id: string | undefined }) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: async () => {
      const response = await axios.get<{
        data: Job
      }>(`/jobs/${id}/detail`)
      return response.data
    },
    enabled: !!id,
  })
}
