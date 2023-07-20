"use client"
import { SessionProvider } from "next-auth/react"; //Next Auth. it has authenticated user info
import { ReactNode } from "react"


type Props = {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
export default Providers
