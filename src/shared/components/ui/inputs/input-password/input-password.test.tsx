/** biome-ignore-all lint/suspicious/noExplicitAny: no need */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputPassword } from ".";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

/**
 * Renderiza o componente com um wrapper de roteador simulado (caso necessário).
 */
function renderInputPassword(props: any = {}) {
  return render(
    <InputPassword
      label="Senha"
      id="senha"
      value=""
      onChange={() => {}}
      {...props}
    />,
    { wrapper: MemoryRouterProvider }
  );
}

describe("<InputPassword />", () => {
  /**
   * Deve renderizar o componente básico com rótulo e campo de senha oculto.
   */
  it("renderiza com campo e label", () => {
    renderInputPassword();

    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });

  /**
   * Deve alternar entre visível e oculto ao clicar no ícone de olho.
   */
  it("alterna visibilidade da senha ao clicar no ícone", () => {
    renderInputPassword();

    const input = screen.getByLabelText("Senha");
    const iconButton = screen.getByRole("button");

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(iconButton);
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");

    fireEvent.click(iconButton);
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });

  /**
   * Deve chamar a função `onChange` ao digitar no campo.
   */
  it("chama onChange ao digitar", () => {
    const handleChange = vi.fn();
    renderInputPassword({ onChange: handleChange });

    const input = screen.getByLabelText("Senha");
    fireEvent.change(input, { target: { value: "NovaSenha123!" } });

    expect(handleChange).toHaveBeenCalledWith("NovaSenha123!");
  });

  /**
   * Deve exibir validação de senha quando `showValidation` está true.
   */
  it("exibe validação e força da senha quando showValidation está true", () => {
    renderInputPassword({ showValidation: true, value: "Senha123!" });

    expect(screen.getByText("Senha média")).toBeInTheDocument();
    expect(screen.getByText("Mínimo 10 caracteres")).toBeInTheDocument();
    expect(screen.getByText("1 ou mais minúsculas")).toBeInTheDocument();
    expect(screen.getByText("1 ou mais maiúsculas")).toBeInTheDocument();
    expect(screen.getByText("1 ou mais numéricos")).toBeInTheDocument();
    expect(screen.getByText("1 ou mais especiais")).toBeInTheDocument();
    expect(screen.getByText("Sem sequência numérica")).toBeInTheDocument();
    expect(screen.getByText("Sem espaços")).toBeInTheDocument();
  });

  /**
   * Deve mostrar força como "Senha forte" quando todos os critérios forem atendidos.
   */
  it("exibe 'Senha forte' com senha segura", () => {
    renderInputPassword({ showValidation: true, value: "SenhaForte123!" });

    expect(screen.getByText("Senha forte")).toBeInTheDocument();
  });

  /**
   * Deve exibir 'Senha fraca' com senha muito simples.
   */
  it("exibe 'Senha fraca' com senha simples", () => {
    renderInputPassword({ showValidation: true, value: "abc" });

    expect(screen.getByText("Senha fraca")).toBeInTheDocument();
  });
});
