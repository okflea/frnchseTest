"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import { referralType } from '../master/referral/data'
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import SwatchIcon from '@/components/ui/icons/SwatchIcon'

type ComponentProps = {
  referral: referralType;
};
const DeleteDialogRefTable: React.FC<ComponentProps> = ({ referral }) => {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const deleteReferral = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL
    const response = await fetch(`${baseUrl}/api/franchisee/referral/${referral.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.accessToken}`,
        "Accept": "application/json",
      }
    })
    if (response.ok) {
      toast({
        title: "Success",
        description: "Referral deleted successfully",
        duration: 3000,
      })
      router.refresh()
      setOpen(false)
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
        duration: 3000,
      })
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='fixed z-90 bottom-10 right-8 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl hover:animate-bounce duration-300'>
          <SwatchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the referral
            and remove data from our servers.
          </DialogDescription>
          <Button
            className='w-1/3'
            variant="destructive"
            onClick={() => deleteReferral()}
          >
            Delete
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog >
  )
}

export default DeleteDialogRefTable
