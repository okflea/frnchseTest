"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignupFormSchema } from '@/lib/validations/SignupFormSchema'
import { useSession } from 'next-auth/react';

const SignupByInviteForm = (prop : { verificationToken: string }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("")

  const searchParams = useSearchParams();
  const invitationTokenParam = searchParams.get('token');
  const emailParam = searchParams.get('email');

  const {data:session} = useSession()

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
    },
    resolver: zodResolver(SignupFormSchema),
  })

  const onFinish = async (values: { username: string, password: string, firstname: string, lastname: string }) => {
    console.log("called onfinish");
    
    setIsLoading(true)
    const baseUrl = process.env.NEXT_PUBLIC_URL
    const res = await fetch(`${baseUrl}/api/franchisee/invitationSignup`, {
    // const res = await fetch("/api/admin/invitationSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invitationToken: invitationTokenParam,
        verificationToken: prop.verificationToken,
        email: emailParam,
        username: values.username,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
        franchiseeID: session?.user?.franchisee.id
      }),
    });
    const data = await res.json()
    console.log(data);
    
    setMessage(data.message)
  };

  if(message!==""){
    return <h3>{message}</h3>
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Username
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl >
                  <Input type="text" disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>
                  Enter your First Name
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
                <FormLabel>Last Name</FormLabel>
                <FormControl >
                  <Input type="text" disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Last Name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl >
                  <Input type="password" disabled={isLoading}{...field} />
                </FormControl>
                <FormDescription>
                  Enter your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl >
                  <Input type="password" disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>
                  Renter your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default SignupByInviteForm
