import { z } from "zod"

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .refine((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // Check if it's a valid phone (simple check for digits and common formats)
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      return emailRegex.test(value) || phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))
    }, "Please enter a valid email or phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  agreeToTerms: z.boolean().refine((value) => value === true, "You must agree to the terms and conditions"),
})

export type SignUpFormData = z.infer<typeof signUpSchema>
