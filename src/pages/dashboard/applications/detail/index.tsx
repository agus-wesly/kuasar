import { useApplicationDetailQuery } from '@/features/applications/query'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export default function DashboardApplicationDetailPage() {
  const { id: applicationId } = useParams()
  const { data: applicationDetailData, isLoading } = useApplicationDetailQuery({
    id: applicationId,
  })

  const applicationDetail = applicationDetailData?.data

  if (isLoading) return <p>Loading....</p>

  if (!applicationDetail) return null

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <Link
          to={'/dashboard/applications'}
          className="flex gap-2 items-center font-semibold text-lg md:text-xl text-primary"
        >
          <span>
            <ArrowLeft />
          </span>
          <span>Back to all Applications</span>
        </Link>
      </div>

      <div className="p-0 mb-5 w-full max-w-lg md:my-5 flex flex-col gap-5 text-sm md:text-base">
        <p className="text-lg text-center md:text-xl font-bold capitalize">
          {applicationDetail.name}
        </p>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-neutral-600">Application ID</TableCell>
              <TableCell className="text-neutral-600">
                {applicationDetail.id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p className="text-neutral-600">Email</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">{applicationDetail.email}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">Phone Number</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.phone_number}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">Address</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">{applicationDetail.address}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">Creator Type</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.type_creator}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">Linkedin</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">{applicationDetail.linkedin}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">Instagram</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.instagram}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR Publication Count</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.AR_publications_count}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR Monetize</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.AR_monetize ? 'Yes' : 'No'}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR Tools</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">{applicationDetail.AR_tools}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR Type</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">{applicationDetail.AR_type}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR Asset</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.AR_asset ? 'Yes' : 'No'}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR 3D Asset</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.AR_3D_asset}
                </p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <p className="text-neutral-600">AR Skills</p>
              </TableCell>
              <TableCell>
                <p className="text-neutral-600">
                  {applicationDetail.AR_Skills}
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
