import LoginForm from "./components/LoginForm"
import '@/app/globals.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {

  return (
    <div className="loginPage cloudBg">
      <Card className='w-[400px] glass rounded-3xl'>
        <CardHeader>
          <CardTitle className="text-slate-600 text-center">Login to Bharat Labs</CardTitle>
          <CardDescription className="flex items-center justify-center">
            <Image alt="logo" src="/logo.png" width={100} height={100} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
