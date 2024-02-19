import { z } from 'zod'

const projectSchema = {
  title: z.string(),
  description: z.string().optional(),
  image: z.instanceof(File).optional(),
  highlight: z.boolean().default(false),
  highlight_until: z.string().optional(),
  created_by: z.string(),
  video: z.instanceof(File, { message: 'Video must be valid' }),
}

export const projectCreateSchema = z.object(projectSchema).refine(
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
  .object(projectSchema)
  .merge(
    z.object({
      video: z
        .instanceof(File, { message: 'Video must be valid' })
        .or(z.string()),
      image: z
        .instanceof(File, { message: 'Video must be valid' })
        .or(z.string())
        .nullable(),
    })
  )
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
