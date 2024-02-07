import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { jobSchema } from '@/features/jobs/schema/job'
import { axios } from '@/plugin/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

export default function DashboardJobCreatePage({}: Props) {
  const { form, handleRegister, isSubmitting, errors } = useCreateNewJob()

  const [date, setDate] = useState<Date | undefined>(new Date())

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

      <div className="p-5 rounded-xl shadow-sm mb-5">
        <form onSubmit={handleRegister} className="w-full max-w-lg my-5">
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
              />

              {errors.deadline && (
                <p className="text-xs text-destructive">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type"></SelectValue>
                </SelectTrigger>

                <SelectContent {...form.register('type_id')} id="arMonetize">
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.type_id && (
                <p className="text-xs text-destructive">
                  {errors.type_id.message}
                </p>
              )}
            </div>

            <Button className=" px-8">
              {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
              Create Job
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

function useCreateNewJob() {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorCreateNewApplication, setErrorCreateNewApplication] =
    useState<AxiosError<{
      message: string
      statusCode: number
    }> | null>(null)
  // const navigate = useNavigate()

  const handleRegister = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/applications/create', {
        ...data,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorCreateNewApplication(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  })

  const errors = form.formState.errors

  return {
    handleRegister,
    isSubmitting,
    errors,
    form,
    errorCreateNewApplication,
  }
}
