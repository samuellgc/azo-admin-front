/** biome-ignore-all lint/suspicious/noExplicitAny: Mensagem de erro desconhecida */
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";

/**
 * @function getAccessToken
 * @description
 * Recupera o token de acesso (`access_token`) armazenado no `localStorage`.
 * Esse token é utilizado para autenticar requisições na API.
 */
function getAccessToken() {
  return localStorage.getItem("@boilerplate:access_token");
}

/**
 * @function getRefreshToken
 * @description
 * Recupera o token de atualização (`refresh_token`) armazenado no `localStorage`.
 * O `refresh_token` é usado para gerar um novo `access_token` quando este expira.
 */
function getRefreshToken() {
  return localStorage.getItem("@boilerplate:refresh_token");
}

/**
 * @function setTokens
 * @description
 * Armazena o `access_token` e, opcionalmente, o `refresh_token` no `localStorage`.
 * O `access_token` é obrigatório, já o `refresh_token` é salvo apenas se informado.
 *
 * @param {string} accessToken - Novo token de acesso retornado pela API.
 * @param {string} [refreshToken] - Novo token de atualização (opcional).
 */
function setTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem("@boilerplate:access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("@boilerplate:refresh_token", refreshToken);
  }
}

/**
 * @function refreshAccessToken
 * @description
 * Função responsável por renovar o token de acesso (`access_token`) usando o `refresh_token`.
 * Esse processo é utilizado quando a API retorna um erro de autenticação (401 Unauthorized),
 * indicando que o token de acesso atual expirou ou é inválido.
 */
async function refreshAccessToken() {
  // Obtém o refresh_token salvo localmente
  const refreshToken = getRefreshToken();

  // Se não existir refresh_token, significa que o usuário precisa logar novamente
  if (!refreshToken) throw new Error("Sessão expirada");

  // Faz a requisição para a rota de refresh da API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  // Se a API não retornar status 200 OK, falhou a renovação
  if (!response.ok) throw new Error("Não foi possível renovar a sessão");

  // Converte a resposta em JSON
  const data = await response.json();

  // Se a API retornou um novo access_token, atualiza o armazenamento local
  if (data.access_token) {
    setTokens(data.access_token, data?.refresh_token ?? null);
  } else {
    // Caso não venha o token esperado, a resposta é inválida
    throw new Error("Resposta inválida ao renovar token");
  }
}

// Flag para evitar loop infinito de refresh
let isRefreshing = false;

/**
 * Instância principal do Alova configurada para o projeto,
 * utilizando o adaptador fetch e integração com React.
 */
export const alovaInstance = createAlova({
  // URL base da API, configurada via variável de ambiente pública
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  // Adapter responsável por realizar as requisições com fetch
  requestAdapter: adapterFetch(),

  // Hook de estado do React para integrar loading, data, error etc.
  statesHook: reactHook,

  // Tempo máximo da requisição
  timeout: 30000,

  // Hook chamado antes de cada requisição
  beforeRequest(method) {
    // Verifica se é uma rota que necessita autenticação
    if (method.meta?.skipAuth) return;

    const token = getAccessToken();
    if (token) {
      method.config.headers = {
        ...method.config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  },

  // Manipulação de resposta de forma global
  responded: async (response, method) => {
    // ✅ Se a resposta foi OK
    if (response.ok) return response.json();

    // ✅ Extrai mensagem de erro do backend (se houver)
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {
      // Sem corpo JSON, mantém objeto vazio
    }

    // ✅ Mensagem de erro padrão baseada no status HTTP
    const message =
      errorData?.message ||
      (response.status === 400 && "Requisição inválida") ||
      (response.status === 401 && "Não autorizado") ||
      (response.status === 403 && "Acesso negado") ||
      "Erro inesperado";

    // ✅ Tratamento por código HTTP
    if (response.status === 401 && !isRefreshing) {
      try {
        isRefreshing = true;
        await refreshAccessToken();
        isRefreshing = false;

        // Refaz a requisição original com o novo token
        const retryResponse = await fetch(method.url, {
          ...method.config,
          headers: {
            ...method.config.headers,
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });

        if (retryResponse.ok) return retryResponse.json();

        // Se mesmo assim falhar, propaga o erro
        const retryData = await retryResponse.json().catch(() => ({}));
        throw { status: retryResponse.status, message: retryData?.message || message, data: retryData };
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        throw err;
      }
    }

    // Propaga o erro de forma padronizada
    return Promise.reject({
      status: response.status,
      message,
      data: errorData,
    });
  },
});
