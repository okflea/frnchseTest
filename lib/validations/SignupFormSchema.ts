import { z } from "zod";

export const SignupFormSchema = z.object({
  firstname: z.string().min(1,{message:"firstname is required"}),
  lastname: z.string().min(1,{message:"lastname is required"}),
  username: z.string().min(1,{message:"username is required"}),
  password: z.string().min(3,{message:"password is required"}),
  confirmPassword: z.string().min(3,{message:"please confirm password"}),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
