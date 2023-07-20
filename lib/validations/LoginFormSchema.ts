import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
})
