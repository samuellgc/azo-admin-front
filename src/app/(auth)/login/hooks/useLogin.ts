import type { LoginFormData } from "@/app/(auth)/login/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/(auth)/login/components/form/schema";
import { useRouter } from "next/navigation";
import { useCustomForm } from "@/shared/hooks/useCustomForm";
import { useLoginService } from "./useLoginService";
import type { AppDispatch } from "@/shared/contexts/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/shared/contexts/auth/slice";
import { useCustomToast } from "@/shared/hooks/useCustomToast";

/**
 * Hook customizado para gerenciar o formulário de login.
 *
 * Utiliza `useCustomForm` com validação via Zod, integra o serviço de login
 * (`useLoginService`) para enviar os dados e redireciona o usuário após sucesso.
 */
export function useLoginForm() {
  const navigate = useRouter();
  const { login } = useLoginService();
  const dispatch = useDispatch<AppDispatch>();
  const { send, loading } = login;
  const { toastError } = useCustomToast();

  const form = useCustomForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  /**
   * Função que dispara o envio dos dados de login e trata resultado.
   *
   * @param {LoginFormData} body - Dados do formulário para login.
   */
  const onSubmit = async (body: LoginFormData) => {
    send(body)
      .then(result => {
        if (result.data) {
          dispatch(setUser(result.data));
          navigate.push("/home");
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || "Erro ao realizar login";
        toastError(errorMessage);
      });
  };

  return { form, onSubmit, loading };
}
