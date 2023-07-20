"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardIcon from "@/components/ui/icons/DashboardIcon";
import HamburgerIcon from "@/components/ui/icons/HamburgerIcon";
import AdminIcon from "@/components/ui/icons/AdminIcon";
import SignoutIcon from "@/components/ui/icons/SignoutIcon";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import SettingsIcon from "@/components/ui/icons/SettingsIcon";
import CRMIcon from "@/components/ui/icons/CRMIcon";
import AccenssionIcon from "@/components/ui/icons/AccenssionIcon";
import RupeeIcon from "@/components/ui/icons/RupeeIcon";
import ReferralIcon from "@/components/ui/icons/ReferralIcon";

export default function NavSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "unauthenticated")
      router.push("/")
  }, [status])
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="focus:outline-none focus:text-gray-800 transition-transform duration-200 transform hover:rotate-180 "
        >
          <HamburgerIcon />
        </button>
      </SheetTrigger>
      <SheetContent side='left' className="w-40 glass">
        <nav>
          <div className="max-w-xs mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col h-screen justify-start">
              <ul className="space-y-4 flex flex-col items-center">
                <li >
                  <span className="text-gray-800 flex justify-center items-center">
                    <Image src="/logo.png" alt="logo" width={55} height={55} priority={false} />
                  </span>
                </li>

                <Separator className="mt-2 mb-4" />

                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/dashboard"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/dashboard">
                    <span className="text-gray-800 flex justify-center items-center">
                      <DashboardIcon />
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Dashboard</span>
                  </Link>
                </li>
                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/dashboard"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/dashboard">
                    <span className="text-gray-800 flex justify-center items-center">
                      <CRMIcon/>
                    </span>
                    <span className="text-sm text-gray-600 pl-2">CRM</span>
                  </Link>
                </li>
                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/dashboard"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/dashboard">
                    <span className="text-gray-800 flex justify-center items-center">
                      <AccenssionIcon/>
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Accession</span>
                  </Link>
                </li>
                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/dashboard"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/dashboard">
                    <span className="text-gray-800 flex justify-center items-center">
                      <SettingsIcon/>
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Operations</span>
                  </Link>
                </li>
                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/dashboard"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/dashboard">
                    <span className="text-gray-800 flex justify-center items-center">
                      <RupeeIcon/>
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Finances</span>
                  </Link>
                </li>

                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/master"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/master">
                    <span className="text-gray-800 flex justify-center items-center">
                      <AdminIcon />
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Admin</span>
                  </Link>
                </li>

                <li className="transform hover:scale-110 transition-transform duration-300 ">
                  <Link
                    as={"/master/referral"}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    href="/master/referral">
                    <span className="text-gray-800 flex justify-center items-center">
                    <ReferralIcon/>
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Referral</span>
                  </Link>
                </li>


                <li className="transform hover:scale-110 transition-transform duration-300 my-auto">
                  <button
                    className="outline-none focus:outline-none focus:text-gray-800"
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                      router.push("/")
                    }}
                  >
                    <span className="text-gray-800 flex justify-center items-center">
                      <SignoutIcon />
                    </span>
                    <span className="text-sm text-gray-600 pl-2">Logout</span>
                  </button>
                </li>
                {/* Add more list items for additional menu items */}
              </ul>
            </div>
          </div>
        </nav>

      </SheetContent >
    </Sheet >
  )
}
