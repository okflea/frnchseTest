"use client"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormSchema } from "@/lib/validations/LoginFormSchema";
import { useToast } from "@/components/ui/use-toast";


const LoginForm = () => {

  const { data: session, status } = useSession();

  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  })

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true)
      toast({
        title: "Please wait...",
        description: "Checking your credentials",
      })
    } else if (status === "authenticated") {
      // console.log('data', session)
      router.push("/dashboard")
    }
    else
      setIsLoading(false)
  }, [status])

  const onFinish = (values: { username: string, password: string }) => {
    const onSubmit = async () => {
      setIsLoading(true)
      try {
        const result = await signIn("credentials", {
          email: values.username,
          password: values.password,
          redirect: false,
          callbackUrl: "/dashboard",
        })
        // console.log(result);
        if (result?.url === null) {
          setIsLoading(false)
          toast({
            title: "Error",
            description: "Invalid Credentials",
            variant: "destructive",
            duration: 3000,
          })
        } else {
          toast({
            title: "Success",
            description: "Login Successful",
            duration: 3000,
          })
        }

      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    }
    onSubmit()
  };

  return (
    <>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600">Email</FormLabel>
                <FormControl>
                  <Input className="glass rounded-2xl" type="email" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Email
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
                <FormLabel className="text-slate-600">Password</FormLabel>
                <FormControl >
                  <Input className="glass rounded-2xl" type="password" placeholder="Pa55w0rd" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your password
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

export default LoginForm
