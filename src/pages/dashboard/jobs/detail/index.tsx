import { useJobDetailQuery, useJobTypesQuery } from '@/features/jobs/query'
import { formatDate } from '@/utils/formatDate'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

type Props = {}

export function Component({}: Props) {
  const params = useParams()
  const { data: jobDetailData, isLoading } = useJobDetailQuery({
    id: params.id,
  })
  const { data: jobTypeData } = useJobTypesQuery()
  const jobDetail = jobDetailData?.data
  const jobTypeList = jobTypeData?.data ?? []

  if (isLoading) return <p>Loading...</p>
  if (!jobDetail) return

  const jobType = jobTypeList.find((item) => item.id === jobDetail.type_id)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Link
          to={'/dashboard/jobs'}
          className="flex gap-2 items-center font-semibold text-lg md:text-xl text-primary"
        >
          <span>
            <ArrowLeft />
          </span>
          <span>Back to all Jobs</span>
        </Link>
      </div>

      <div className="p-0 mb-5 w-full max-w-lg my-3 md:my-5 flex flex-col gap-5 text-sm md:text-base">
        <p className="text-lg md:text-xl font-bold">{jobDetail.title}</p>
        <p className="text-neutral-600">
          {jobDetail.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Necessitatibus voluptatibus voluptatem laboriosam
          harum accusantium sequi et laborum quos. Animi quos ipsam assumenda
          culpa beatae nesciunt laboriosam! Cumque delectus voluptates ratione!
        </p>
        <p className="font-semibold text-primary">
          Deadline : {formatDate(jobDetail.deadline)}
        </p>
        <p className="text-neutral-800 font-semibold">
          Job type : {jobType?.type}
        </p>
      </div>
    </div>
  )
}
