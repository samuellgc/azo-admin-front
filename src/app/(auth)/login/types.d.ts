import type { z } from "zod";
import type { loginSchema } from "./components/form/schema";
import type { User } from "@/shared/types/user";

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginResponse {
  data: User;
}
