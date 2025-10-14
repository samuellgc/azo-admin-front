"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/components/shadcn/ui/form";
import { useLoginForm } from "@/app/(auth)/login/hooks/useLogin";
import { InputCpf } from "@/shared/components/ui/inputs/input-cpf";
import { InputPassword } from "@/shared/components/ui/inputs/input-password";
import { Card } from "@/shared/components/shadcn/ui/card";

/**
 * Componente de formulário de login.
 *
 * - Permite que o usuário informe CPF e senha.
 * - Valida os dados via `React Hook Form` com regras definidas em `useLoginForm`.
 * - Exibe feedback visual e alternância de visibilidade da senha.
 * - Submete os dados via `onSubmit`.
 *
 * @component
 */
export default function LoginForm() {
  const { form, onSubmit, loading } = useLoginForm();

  return (
    <Card className="rounded-sm p-6 w-full max-w-96 h-115 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field, formState }) => (
              <FormItem>
                <FormControl>
                  <InputCpf
                    name="cpf"
                    id="cpf"
                    helperText={{
                      text: formState.errors[field.name]?.message,
                      type: "error",
                      variant: "auxiliary",
                    }}
                    value={field.value}
                    label="CPF"
                    onChange={field.onChange}
                    placeholder="000.000.000-00"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormControl>
                  <InputPassword
                    label="Senha"
                    name="password"
                    id="password"
                    helperText={{
                      text: formState.errors[field.name]?.message,
                      type: "error",
                      variant: "auxiliary",
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Digite seu Senha"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            Entrar
          </Button>
        </form>
      </Form>
    </Card>
  );
}
