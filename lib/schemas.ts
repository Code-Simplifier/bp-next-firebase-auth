import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Username is required" }).min(6, {
    message: "Username must be at least 6 characters",
  }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters",
  }),
});
