import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProjectMutation } from '@/features/projects/mutation'
import { useProjectDetailQuery } from '@/features/projects/query'
import { ProjectCreate, projectCreateSchema } from '@/features/projects/schema'
import { Project } from '@/features/projects/types/project'
import { transformDateToYMD } from '@/utils/formatDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, UploadCloud, X } from 'lucide-react'
import { FieldErrors, UseFormReturn, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

function HighlightSection({
  form,
  errors,
}: {
  form: UseFormReturn<ProjectCreate>
  errors: FieldErrors<ProjectCreate>
}) {
  const isHighlight = form.getValues('highlight')

  return (
    <>
      <div className="grid gap-1">
        <label htmlFor="highlight">Highlight</label>

        <Switch
          checked={isHighlight}
          onCheckedChange={(e) => {
            form.setValue('highlight', e, {
              shouldValidate: true,
            })
            if (!e) {
              form.setValue('highlight_until', undefined)
            }
          }}
        />

        {errors.highlight && (
          <p className="text-xs text-destructive">{errors.highlight.message}</p>
        )}
      </div>

      {isHighlight ? (
        <div className="grid gap-1">
          <label htmlFor="highlight_until">Highlight until</label>
          <Input
            id="highlight_until"
            placeholder="Highlight until"
            type="date"
            min={transformDateToYMD(new Date())}
            {...form.register('highlight_until')}
            value={transformDateToYMD(
              new Date(form.getValues('highlight_until') ?? '')
            )}
            onChange={(e) => {
              form.setValue('highlight_until', e.target.value, {
                shouldValidate: true,
              })
            }}
          />

          {errors.highlight_until && (
            <p className="text-xs text-destructive">
              {errors.highlight_until.message}
            </p>
          )}
        </div>
      ) : null}
    </>
  )
}

function MediaSection({
  form,
  errors,
}: {
  form: UseFormReturn<ProjectCreate>
  errors: FieldErrors<ProjectCreate>
}) {
  const videoValue: File | null = form.getValues('video')
  const videoPreview = videoValue && URL.createObjectURL(videoValue)

  const imageValue = form.getValues('image')
  const imagePreview = imageValue && URL.createObjectURL(imageValue)

  return (
    <>
      <div className="grid gap-1">
        <label htmlFor="highlight">Video</label>
        <div className="bg-blue-50 h-56 md:h-64 w-full rounded-lg border-2 border-blue-200 border-dashed flex flex-col items-center justify-center text-neutral-500 gap-1 relative">
          {videoPreview ? (
            <>
              <video
                preload="none"
                controls
                loop={false}
                src={videoPreview}
                muted
                crossOrigin="anonymous"
                className="h-full w-full"
              ></video>

              <button
                onClick={() =>
                  // @ts-expect-error
                  form.setValue('video', null, {
                    shouldValidate: true,
                  })
                }
                className="absolute rounded-full bg-red-500 z-[1] right-1 top-1 p-1"
              >
                <X className="text-neutral-50 size-4" />
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                id="video-file"
                accept="video/*"
                className="opacity-0 absolute inset-0 z-[5] w-full cursor-pointer"
                onChange={(e) =>
                  form.setValue('video', e.target.files![0], {
                    shouldValidate: true,
                  })
                }
              />
              <UploadCloud width={32} height={32} />
              <p className="text-xs font-medium">Upload video</p>
            </>
          )}
        </div>

        {errors.video && (
          <p className="text-xs text-destructive">{errors.video.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="highlight">Image</label>
        <div className="bg-blue-50 h-56 md:h-64 w-full rounded-lg border-2 border-blue-200 border-dashed flex flex-col items-center justify-center text-neutral-500 gap-1 relative">
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                crossOrigin="anonymous"
                className="h-full w-full object-contain"
              />

              <button
                onClick={() =>
                  // @ts-expect-error
                  form.setValue('image', null, {
                    shouldValidate: true,
                  })
                }
                className="absolute rounded-full bg-red-500 z-[1] right-1 top-1 p-1"
              >
                <X className="text-neutral-50 size-4" />
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                id="image-file"
                className="opacity-0 absolute inset-0 z-[5] w-full cursor-pointer"
                accept="image/*"
                onChange={(e) =>
                  form.setValue('image', e.target.files![0], {
                    shouldValidate: true,
                  })
                }
              />

              <UploadCloud width={32} height={32} />
              <p className="text-xs font-medium">Upload image</p>
            </>
          )}
        </div>

        {errors.image && (
          <p className="text-xs text-destructive">{errors.image.message}</p>
        )}
      </div>
    </>
  )
}

function UpdateProjectForm({
  initialProjectDetail,
}: {
  initialProjectDetail: Project
}) {
  const { form, handleCreateNewProject, isSubmitting, errors } =
    useUpdateProject(initialProjectDetail)
  return (
    <form onSubmit={handleCreateNewProject} className="w-full max-w-lg my-5">
      <fieldset disabled={isSubmitting} className="grid gap-4 text-sm">
        <div className="grid gap-1">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            placeholder="Job title..."
            type="text"
            required
            {...form.register('title')}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            placeholder="Job description..."
            {...form.register('description')}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <MediaSection errors={errors} form={form} />

        <HighlightSection errors={errors} form={form} />

        <div className="grid gap-1">
          <label htmlFor="created_by">Created by</label>
          <Input
            id="created_by"
            placeholder="Created by..."
            required
            {...form.register('created_by')}
          />
          {errors.created_by && (
            <p className="text-xs text-destructive">
              {errors.created_by.message}
            </p>
          )}
        </div>

        <Button className=" px-8">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Job
        </Button>
      </fieldset>
    </form>
  )
}

export default function DashboardProjectUpdatePage() {
  const { id } = useParams()
  const {
    data: projectDetailData,
    isLoading: isLoadingProjectDetail,
    isError: isErrorProjectDetail,
  } = useProjectDetailQuery({ id })

  const projectDetail = projectDetailData?.data

  if (isLoadingProjectDetail) return <p>Loading...</p>
  if (isErrorProjectDetail) return <p>Error....</p>

  if (!projectDetail) return null

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            New Project
          </h3>
        </div>
      </div>

      <div className="p-0 rounded-xl shadow-sm mb-5">
        <UpdateProjectForm initialProjectDetail={projectDetail} />
      </div>
    </div>
  )
}

function useUpdateProject(initialProjectDetail: Project) {
  const form = useForm<z.infer<typeof projectCreateSchema>>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      title: initialProjectDetail.title,
      description: initialProjectDetail.title,
      created_by: initialProjectDetail.created_by,
      highlight: initialProjectDetail.highlight,
      highlight_until: initialProjectDetail.highlight_until,
    },
  })

  console.log('i', initialProjectDetail)

  const { mutate, isPending } = useCreateProjectMutation()

  const handleCreateNewProject = form.handleSubmit(async (data) => {
    const formData = new FormData()
    for (const key of Object.keys(data)) {
      let value = data[key as keyof typeof data]
      if (!!value) {
        if (typeof value === 'boolean') value = String(value)
        formData.set(key, value)
      }
    }
    mutate({ newProject: formData })
  })

  const errors = form.formState.errors

  return { form, handleCreateNewProject, isSubmitting: isPending, errors }
}
