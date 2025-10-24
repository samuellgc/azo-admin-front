/** biome-ignore-all lint/suspicious/noExplicitAny: error payloads are dynamic */
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";

/**
 * Requests a session refresh relying on HttpOnly cookies managed by the backend.
 */
async function refreshSession() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to refresh the session");
  }
}

let isRefreshing = false;

/**
 * Main Alova instance configured for the project with the fetch adapter and cookie-based auth.
 */
export const alovaInstance = createAlova({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  requestAdapter: adapterFetch(),
  statesHook: reactHook,
  timeout: 30000,

  beforeRequest(method) {
    method.config = {
      ...method.config,
      credentials: method.config?.credentials ?? "include",
    };
  },

  responded: async (response, method) => {
    if (response.ok) return response.json();

    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {
      // Keep empty payload if the response is not JSON parseable
    }

    const message =
      errorData?.message ||
      (response.status === 400 && "Invalid request") ||
      (response.status === 401 && "Unauthorized") ||
      (response.status === 403 && "Forbidden") ||
      "Unexpected error";

    if (response.status === 401 && !isRefreshing && !method.meta?.skipAuth) {
      try {
        isRefreshing = true;
        await refreshSession();

        const retryResponse = await fetch(method.url, {
          ...method.config,
          credentials: method.config?.credentials ?? "include",
        });

        if (retryResponse.ok) return retryResponse.json();

        const retryData = await retryResponse.json().catch(() => ({}));
        throw { status: retryResponse.status, message: retryData?.message || message, data: retryData };
      } catch (err) {
        if (!method.meta?.skipRedirectOnAuthError) {
          window.location.href = "/login";
        }
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({
      status: response.status,
      message,
      data: errorData,
    });
  },
});
