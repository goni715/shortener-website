import { z } from "zod";
export const fullNameRegex = /^[A-Za-z\s'.-]+$/; //only contain letters, spaces, apostrophes, hyphens, and dots


export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password is too long")
    .trim(),
});

export type TLoginFormValues = z.infer<typeof loginSchema>


export const registerSchema = z
  .object({
    fullName: z
      .string({
        invalid_type_error: "Full name must be string",
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .trim()
      .regex(fullNameRegex, {
        message:
          "Name can only contain letters, spaces, apostrophes, hyphens, and dots.",
      }),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password is too long"),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(1, "Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters long")
      .max(100, "Confirm Password is too long")
      .trim(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must check this box" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

  export type TRegisterFormValues = z.infer<typeof registerSchema>