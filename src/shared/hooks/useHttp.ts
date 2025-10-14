import { alovaInstance } from "@/shared/lib/alovaInstance";
import { useRequest } from "alova/client";
import type { RequestBody, AlovaMethodCreateConfig } from "alova";
import type { AlovaConfigOptions } from "@/shared/types/http";

/**
 * Hook customizado para padronizar chamadas HTTP utilizando Alova.
 *
 * @returns Um objeto com métodos HTTP (get, post, put, patch, delete) e utilitários (useRequest).
 */
export function useHttp() {
  return {
    /**
     * Hook para realizar requisições manualmente e gerenciar estado como loading, error e data.
     */
    useRequest,

    /**
     * Realiza uma requisição GET.
     *
     * @param url - URL da requisição relativa ao baseURL.
     * @param config - (Opcional) Configuração adicional para a requisição.
     */
    get: <TResponse = unknown>(url: string, config?: AlovaMethodCreateConfig<AlovaConfigOptions, TResponse, unknown>) =>
      alovaInstance.Get<TResponse>(url, config),

    /**
     * Realiza uma requisição POST.
     *
     * @param url - URL da requisição relativa ao baseURL.
     * @param data - Corpo da requisição (body).
     * @param config - (Opcional) Configuração adicional para a requisição.
     */
    post: <TResponse = unknown, TRequest extends RequestBody = RequestBody>(
      url: string,
      data: TRequest,
      config?: AlovaMethodCreateConfig<AlovaConfigOptions, TResponse, TRequest>
    ) => alovaInstance.Post<TResponse, TRequest>(url, data, config),

    /**
     * Realiza uma requisição PUT.
     *
     * @param url - URL da requisição relativa ao baseURL.
     * @param data - (Opcional) Corpo da requisição.
     * @param config - (Opcional) Configuração adicional para a requisição.
     */
    put: <TResponse = unknown, TRequest extends RequestBody = RequestBody>(
      url: string,
      data?: TRequest,
      config?: AlovaMethodCreateConfig<AlovaConfigOptions, TResponse, TRequest>
    ) => alovaInstance.Put<TResponse, TRequest>(url, data, config),

    /**
     * Realiza uma requisição PATCH.
     *
     * @param url - URL da requisição relativa ao baseURL.
     * @param data - (Opcional) Corpo da requisição.
     * @param config - (Opcional) Configuração adicional para a requisição.
     */
    patch: <TResponse = unknown, TRequest extends RequestBody = RequestBody>(
      url: string,
      data?: TRequest,
      config?: AlovaMethodCreateConfig<AlovaConfigOptions, TResponse, TRequest>
    ) => alovaInstance.Patch<TResponse, TRequest>(url, data, config),

    /**
     * Realiza uma requisição DELETE.
     *
     * @param url - URL da requisição relativa ao baseURL.
     * @param data - (Opcional) Corpo da requisição (usado para APIs que aceitam body no DELETE).
     * @param config - (Opcional) Configuração adicional para a requisição.
     */
    delete: <TResponse = unknown, TRequest extends RequestBody = RequestBody>(
      url: string,
      data?: TRequest,
      config?: AlovaMethodCreateConfig<AlovaConfigOptions, TResponse, TRequest>
    ) => alovaInstance.Delete<TResponse, TRequest>(url, data, config),
  };
}
