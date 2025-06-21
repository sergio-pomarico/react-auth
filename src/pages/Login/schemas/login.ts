import { z } from "zod";
import passwordSchema from "../../../schemas/password";

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;
