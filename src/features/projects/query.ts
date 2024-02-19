import { axios } from '@/plugin/axios'
import { Project, ProjectResponse } from './types/project'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

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

export function useProjectDetailQuery({ id }: { id: string | undefined }) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const response = await axios.get<{
        data: Project
      }>(`/projects/detail/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useInfiniteProjectQuery() {
  return useInfiniteQuery({
    queryKey: ['infinite', 'projects'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<ProjectResponse>('/projects', {
        params: {
          page: pageParam,
          perPage: 10,
        },
      })
      return response.data
    },
    staleTime: 0,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    getNextPageParam: (currentProject) => {
      return currentProject.meta.next
    },
    initialPageParam: 1,
  })
}
