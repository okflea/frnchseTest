
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import { referralType } from '../master/referral/data'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ReferralFormSchema } from '@/lib/validations/ReferralFormSchema';
import { useSession } from 'next-auth/react';
import EditIcon from '@/components/ui/icons/EditIcon';
import { useRouter } from 'next/navigation';

type ComponentProps = {
  referral: referralType;
};
const EditDialogRefTable: React.FC<ComponentProps> = ({ referral }) => {

  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast();

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      firstname: referral.firstname,
      lastname: referral.lastname,
      email: referral.email,
      telephone: referral.telephone,
      address: referral.address,
    },
    resolver: zodResolver(ReferralFormSchema),
  })
  const onFinish = (values: { firstname: string, lastname: string, email: string, telephone: number | undefined, address: string | undefined}) => {
    const onSubmit = async () => {
      setIsLoading(true)
      try {
        const baseUrl = process.env.NEXT_PUBLIC_URL
        const response = await fetch(`${baseUrl}/api/franchisee/referral/${referral.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.accessToken}`,
            "Accept": "application/json",
          },
          body: JSON.stringify({
            firstname:values.firstname,
            lastname:values.lastname,
            email:values.email,
            telephone:values.telephone,
            address:values.address
          })
        })
        setIsLoading(false)
        setOpen(false)
        if (!response.ok) {
          setIsLoading(false)
          toast({
            title: "Error",
            description: "Could not Edit",
            variant: "destructive",
            duration: 3000,
          })
        } else {
          toast({
            title: "Success",
            description: "Changes have been saved",
            duration: 3000,
          })
          router.refresh()
        }
      } catch (e) {
        console.log(e)
      }
    }
    onSubmit()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger>
        <div className='hover:animate-pulse h-full px-2'>
          <EditIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the Referal</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Firstname</FormLabel>
                    <FormControl>
                      <Input className="glass" disabled={isLoading}{...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Firstname
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Lastname</FormLabel>
                    <FormControl >
                      <Input className="glass "  disabled={isLoading}{...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Lastname
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Email</FormLabel>
                    <FormControl >
                      <Input className="glass " type="email" disabled={isLoading}{...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Telephone</FormLabel>
                    <FormControl >
                      <Input className="glass "  disabled={isLoading}{...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Contact Number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Address</FormLabel>
                    <FormControl >
                      <Input className="glass "  disabled={isLoading}{...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditDialogRefTable
