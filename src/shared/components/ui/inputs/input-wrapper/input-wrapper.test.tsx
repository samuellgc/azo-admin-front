import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InputWrapper } from ".";

describe("<InputWrapper />", () => {
  /**
   * Testa se o label é renderizado quando a prop `label` é passada.
   */
  it("renderiza o label corretamente", () => {
    render(
      <InputWrapper
        label="Nome"
        id="nome-input"
      >
        {<input id="nome-input" />}
      </InputWrapper>
    );
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  /**
   * Testa se o helperText é renderizado corretamente com o texto fornecido.
   */
  it("renderiza helper text quando informado", () => {
    render(
      <InputWrapper helperText={{ text: "Campo obrigatório", type: "error", variant: "auxiliary" }}>
        <input />
      </InputWrapper>
    );
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  /**
   * Testa se os ícones laterais (leftIcon e rightIcon) são renderizados.
   */
  it("renderiza leftIcon e rightIcon quando informados", () => {
    render(
      <InputWrapper
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        <input />
      </InputWrapper>
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  /**
   * Testa se o componente aplica estilos para estado desabilitado.
   * Aqui você pode testar a presença de classes se necessário (exemplo com `bg-gray-4`).
   */
  it("aplica estilo de desabilitado quando `disabled` é true", () => {
    const { container } = render(<InputWrapper disabled>{<input disabled />}</InputWrapper>);
    expect(container.firstChild?.firstChild).toHaveClass("bg-gray-4");
  });

  /**
   * Testa se renderiza corretamente os filhos (input encapsulado).
   */
  it("renderiza o input filho corretamente", () => {
    render(<InputWrapper>{<input placeholder="teste" />}</InputWrapper>);
    expect(screen.getByPlaceholderText("teste")).toBeInTheDocument();
  });
});
