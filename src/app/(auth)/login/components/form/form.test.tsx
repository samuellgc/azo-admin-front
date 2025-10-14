/** biome-ignore-all lint/suspicious/noExplicitAny: no need */
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import LoginForm from ".";
import { Provider } from "react-redux";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { store } from "@/shared/contexts/store";

// Mock do next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock do hook useLoginForm
const mockOnSubmit = vi.fn();
vi.mock("@/app/login/hooks/useLogin", () => {
  return {
    useLoginForm: () => ({
      form: {
        handleSubmit: (cb: any) => (e: any) => {
          e.preventDefault();
          return cb();
        },
        control: {},
      },
      showPassword: false,
      handlePasswordToggle: vi.fn(),
      onSubmit: mockOnSubmit,
      loading: false,
    }),
  };
});

function renderWithProviders(ui: React.ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <MemoryRouterProvider>{children}</MemoryRouterProvider>
      </Provider>
    ),
  });
}

describe("<LoginForm />", () => {
  /**
   * Deve renderizar os campos de CPF, Senha e o botão de login.
   */
  it("renderiza corretamente os campos e o botão", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });
});
