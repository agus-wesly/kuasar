import { z } from 'zod'

export const projectCreateSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    image: z.instanceof(File).optional(),
    highlight: z.boolean().default(false),
    highlight_until: z.string().optional().nullable(),
    created_by: z.string(),
    video: z.instanceof(File, { message: 'Video must be valid' }),
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

export const projectUpdateSchema = z
  .object({
    title: z.string(),
    description: z.string().optional().nullable(),
    highlight: z.boolean().default(false),
    highlight_until: z.string().optional().nullable(),
    created_by: z.string(),
    video: z
      .instanceof(File, { message: 'Video must be valid' })
      .or(z.string()),
    image: z
      .instanceof(File, { message: 'Video must be valid' })
      .or(z.string())
      .nullable(),
  })
  .merge(z.object({}))
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
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>
