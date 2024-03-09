import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUpdateApplicationMutation } from '@/features/applications/mutation'
import { useApplicationDetailQuery } from '@/features/applications/query'
import { useJobsQuery } from '@/features/jobs/query'
import { applicationSchema } from '@/features/applications/schema/applications'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { ApplicationResponse } from '@/features/applications/types/application'
import ErrorPage from '@/components/shared/error-page'

export function Component() {
  const { id: applicationId } = useParams()
  const {
    data: applicationDetail,
    isLoading: isLoadingApplicationDetail,
    isError,
  } = useApplicationDetailQuery({ id: applicationId })

  if (isLoadingApplicationDetail) return <p>Loading...</p>
  if (isError) return <ErrorPage />

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            Update Job
          </h3>
        </div>
      </div>

      <div className="p-0 rounded-xl shadow-sm mb-5">
        {applicationDetail ? (
          <UpdateApplicationForm initialApplicationDetail={applicationDetail} />
        ) : null}
      </div>
    </div>
  )
}

function UpdateApplicationForm({
  initialApplicationDetail,
}: {
  initialApplicationDetail: ApplicationResponse
}) {
  const { form, handleUpdateApplication, isSubmitting, errors } =
    useUpdateApplication(initialApplicationDetail)

  const { data, isLoading: isLoadingJobQuery } = useJobsQuery()
  const jobs = data?.data

  return (
    <form onSubmit={handleUpdateApplication} className="max-w-lg my-5">
      <fieldset disabled={isSubmitting} className="grid gap-4 text-sm">
        <div className="grid gap-1">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            placeholder="Ex: Jhon Dhoe"
            type="text"
            {...form.register('name')}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            placeholder="Ex: jhondoe@email.com"
            type="text"
            {...form.register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="phoneNumber">Phone number</label>
          <Input
            id="phoneNumber"
            placeholder="Ex: 0812345678"
            type="text"
            {...form.register('phone_number')}
          />
          {errors.phone_number && (
            <p className="text-xs text-destructive">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="address">Address</label>
          <Input
            id="address"
            placeholder="Ex: Jl. Jendral Sudirman No.1"
            type="text"
            {...form.register('address')}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="linkedin">Linkedin</label>
          <Input
            id="linkedin"
            placeholder="Ex: https://www.linkedin.com/in/jhondoe/"
            type="text"
            {...form.register('linkedin')}
          />
          {errors.linkedin && (
            <p className="text-xs text-destructive">
              {errors.linkedin.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="instagram">Instagram</label>
          <Input
            id="instagram"
            placeholder="Ex: https://www.instagram.com/jhondoe/"
            type="text"
            {...form.register('instagram')}
          />
          {errors.instagram && (
            <p className="text-xs text-destructive">
              {errors.instagram.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="type_creator">Creator Type</label>
          <Select
            defaultValue={form.getValues('type_creator')}
            onValueChange={(e: 'Professional' | 'SideHustle' | 'Hobby') =>
              form.setValue('type_creator', e, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Creator type"></SelectValue>
            </SelectTrigger>

            <SelectContent id="creatorType">
              {(['Professional', 'SideHustle', 'Hobby'] as const).map(
                (item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          {errors.type_creator && (
            <p className="text-xs text-destructive">
              {errors.type_creator.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arPublications">AR Publications count</label>
          <Input
            id="arPublications"
            placeholder="Number of the AR publications."
            {...form.register('AR_publications_count')}
          />
          {errors.AR_publications_count && (
            <p className="text-xs text-destructive">
              {errors.AR_publications_count.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arMonetize">AR Monetize</label>

          <Select
            defaultValue={String(form.getValues('AR_monetize'))}
            onValueChange={(e: 'true' | 'false') =>
              form.setValue('AR_monetize', e as any)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="AR Monetize"></SelectValue>
            </SelectTrigger>

            <SelectContent id="arMonetize">
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>

          {errors.AR_monetize && (
            <p className="text-xs text-destructive">
              {errors.AR_monetize.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arPublicationPlatform">AR Publication Platform</label>
          <Input
            id="arPublicationPlatform"
            placeholder="Platform of the AR publications."
            type="text"
            {...form.register('AR_publication_platform')}
          />
          {errors.AR_publication_platform && (
            <p className="text-xs text-destructive">
              {errors.AR_publication_platform.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arTools">AR Tools</label>
          <Input
            id="arTools"
            placeholder="Tools of the AR publications."
            type="text"
            {...form.register('AR_tools')}
          />
          {errors.AR_tools && (
            <p className="text-xs text-destructive">
              {errors.AR_tools.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arType">AR Type</label>
          <Input
            id="arType"
            placeholder="Type of the AR publications."
            type="text"
            {...form.register('AR_type')}
          />
          {errors.AR_type && (
            <p className="text-xs text-destructive">{errors.AR_type.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arAsset">AR Asset</label>

          <Select
            defaultValue={String(form.getValues('AR_asset'))}
            onValueChange={(e: 'true' | 'false') =>
              form.setValue('AR_asset', e as any)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="AR Asset"></SelectValue>
            </SelectTrigger>

            <SelectContent id="arAsset">
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>

          {errors.AR_asset && (
            <p className="text-xs text-destructive">
              {errors.AR_asset.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="ar3dAsset">AR 3D Asset</label>
          <Input
            id="ar3dAsset"
            placeholder="3D asset of the AR publications."
            type="text"
            {...form.register('AR_3D_asset')}
          />
          {errors.AR_3D_asset && (
            <p className="text-xs text-destructive">
              {errors.AR_3D_asset.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="arSkills">AR Skills</label>
          <Input
            id="arSkills"
            placeholder="Skills of the AR publications."
            type="text"
            {...form.register('AR_Skills')}
          />
          {errors.AR_Skills && (
            <p className="text-xs text-destructive">
              {errors.AR_Skills.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          {isLoadingJobQuery ? (
            <p>Loading...</p>
          ) : (
            <>
              <label htmlFor="jod_id">Job type</label>
              <Select
                defaultValue={String(form.getValues('jod_id'))}
                onValueChange={(e) => form.setValue('jod_id', Number(e))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Job Type"></SelectValue>
                </SelectTrigger>

                <SelectContent id="arAsset">
                  {jobs?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {errors.jod_id && (
            <p className="text-xs text-destructive">{errors.jod_id.message}</p>
          )}
        </div>

        <Button className="px-8">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Application
        </Button>
      </fieldset>
    </form>
  )
}

function useUpdateApplication(applicationDetail: ApplicationResponse) {
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      ...applicationDetail,
    },
  })

  const { mutate, isPending: isUpdatingJob } = useUpdateApplicationMutation()
  const params = useParams()

  const handleUpdateApplication = form.handleSubmit(async (data) => {
    if (!params.id) return
    mutate({
      ...data,
      id: params.id,
    })
  })

  const errors = form.formState.errors

  return {
    handleUpdateApplication,
    isSubmitting: isUpdatingJob,
    errors,
    form,
  }
}
