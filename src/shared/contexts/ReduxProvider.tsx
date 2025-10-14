"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import type { ReactNode } from "react";

/**
 * ReduxProvider
 *
 * Este componente encapsula a aplicação com o `Provider` do Redux Toolkit,
 * permitindo acesso ao `store` global da aplicação em qualquer componente filho.
 *
 * É necessário ser um **Client Component** (`"use client"`) pois o `react-redux` exige
 * que o Provider esteja no lado do cliente.
 *
 * 📌 Uso típico no `app/layout.tsx` (App Router do Next.js):
 *
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Elementos filhos que terão acesso ao store do Redux
 */
export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
