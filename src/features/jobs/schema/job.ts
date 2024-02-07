import { z } from 'zod'

export const jobSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string(),
  deadline: z.date(),
  type_id: z.number(),
})
