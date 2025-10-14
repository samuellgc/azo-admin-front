import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack } from ".";

describe("<Stack />", () => {
  /**
   * Deve renderizar os filhos corretamente.
   */
  it("renderiza os filhos corretamente", () => {
    render(
      <Stack>
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  /**
   * Deve renderizar como uma <div> por padrão.
   */
  it("usa <div> como elemento padrão", () => {
    render(<Stack>Conteúdo</Stack>);
    const element = screen.getByText("Conteúdo");
    expect(element.tagName).toBe("DIV");
  });

  /**
   * Deve renderizar como o elemento especificado em `as`, por exemplo <section>.
   */
  it("permite definir o elemento via prop `as`", () => {
    render(<Stack as="section">Conteúdo</Stack>);
    const element = screen.getByText("Conteúdo");
    expect(element.tagName).toBe("SECTION");
  });

  /**
   * Deve aplicar a direção `row` quando especificada.
   */
  it("aplica `flex-row` quando direction='row'", () => {
    render(<Stack direction="row">Row</Stack>);
    const element = screen.getByText("Row");
    expect(element.className).toMatch(/flex-row/);
  });

  /**
   * Deve aplicar a direção padrão `flex-col` quando nenhuma direção é fornecida.
   */
  it("usa `flex-col` como direção padrão", () => {
    render(<Stack>Coluna</Stack>);
    const element = screen.getByText("Coluna");
    expect(element.className).toMatch(/flex-col/);
  });

  /**
   * Deve aplicar a classe correta de alinhamento (align-items).
   */
  it("aplica classe de alinhamento correta", () => {
    render(<Stack alignment="center">Alinhado</Stack>);
    const element = screen.getByText("Alinhado");
    expect(element.className).toMatch(/items-center/);
  });

  /**
   * Deve aplicar a classe correta de justificação (justify-content).
   */
  it("aplica classe de justificação correta", () => {
    render(<Stack justify="end">Justificado</Stack>);
    const element = screen.getByText("Justificado");
    expect(element.className).toMatch(/justify-end/);
  });

  /**
   * Deve aplicar a classe correta de espaçamento (gap).
   */
  it("aplica classe correta de gap", () => {
    render(<Stack gap="8">Com espaçamento</Stack>);
    const element = screen.getByText("Com espaçamento");
    expect(element.className).toMatch(/gap-8/);
  });

  /**
   * Deve aceitar classes CSS adicionais via `className`.
   */
  it("permite adicionar classes via `className`", () => {
    render(<Stack className="bg-red-500">Custom</Stack>);
    const element = screen.getByText("Custom");
    expect(element).toHaveClass("bg-red-500");
  });
});
