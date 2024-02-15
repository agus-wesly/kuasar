import { z } from 'zod'

export const projectCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  video: z.instanceof(File, { message: 'Video must be valid' }),
  image: z.instanceof(File).optional(),
  highlight: z.boolean().default(false),
  highlight_until: z.string(),
  created_by: z.string(),
})

export type ProjectCreate = z.infer<typeof projectCreateSchema>
