// Card.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from ".";

describe("<Card />", () => {
  /**
   * Testa se o componente renderiza corretamente seu conteúdo filho.
   * Garante que qualquer texto passado como filho apareça no DOM.
   */
  it("renderiza com conteúdo filho", () => {
    render(<Card>Conteúdo do card</Card>);
    expect(screen.getByText("Conteúdo do card")).toBeInTheDocument();
  });

  /**
   * Verifica se o componente renderiza com o atributo `data-slot="card"`.
   * Isso pode ser usado para testes ou estilizações específicas.
   */
  it("renderiza com a classe padrão do slot", () => {
    render(<Card>Teste</Card>);
    const card = screen.getByText("Teste");
    expect(card).toHaveAttribute("data-slot", "card");
  });

  /**
   * Garante que o componente aceita e aplica classes personalizadas via a prop `className`.
   */
  it("aceita classes personalizadas via className", () => {
    render(<Card className="custom-class">Teste</Card>);
    const card = screen.getByText("Teste");
    expect(card.className).toMatch(/custom-class/);
  });

  /**
   * Verifica se todas as classes utilitárias base do Tailwind CSS estão aplicadas corretamente.
   * Isso inclui: fundo (`bg-card`), sombra (`shadow-card`), cantos arredondados (`rounded`)
   * e espaçamento interno (`p-6`).
   */
  it("renderiza com todas as classes utilitárias base", () => {
    render(<Card>Card</Card>);
    const card = screen.getByText("Card");
    expect(card.className).toMatch(/bg-card/);
    expect(card.className).toMatch(/shadow-card/);
    expect(card.className).toMatch(/rounded/);
    expect(card.className).toMatch(/p-6/);
  });
});
