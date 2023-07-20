"use client";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import AddIcon from "@/components/ui/icons/AddIcon"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast";
import { ReferralFormSchema } from "@/lib/validations/ReferralFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form"

const AddReferralDialog = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      telephone: "",
      address: ""
    },
    resolver: zodResolver(ReferralFormSchema),
  })

  const onFinish = async (values: { firstname: string, lastname: string, email: string, telephone: string, address: string }) => {
    setIsLoading(true)
    const baseUrl = process.env.NEXT_PUBLIC_URL
    const response = await fetch(`${baseUrl}/api/franchhisee/referral`, {
      method: "POST",
      // headers: {
        // "Content-Type": "application/json",
        // "Authorization": `Bearer ${session?.user.accessToken}`,
        // "Accept": "application/json",
      // },
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        telephone: values.telephone,
        address: values.address,
        franchiseeId: session?.user.franchisee.id
      })
    })
    setIsLoading(false)
    console.log(response);

    if (!response.ok) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
        duration: 3000,
      })
    } else {
      toast({
        title: "Success",
        description: "Referral added successfully",
        duration: 3000,
      })
      router.refresh()
      console.log("after refresh");
    }
    setOpen(false)

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto mr-2">
          <AddIcon />
          Add Referral
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Referral</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Firstname</FormLabel>
                  <FormControl>
                    <Input className="glass" disabled={isLoading} {...field} />
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
                    <Input className="glass " disabled={isLoading} {...field} />
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
                    <Input className="glass " type="email" disabled={isLoading} {...field} />
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
                    <Input className="glass " disabled={isLoading} {...field} />
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
                    <Input className="glass " disabled={isLoading} {...field} />
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
      </DialogContent>
    </Dialog >
  )
}

export default AddReferralDialog
