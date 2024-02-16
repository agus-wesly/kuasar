import { z } from 'zod'

export const projectCreateSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    video: z.instanceof(File, { message: 'Video must be valid' }),
    image: z.instanceof(File).optional(),
    highlight: z.boolean().default(false),
    highlight_until: z.string().optional(),
    created_by: z.string(),
  })
  .refine(
    (val) => {
      if (val.highlight) {
        return Boolean(val.highlight_until)
      }
      return true
    },
    {
      message: 'Highlight date is required if project is highlighted',
      path: ['highlight_until'],
    }
  )

export type ProjectCreate = z.infer<typeof projectCreateSchema>
