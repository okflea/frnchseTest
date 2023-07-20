"use client"
import Image from "next/image";
import Link from "next/link";
import NavSheet from "@/app/components/NavSheet";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession()
  return (

    <nav className="glass shadow-lg h-24 flex items-center mb-8">
      <div className="px-10">
        <div className="w-4/5 flex items-center">
          <NavSheet />
          <Link href="/dashboard" className="inline-block">
            <div className="flex items-center">
              <Image src="/logo.png" alt="logo" width={55} height={55} priority={false} />
              <div className="flex-shrink-0 ml-2">
                <span className="text-slate-800 font-semibold text-lg">
                  Bharat Lab {session?.user?.franchisee.branchTitle}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
