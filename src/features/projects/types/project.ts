export type Project = {
  id: number
  title: string
  description: string | null
  video: string
  image: string | null
  highlight: boolean
  highlight_until: string
  created_by: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  user_id: string
}

export type ProjectResponse = {
  data: Array<Project>
  meta: {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: null | number
    next: null | number
  }
}
