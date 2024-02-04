import { z } from 'zod'

export const applicationsSchema = z.object({
  name: z.string(),
  email: z.string().email('Must be valid email'),
  phone_number: z.string().max(30, 'Cannot be more than 30 character'),
  address: z.string(),
  linkedin: z.string().url('Invalid URL'),
  instagram: z.string().url('Invalid URL'),
  type_creator: z.enum(['Professional', 'SideHustle', 'Hobby']),
  AR_publications_count: z.number(),
  AR_monetize: z.boolean(),
  AR_publication_platform: z.string(),
  AR_tools: z.string(),
  AR_type: z.string(),
  AR_asset: z.boolean(),
  AR_3D_asset: z.number(),
  AR_Skills: z.string(),
  jod_id: z.number(),
})
