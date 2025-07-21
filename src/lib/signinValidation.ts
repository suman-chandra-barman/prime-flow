import { z } from "zod"

export const signInSchema = z.object({
  username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean()
})

export type SignInFormData = z.infer<typeof signInSchema>