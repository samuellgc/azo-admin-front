import { useHttp } from "@/shared/hooks/useHttp";
import type { LoginFormData, LoginResponse } from "@/app/(auth)/login/types";

/**
 * Hook customizado para realizar a operação de login via API.
 *
 * Utiliza o hook `useRequest` do Alova para gerenciar o estado da requisição,
 * como loading, erro e resposta, e o método `post` para enviar os dados de login.
 */
export function useLoginService() {
  const { post, useRequest } = useHttp();

  /**
   * Cria uma requisição de login usando o hook `useRequest` do Alova.
   *
   * @param {LoginFormData} data - Dados de formulário contendo as credenciais de login (cpf, password).
   *
   * @returns {RequestInstance<LoginFormData>} Instância da requisição que pode ser disparada via `.send(data)`.
   */
  const login = useRequest(
    (data: LoginFormData) =>
      post<LoginResponse>("/auth/login", data, {
        meta: {
          skipAuth: true,
          skipRedirectOnAuthError: true,
        },
      }),
    {
      immediate: false,
    }
  );

  return {
    login,
  };
}
