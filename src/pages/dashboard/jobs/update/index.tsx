import ErrorPage from '@/components/shared/error-page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateJobMutation } from '@/features/jobs/mutation'
import { useJobDetailQuery, useJobTypesQuery } from '@/features/jobs/query'
import { jobCreateSchema } from '@/features/jobs/schema/job'
import { Job } from '@/features/jobs/types/job'
import { transformDateToYMD } from '@/utils/formatDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

type Props = {}

export function Component({}: Props) {
  const { id } = useParams()
  const {
    data: jobDetailData,
    isLoading: isLoadingJobDetail,
    isError,
  } = useJobDetailQuery({ id })

  const jobDetail = jobDetailData?.data

  if (isLoadingJobDetail) return <p>Loading...</p>
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
        {jobDetail ? <UpdateJobForm initialJobDetail={jobDetail} /> : null}
      </div>
    </div>
  )
}

function UpdateJobForm({ initialJobDetail }: { initialJobDetail: Job }) {
  const { form, handleUpdateJob, isSubmitting, errors } =
    useUpdateJob(initialJobDetail)
  const { data, isLoading: isLoadingJobType } = useJobTypesQuery()

  const jobTypes = data?.data ?? []

  return (
    <form onSubmit={handleUpdateJob} className="w-full max-w-lg my-5">
      <fieldset disabled={isSubmitting} className="grid gap-4 text-sm">
        <div className="grid gap-1">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            placeholder="Job title..."
            type="text"
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
            required
            {...form.register('description')}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="deadline">Deadline</label>
          <Input
            id="deadline"
            placeholder="Job deadline..."
            type="date"
            min={transformDateToYMD(new Date())}
            value={transformDateToYMD(new Date(form.getValues('deadline')))}
            onChange={(e) => {
              form.setValue('deadline', e.target.value, {
                shouldValidate: true,
              })
            }}
          />
          {errors.deadline && (
            <p className="text-xs text-destructive">
              {errors.deadline.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          {isLoadingJobType ? (
            <Skeleton className="h-8" />
          ) : (
            <>
              <label htmlFor="jobtype">Job Type</label>
              <Select
                onValueChange={(e) => form.setValue('type_id', Number(e))}
                defaultValue={String(form.getValues('type_id'))}
              >
                <SelectTrigger id="jobtype">
                  <SelectValue placeholder="Select job type"></SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {jobTypes.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {errors.type_id && (
            <p className="text-xs text-destructive">{errors.type_id.message}</p>
          )}
        </div>

        <Button className=" px-8">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Job
        </Button>
      </fieldset>
    </form>
  )
}

function useUpdateJob(jobDetail: Job) {
  const form = useForm<z.infer<typeof jobCreateSchema>>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      ...jobDetail,
    },
  })

  const { mutate, isPending: isUpdatingJob } = useUpdateJobMutation()
  const params = useParams()

  const handleUpdateJob = form.handleSubmit(async (data) => {
    if (!params.id) return
    mutate({
      ...data,
      id: Number(params.id),
    })
  })

  const errors = form.formState.errors

  return {
    handleUpdateJob,
    isSubmitting: isUpdatingJob,
    errors,
    form,
  }
}
