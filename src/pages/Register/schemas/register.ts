import passwordSchema from "@/schemas/password";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  fullname: z.string().min(3).max(128),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export type RegisterPayload = z.infer<typeof registerSchema>;
