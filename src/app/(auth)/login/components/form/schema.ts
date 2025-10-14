import * as z from "zod";

// Schema de validação com Zod
export const loginSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF deve estar no formato válido"),
  password: z.string().min(1, "Campo obrigatório"),
});
