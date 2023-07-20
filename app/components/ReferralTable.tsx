import { columns } from "../master/referral/columns"
import { DataTable } from "../master/referral/data-table"

type ReferralTableProps = {
  token: string
}
const ReferralTable : React.FC<ReferralTableProps> = async ({token}) => {
  const getData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL
    const response = await fetch(`${baseUrl}/api/franchisee/referral`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    })
    if (!response.ok)
      throw new Error("error fetching data")
    const referralData = await response.json()
    return referralData
  }
  const refData = await getData()

  return (
    <>
      <div>
        <DataTable columns={columns} data={refData} />
      </div>
    </>
  )
}

export default ReferralTable
