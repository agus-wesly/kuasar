type Props = {}

export default function DashboardAdminApplicationCreate({}: Props) {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-primary">
            New Application
          </h3>
          <p className="text-sm md:text-base mb-3 text-muted-foreground">
            Create new application
          </p>
        </div>
      </div>

      {/* <ApplicationList /> */}
    </div>
  )
}
