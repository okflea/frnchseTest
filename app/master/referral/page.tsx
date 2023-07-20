"use client"
import ReferralTable from "@/app/components/ReferralTable"
import { useSession } from "next-auth/react"

const page = async () => {

  const { data: session } = useSession()
  return (
    <>
      {session && <ReferralTable token={session?.user.accessToken} />}
    </>
  )
}

export default page
