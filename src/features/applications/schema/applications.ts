import { z } from 'zod'

export const applicationSchema = z.object({
  name: z.string().min(1, 'Name cannot beee empty'),
  email: z.string().email('Must be valid email'),
  phone_number: z
    .string()
    .min(3, 'Must be atleast 3 character')
    .max(30, 'Cannot be more than 30 character'),
  address: z.string().min(1, 'Address is required'),
  linkedin: z.string().url('Invalid URL. Must be like https://....'),
  instagram: z.string().url('Invalid URL. Must be like https://...'),
  type_creator: z.enum(['Professional', 'SideHustle', 'Hobby']),
  AR_publications_count: z
    .string()
    .regex(/^\d+$/, 'Must be a number')
    .transform(Number),
  AR_monetize: z.enum(['true', 'false']).default('false').transform(Boolean),
  AR_publication_platform: z
    .string()
    .min(1, 'AR publication platform is required'),
  AR_tools: z.string().min(1, 'AR Tools is required'),
  AR_type: z.string().min(1, 'AR Type is required'),
  AR_asset: z.enum(['true', 'false']).default('false').transform(Boolean),
  AR_3D_asset: z.string().regex(/^\d+$/, 'Must be a number').transform(Number),
  AR_Skills: z.string().min(1, 'AR Skills platform is required'),
  jod_id: z.number({ required_error: 'Job Type is required' }),
})

export type ApplicationCreate = z.infer<typeof applicationSchema>
