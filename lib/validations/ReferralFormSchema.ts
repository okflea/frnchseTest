import { z } from "zod";

export const ReferralFormSchema = z.object({
  firstname: z.string().min(1,{message:"firstname is required"}),
  lastname: z.string().min(1,{message:"lastname is required"}),
  email: z.string().email({message:"valid email is required"}),
  address: z.string(),
  telephone: z.string()
})
