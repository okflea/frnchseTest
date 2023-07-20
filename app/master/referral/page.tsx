import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const page = async () => {

  const session = await getServerSession(authOptions)
  const getData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL
    const response = await fetch(`${baseUrl}/api/franchisee/referral`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.accessToken}`,
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

export default page
