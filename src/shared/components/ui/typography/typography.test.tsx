import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Typography } from ".";

describe("<Typography />", () => {
  /**
   * Deve renderizar o conteúdo de children corretamente.
   */
  it("renderiza o texto passado via children", () => {
    render(<Typography>Olá mundo</Typography>);
    expect(screen.getByText("Olá mundo")).toBeInTheDocument();
  });

  /**
   * Deve renderizar como <p> por padrão (variant="paragraph").
   */
  it("renderiza como <p> por padrão", () => {
    render(<Typography>Texto padrão</Typography>);
    const element = screen.getByText("Texto padrão");
    expect(element.tagName).toBe("P");
  });

  /**
   * Deve renderizar como <h1> quando variant="title".
   */
  it("renderiza como <h1> quando variant='title'", () => {
    render(<Typography variant="title">Título</Typography>);
    const element = screen.getByText("Título");
    expect(element.tagName).toBe("H1");
  });

  /**
   * Deve renderizar como <h2> quando variant="subtitle".
   */
  it("renderiza como <h2> quando variant='subtitle'", () => {
    render(<Typography variant="subtitle">Subtítulo</Typography>);
    const element = screen.getByText("Subtítulo");
    expect(element.tagName).toBe("H2");
  });

  /**
   * Deve renderizar como <span> quando variant="auxiliary".
   */
  it("renderiza como <span> quando variant='auxiliary'", () => {
    render(<Typography variant="auxiliary">Texto auxiliar</Typography>);
    const element = screen.getByText("Texto auxiliar");
    expect(element.tagName).toBe("SPAN");
  });

  /**
   * Deve aplicar a classe correta de tipo, como "text-success".
   */
  it("aplica a classe correta para type='success'", () => {
    render(<Typography type="success">Sucesso</Typography>);
    const element = screen.getByText("Sucesso");
    expect(element).toHaveClass("text-success");
  });

  /**
   * Deve aceitar classes adicionais via className.
   */
  it("permite classes adicionais via className", () => {
    render(<Typography className="text-red-500">Estilizado</Typography>);
    const element = screen.getByText("Estilizado");
    expect(element).toHaveClass("text-red-500");
  });
});
