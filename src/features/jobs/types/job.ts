export type Job = {
  id: number
  title: string
  description: string
  deadline: string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
  user_id: string
  type_id: number
}

export type JobType = {
  id: number
  type: string
}
