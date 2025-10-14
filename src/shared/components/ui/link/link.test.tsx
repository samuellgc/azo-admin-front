import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from ".";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

/**
 * Envolve os testes com um roteador simulado para uso do Next.js Link.
 */
function renderWithRouter(ui: React.ReactElement) {
  return render(ui, { wrapper: MemoryRouterProvider });
}

describe("<Link />", () => {
  /**
   * Deve renderizar o conteúdo do link corretamente
   * quando passado como texto simples.
   */
  it("renderiza o conteúdo do link", () => {
    renderWithRouter(<Link href="/about">Sobre</Link>);
    expect(screen.getByText("Sobre")).toBeInTheDocument();
  });

  /**
   * Deve aplicar o valor correto no atributo `href`
   * de acordo com a prop `href` recebida.
   */
  it("aplica o href corretamente", () => {
    renderWithRouter(<Link href="/contato">Contato</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/contato");
  });

  /**
   * Deve aplicar a classe padrão `text-primary`
   * caso nenhuma classe seja fornecida.
   */
  it("aplica a classe padrão `text-primary`", () => {
    renderWithRouter(<Link href="/teste">Teste</Link>);
    const link = screen.getByRole("link");
    expect(link.className).toContain("text-primary");
  });

  /**
   * Deve aplicar classes adicionais passadas via prop `className`.
   */
  it("aplica classes adicionais via `className`", () => {
    renderWithRouter(
      <Link
        href="/"
        className="font-bold"
      >
        Home
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("font-bold");
  });

  /**
   * Deve permitir que elementos React complexos
   * sejam passados como filhos (children).
   */
  it("renderiza elementos React como filhos", () => {
    renderWithRouter(
      <Link href="/icon">
        <span data-testid="custom-element">Icone</span>
      </Link>
    );
    expect(screen.getByTestId("custom-element")).toBeInTheDocument();
  });

  /**
   * Deve repassar atributos HTML adicionais
   * como `target` e `rel` para o elemento `<a>`.
   */
  it("mantém atributos adicionais passados ao link", () => {
    renderWithRouter(
      <Link
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Externo
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
