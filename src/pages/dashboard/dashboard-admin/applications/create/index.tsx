import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { applicationsSchema } from '@/features/applications/schema/applications'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { axios } from '@/plugin/axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useUser } from '@/features/auth/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function DashboardAdminApplicationCreate({}: Props) {
  const role = useUser((state) => state.user?.role) ?? ''
  const navigate = useNavigate()

  useEffect(
    function checkUserRole() {
      if (role !== 'FREELANCER') {
        navigate('/dashboard')
      }
    },
    [role]
  )

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            New Application
          </h3>
          <p className="text-sm md:text-base mb-3 text-muted-foreground">
            Create new application
          </p>
        </div>
      </div>

      <div className="border px-5 rounded-xl shadow-sm mb-5">
        <NewApplicationForm />
      </div>
    </div>
  )
}

function NewApplicationForm() {
  const { form, handleRegister, isSubmitting, errors } =
    useCreateNewApplication()

  return (
    <form onSubmit={handleRegister} className="max-w-lg my-5">
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
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
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
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
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
          <label htmlFor="creatorType">Creator Type</label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="AR Monetize"></SelectValue>
            </SelectTrigger>

            <SelectContent {...form.register('type_creator')} id="creatorType">
              {(['Professional', 'SideHustle', 'Hobby'] as const).map(
                (item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                )
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
            type="text"
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

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="AR Monetize"></SelectValue>
            </SelectTrigger>

            <SelectContent {...form.register('AR_monetize')} id="arMonetize">
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

          <RadioGroup
            className="flex items-center gap-4 mt-1"
            defaultValue="Yes"
          >
            <RadioGroupItem value="Yes" id="yes" />
            <label htmlFor="yes">Yes</label>
            <RadioGroupItem value="No" id="no" />
            <label htmlFor="no">No</label>
          </RadioGroup>

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
          <label htmlFor="jobId">Job ID</label>
          <Input
            id="jobId"
            placeholder="Number of the jobs"
            type="text"
            {...form.register('jod_id')}
          />
          {errors.jod_id && (
            <p className="text-xs text-destructive">{errors.jod_id.message}</p>
          )}
        </div>

        <Button className="w-fit px-8">
          {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
          Register Now
        </Button>
      </fieldset>
    </form>
  )
}

function useCreateNewApplication() {
  const form = useForm<z.infer<typeof applicationsSchema>>({
    resolver: zodResolver(applicationsSchema),
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
