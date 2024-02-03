import { useUser } from '@/features/auth/hooks/use-auth'

type Props = {}

export default function DashboardAdminIndexPage({}: Props) {
  const username = useUser((state) => state.user?.username)
  return (
    <div className="">
      <h3 className="font-semibold text-lg">Hello, {username}!</h3>
      <p className="text-sm mb-3 text-muted-foreground">
        Here's all the app overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="shadow-md border rounded-xl p-5 flex flex-col md:col-span-2">
          <div className="mb-5">
            <p className="font-bold">Total Projects</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </div>

          <p className="text-sm font-semibold">11</p>
        </div>

        <div className="shadow-md border rounded-xl p-5 flex flex-col md:col-span-2">
          <div className="mb-5">
            <p className="font-bold">Total Jobs</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </div>

          <p className="text-sm font-semibold">11</p>
        </div>

        <div className="shadow-md border rounded-xl p-5 flex flex-col">
          <div className="mb-5">
            <p className="font-bold">Total Applications</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </div>

          <p className="text-sm font-semibold">11</p>
        </div>
      </div>
    </div>
  )
}
