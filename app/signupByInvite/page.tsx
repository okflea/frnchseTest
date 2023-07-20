"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import SignupByInviteForm from '../components/SignupByInviteForm'
import styles from './styles.module.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';

type responseType = {
  message: string,
  token: string
}

const page = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState<responseType>({ message: "", token: "" })
  const {data:session,status} = useSession()
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token');
  const emailParam = searchParams.get('email');
  const verificationFetch = async () => {
    if (tokenParam && emailParam) {
      const baseUrl = process.env.NEXT_PUBLIC_URL
      // const res = await fetch("/api/admin/verifyInvitation", {
      const res = await fetch(`${baseUrl}/api/franchisee/verifyInvitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: tokenParam,
          email: emailParam,
          franchiseeID: session?.user?.franchisee.id
        }), 
      });
      const data = await res.json()
      setIsLoading(false)
      setResponse(data)
      console.log(data);

    } else {
      return (
        <div className={styles.signupPagePage}>
          <h1>Invaild Request</h1>
        </div>
      )
    }
  }

  useEffect(() => {
    if(status==="authenticated")
    verificationFetch()
  }, [status])
  return (
    <div className={styles.signupPagePage}>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Signup By Invite</CardTitle>
          <CardDescription>Sign up to Bharat Labs</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <h1>Loading...</h1> : response.message === "verified" ? <SignupByInviteForm verificationToken={response.token} /> : <h3>{response.message}</h3>}
        </CardContent>
      </Card>
    </div>
  )
}

export default page
