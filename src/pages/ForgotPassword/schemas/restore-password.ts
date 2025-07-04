import passwordSchema from "@/schemas/password";
import { z } from "zod";

export const restoreSchema = z.object({
  code: z.string().min(3).max(21),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export type RestorePayload = z.infer<typeof restoreSchema>;
