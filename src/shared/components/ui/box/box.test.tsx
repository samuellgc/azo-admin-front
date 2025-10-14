import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box } from ".";

describe("<Box />", () => {
  /**
   * Testa se o componente renderiza como uma `div` por padrão.
   */
  it("renderiza como <div> por padrão", () => {
    render(<Box>Conteúdo</Box>);
    const element = screen.getByText("Conteúdo");
    expect(element.tagName).toBe("DIV");
  });

  /**
   * Testa se o componente renderiza como o elemento especificado via `as`.
   */
  it("renderiza como elemento especificado via `as`", () => {
    render(<Box as="section">Seção</Box>);
    const element = screen.getByText("Seção");
    expect(element.tagName).toBe("SECTION");
  });

  /**
   * Testa se aplica corretamente as classes CSS passadas via `className`.
   */
  it("aplica classes CSS passadas via `className`", () => {
    render(
      <Box
        className="bg-red-500"
        data-testid="box"
      />
    );
    expect(screen.getByTestId("box")).toHaveClass("bg-red-500");
  });

  /**
   * Testa se renderiza os filhos corretamente.
   */
  it("renderiza os filhos corretamente", () => {
    render(
      <Box>
        <span>Filho</span>
      </Box>
    );
    expect(screen.getByText("Filho")).toBeInTheDocument();
  });

  /**
   * Testa se repassa props extras (como `id`, `data-*`, etc.) para o componente base.
   */
  it("repassa props adicionais ao elemento", () => {
    render(
      <Box
        id="box-id"
        data-testid="box"
      />
    );
    const element = screen.getByTestId("box");
    expect(element).toHaveAttribute("id", "box-id");
  });
});
