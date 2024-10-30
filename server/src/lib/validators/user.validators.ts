import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z.string().min(6, "Password must contain atleast 6 characters"),
});

export type SignUpType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type SignInType = z.infer<typeof signInSchema>;
