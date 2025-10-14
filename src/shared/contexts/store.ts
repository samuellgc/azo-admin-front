import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/shared/contexts/auth/slice";

/**
 * Configura e exporta a store Redux da aplicação.
 *
 * Aqui usamos o `configureStore` do Redux Toolkit, que já inclui middlewares padrão
 * como `redux-thunk`, e ativa automaticamente o Redux DevTools em desenvolvimento.
 */
export const store = configureStore({
  reducer: {
    // Define os reducers da aplicação.
    auth: authReducer,
  },
});

/**
 * Tipo utilitário que representa toda a estrutura de estado global (`store.getState()`).
 *
 * Use `RootState` com `useSelector` para ter tipagem automática do estado:
 *
 * ```ts
 * const user = useSelector((state: RootState) => state.auth.user);
 * ```
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Tipo utilitário que representa o `dispatch` da store.
 *
 * Use `AppDispatch` com `useDispatch` para ter tipagem correta:
 *
 * ```ts
 * const dispatch = useDispatch<AppDispatch>();
 * ```
 */
export type AppDispatch = typeof store.dispatch;
