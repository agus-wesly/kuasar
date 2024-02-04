import { z } from 'zod'

export const applications = z.object({
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  address: z.string(),
  linkedin: z.string(),
  instagram: z.string(),
  type_creator: z.string(),
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
