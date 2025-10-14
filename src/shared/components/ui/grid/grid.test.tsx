import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid } from ".";

describe("<Grid />", () => {
  /**
   * Deve renderizar como uma `<div>` por padrão.
   */
  it("renderiza como <div> por padrão", () => {
    render(<Grid>Conteúdo</Grid>);
    const element = screen.getByText("Conteúdo");
    expect(element.tagName).toBe("DIV");
  });

  /**
   * Deve renderizar como o elemento especificado via `as`.
   */
  it("renderiza como elemento especificado via `as`", () => {
    render(<Grid as="section">Seção</Grid>);
    const element = screen.getByText("Seção");
    expect(element.tagName).toBe("SECTION");
  });

  /**
   * Deve aplicar as classes de colunas e espaçamento corretamente.
   */
  it("aplica classes de grid e espaçamento", () => {
    render(
      <Grid
        cols="3"
        gap="6"
        data-testid="grid"
      />
    );
    const element = screen.getByTestId("grid");

    // Classes esperadas
    expect(element.className).toContain("grid");
    expect(element.className).toContain("grid-cols-3");
    expect(element.className).toContain("gap-6");
  });

  /**
   * Deve aplicar classes adicionais passadas via `className`.
   */
  it("aplica classes adicionais via className", () => {
    render(
      <Grid
        className="bg-gray-100"
        data-testid="grid"
      />
    );
    expect(screen.getByTestId("grid")).toHaveClass("bg-gray-100");
  });

  /**
   * Deve repassar props extras para o elemento raiz.
   */
  it("repassa props adicionais", () => {
    render(
      <Grid
        id="grid-id"
        data-testid="grid"
      />
    );
    const element = screen.getByTestId("grid");
    expect(element).toHaveAttribute("id", "grid-id");
  });

  /**
   * Deve renderizar os filhos corretamente.
   */
  it("renderiza os filhos corretamente", () => {
    render(
      <Grid>
        <span>Filho</span>
      </Grid>
    );
    expect(screen.getByText("Filho")).toBeInTheDocument();
  });
});
