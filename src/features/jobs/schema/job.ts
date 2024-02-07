import { z } from 'zod'

export const jobCreateSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string(),
  deadline: z.string().min(1, 'Deadline is required!'),
  type_id: z.number({ required_error: 'Job type is required!' }),
})
