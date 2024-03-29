import { axios } from '@/plugin/axios'
import { ApplicationResponse } from './types/application'
import { useQuery } from '@tanstack/react-query'
import { useAccessToken } from '../auth/hooks/use-auth'

export function useApplicationsQuery() {
  const accessToken = useAccessToken((state) => state.accessToken)

  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await axios.get<{
        data: Array<ApplicationResponse>
      }>('/applications', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    },
  })
}

export function useApplicationDetailQuery({ id }: { id: string | undefined }) {
  const accessToken = useAccessToken((state) => state.accessToken)

  return useQuery({
    queryKey: ['applications', id],
    queryFn: async () => {
      const response = await axios.get<{
        data: ApplicationResponse
      }>(`/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data.data
    },
    enabled: !!id,
  })
}
