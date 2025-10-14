import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Icon } from ".";

describe("<Icon />", () => {
  /**
   * Deve renderizar corretamente o conteúdo passado via `children`.
   */
  it("renderiza o conteúdo passado via children", () => {
    render(
      <Icon>
        <span>Ícone</span>
      </Icon>
    );
    expect(screen.getByText("Ícone")).toBeInTheDocument();
  });

  /**
   * Deve usar o tipo de botão padrão como `"button"`.
   */
  it("usa `type='button'` por padrão", () => {
    render(
      <Icon>
        <span>Ícone</span>
      </Icon>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  /**
   * Deve permitir sobrescrever o `type` do botão.
   */
  it("permite sobrescrever o tipo de botão", () => {
    render(
      <Icon type="submit">
        <span>Enviar</span>
      </Icon>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  /**
   * Deve executar a função `onClick` quando clicado.
   */
  it("chama `onClick` quando clicado", () => {
    const onClick = vi.fn();
    render(
      <Icon onClick={onClick}>
        <span>Clique</span>
      </Icon>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Deve aplicar classes adicionais via `className`.
   */
  it("aplica classes adicionais via className", () => {
    render(
      <Icon className="bg-red-500">
        <span>Classe extra</span>
      </Icon>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500");
  });
});
