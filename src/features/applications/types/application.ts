export type Application = {
  id: number
  name: string
  email: string
  phone_number: string
  address: string
  linkedin: string
  instagram: string
  type_creator?: 'Professional' | 'SideHustle' | 'Hobby'
  AR_publications_count: number
  AR_monetize: boolean
  AR_publication_platform: string
  AR_tools: string
  AR_type: string
  AR_asset: boolean
  AR_3D_asset: number
  AR_Skills: string
  jod_id: number
}

export type ApplicationResponse = Application & {
  createdAt: string
  updatedAt: string
  user_id: string
  deletedAt?: string | null
}
