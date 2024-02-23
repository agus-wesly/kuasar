import { useApplicationsQuery } from '@/features/applications/query'
import { useUser } from '@/features/auth/hooks/use-auth'
import { useJobsQuery } from '@/features/jobs/query'
import { useProjectsQuery } from '@/features/projects/query'
import { Link } from 'react-router-dom'

type Props = {}

function ProjectSection() {
  const { data, isLoading } = useProjectsQuery()
  const projects = data?.data || []

  return (
    <div className="shadow-md border rounded-xl p-5 flex flex-col justify-between md:col-span-2 gap-2 md:gap-3">
      <div className="">
        <p className="font-bold">Total Projects</p>
        <p className="text-sm text-muted-foreground">All time</p>
      </div>

      <p className="text-sm font-semibold">
        {isLoading ? 'Loading' : projects.length}
      </p>

      <Link className="text-xs md:text-sm text-primary font-bold" to="projects">
        See more →
      </Link>
    </div>
  )
}

function JobSection() {
  const { data, isLoading } = useJobsQuery()
  const jobs = data?.data || []

  return (
    <div className="shadow-md border rounded-xl justify-between p-5 flex flex-col md:col-span-1 gap-2 md:gap-3">
      <div className="">
        <p className="font-bold">Total Jobs</p>
        <p className="text-sm text-muted-foreground">All time</p>
      </div>

      <p className="text-sm font-semibold">
        {isLoading ? 'Loading' : jobs.length}
      </p>

      <Link className="text-xs md:text-sm text-primary font-bold" to="jobs">
        See more →
      </Link>
    </div>
  )
}

function ApplicationSection() {
  const { data, isLoading } = useApplicationsQuery()
  const applications = data?.data || []

  return (
    <div className="shadow-md border rounded-xl justify-between p-5 flex flex-col md:col-span-2 gap-2 md:gap-3">
      <div>
        <p className="font-bold">Total Applications</p>
        <p className="text-sm text-muted-foreground">All time</p>
      </div>

      <p className="text-sm font-semibold">
        {isLoading ? 'Loading' : applications.length}
      </p>
      <Link
        className="text-xs md:text-sm text-primary font-bold"
        to="applications"
      >
        See more →
      </Link>
    </div>
  )
}

export default function DashboardIndexPage({}: Props) {
  const username = useUser((state) => state.user?.username)

  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg md:text-2xl text-primary">
        Hello, {username}!
      </h3>
      <p className="text-sm md:text-base mb-3 text-muted-foreground">
        Here's all the app overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <ApplicationSection />
        <ProjectSection />
        <JobSection />
      </div>
    </div>
  )
}
