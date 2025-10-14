import { toast, type ToastContent, type ToastOptions } from "react-toastify";

/**
 * Tipo de toast suportado pelo hook.
 */
type ToastType = "success" | "error" | "info" | "warning";

/**
 * Hook para exibir notificações toast de forma padronizada na aplicação.
 *
 * Este hook encapsula a lógica de exibição de toasts utilizando a biblioteca
 * `react-toastify`, aplicando opções padrão e fornecendo funções utilitárias
 * para cada tipo de toast (`success`, `error`, `info`, `warning`).
 *
 * @returns Objeto contendo funções para exibir toasts:
 * - `toastSuccess(content, options?)`: Exibe toast de sucesso.
 * - `toastError(content, options?)`: Exibe toast de erro.
 * - `toastInfo(content, options?)`: Exibe toast informativo.
 * - `toastWarning(content, options?)`: Exibe toast de aviso.
 * - `showToast(type, content, options?)`: Função genérica para exibir qualquer tipo.
 */
export function useCustomToast() {
  /**
   * Opções padrão aplicadas a todos os toasts.
   */
  const defaultOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  /**
   * Exibe um toast genérico com base no tipo informado.
   *
   * @param type Tipo do toast (`success`, `error`, `info` ou `warning`).
   * @param content Conteúdo do toast (texto, elemento React ou função).
   * @param options Opções adicionais de configuração do toast.
   */
  const showToast = (type: ToastType, content: ToastContent, options?: ToastOptions) => {
    toast[type](content, { ...defaultOptions, ...options });
  };

  /**
   * Exibe um toast de sucesso.
   */
  const toastSuccess = (content: ToastContent, options?: ToastOptions) => showToast("success", content, options);

  /**
   * Exibe um toast de erro.
   */
  const toastError = (content: ToastContent, options?: ToastOptions) => showToast("error", content, options);

  /**
   * Exibe um toast informativo.
   */
  const toastInfo = (content: ToastContent, options?: ToastOptions) => showToast("info", content, options);

  /**
   * Exibe um toast de aviso.
   */
  const toastWarning = (content: ToastContent, options?: ToastOptions) => showToast("warning", content, options);

  return {
    toastSuccess,
    toastError,
    toastInfo,
    toastWarning,
    showToast, // caso precise genérico
  };
}
