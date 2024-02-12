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
import { useCreateJobMutation } from '@/features/jobs/mutation'
import { useJobTypesQuery } from '@/features/jobs/query'
import { jobCreateSchema } from '@/features/jobs/schema/job'
import { transformDateToYMD } from '@/utils/formatDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

export default function DashboardJobCreatePage({}: Props) {
  const { form, handleCreateNewJob, isSubmitting, errors } = useCreateNewJob()
  const { data, isLoading: isLoadingJobType } = useJobTypesQuery()
  const jobTypes = data?.data ?? []

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            New Job
          </h3>
          <p className="text-sm md:text-base mb-3 text-muted-foreground">
            Create new job
          </p>
        </div>
      </div>

      <div className="p-0 rounded-xl shadow-sm mb-5">
        <form onSubmit={handleCreateNewJob} className="w-full max-w-lg my-5">
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
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
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
                id="title"
                placeholder="Job deadline..."
                type="date"
                min={transformDateToYMD(new Date())}
                {...form.register('deadline')}
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
                <p className="text-xs text-destructive">
                  {errors.type_id.message}
                </p>
              )}
            </div>

            <Button className=" px-8">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Job
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

function useCreateNewJob() {
  const form = useForm<z.infer<typeof jobCreateSchema>>({
    resolver: zodResolver(jobCreateSchema),
  })

  const {
    mutate,
    isPending,
    error: errorCreateNewApplication,
  } = useCreateJobMutation()

  const handleCreateNewJob = form.handleSubmit(async (data) => {
    mutate({ newJob: data })
  })

  const errors = form.formState.errors

  return {
    handleCreateNewJob,
    isSubmitting: isPending,
    errors,
    form,
    errorCreateNewApplication,
  }
}
