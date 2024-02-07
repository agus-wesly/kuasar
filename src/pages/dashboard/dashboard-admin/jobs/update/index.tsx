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
import { useAccessToken } from '@/features/auth/hooks/use-auth'
import { useJobDetailQuery, useJobTypesQuery } from '@/features/jobs/query'
import { jobCreateSchema } from '@/features/jobs/schema/job'
import { Job } from '@/features/jobs/types/job'
import { axios } from '@/plugin/axios'
import { transformDateToYMD } from '@/utils/formatDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {}

export default function DashboardJobUpdatePage({}: Props) {
  const { id } = useParams()
  const { data: jobDetailData, isLoading: isLoadingJobDetail } =
    useJobDetailQuery({ id })

  const jobDetail = jobDetailData?.data

  if (isLoadingJobDetail) return <p>Loading...</p>

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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const accessToken = useAccessToken((state) => state.accessToken)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleUpdateJob = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post(
        '/jobs/create',
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      toast('Successfully updated  ✅', {
        description: 'Job has been updated !',
      })
      navigate('/dashboard/jobs')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Update failed  ❌', {
          description: 'An unexpected error ocured. Please try again later !',
        })
      }
    } finally {
      queryClient.invalidateQueries({ queryKey: ['jobs', jobDetail.id] })
      setIsSubmitting(false)
    }
  })

  const errors = form.formState.errors

  return {
    handleUpdateJob,
    isSubmitting,
    errors,
    form,
  }
}
