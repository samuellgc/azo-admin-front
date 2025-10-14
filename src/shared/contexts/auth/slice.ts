import type { User } from "@/shared/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Define o formato do estado de autenticação.
 */
interface AuthState {
  /** Usuário autenticado (null se não estiver logado). */
  user: User | null;
}

/**
 * Estado inicial do slice de autenticação.
 */
const initialState: AuthState = {
  user: null,
};

/**
 * Slice de autenticação gerenciado pelo Redux Toolkit.
 *
 * Contém ações para login, logout e tratamento de erros.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Login realizado com sucesso.
     * @param action - Contém o objeto `User` autenticado.
     */
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    /**
     * Realiza logout e limpa o estado de autenticação.
     */
    logout(state) {
      state.user = null;
    },
  },
});

/** Exporta as actions para uso em dispatch (loginStart, setUser etc). */
export const { setUser, logout } = authSlice.actions;

/** Exporta o reducer para uso na store. */
export default authSlice.reducer;
