import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from ".";

describe("<Button />", () => {
  /**
   * Testa se o botão é renderizado com o texto fornecido.
   */
  it("renderiza com texto padrão", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  /**
   * Testa se o evento de clique é disparado corretamente.
   */
  it("dispara evento de clique", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Clique" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Testa se o evento de clique não é disparado quando o botão está desabilitado.
   */
  it("não dispara evento de clique quando desabilitado", () => {
    const onClick = vi.fn();
    render(
      <Button
        onClick={onClick}
        disabled
      >
        Clique
      </Button>
    );
    const btn = screen.getByRole("button", { name: "Clique" });
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  /**
   * Testa se a classe da variante 'default' é aplicada corretamente.
   */
  it("aplica a classe da variante 'default'", () => {
    render(<Button variant="default">Botão</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-primary/);
  });

  /**
   * Testa se a classe da variante 'secondary' é aplicada corretamente.
   */
  it("aplica a classe da variante 'secondary'", () => {
    render(<Button variant="secondary">Botão</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-gray-5/);
  });

  /**
   * Testa se a classe da variante 'outline' é aplicada corretamente.
   */
  it("aplica a classe da variante 'outline'", () => {
    render(<Button variant="outline">Botão</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/border-gray-4/);
  });

  /**
   * Testa se a classe da variante 'ghost' é aplicada corretamente.
   */
  it("aplica a classe da variante 'ghost'", () => {
    render(<Button variant="ghost">Botão</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-transparent/);
  });

  /**
   * Testa se o tamanho 'default' é aplicado corretamente.
   */
  it("aplica o tamanho 'default'", () => {
    render(<Button size="default">Tamanho</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/h-10/);
  });

  /**
   * Testa se o tamanho 'fit' é aplicado corretamente.
   */
  it("aplica o tamanho 'fit'", () => {
    render(<Button size="fit">Tamanho</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/w-fit/);
  });

  /**
   * Testa se o botão renderiza com `asChild` e utiliza outra tag como filho.
   */
  it("renderiza com `asChild` e usa outra tag", () => {
    render(
      <Button asChild>
        <a href="/teste">Link</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "/teste");
  });
});
