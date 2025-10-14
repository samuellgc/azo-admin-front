import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from ".";

vi.mock("@/shared/lib/utils", () => ({
  cn: vi.fn((...args) => args.join(" ")),
}));

/**
 * @describe DropdownMenu
 * @description Testes para o componente raiz `DropdownMenu`.
 */
describe("DropdownMenu", () => {
  /**
   * @test Renderiza o componente raiz
   * @description Verifica se o `DropdownMenu` renderiza sem erros.
   */
  test("renders the root component", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>Item</DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});

/**
 * @describe DropdownMenuTrigger
 * @description Testes para o componente `DropdownMenuTrigger`.
 */
describe("DropdownMenuTrigger", () => {
  /**
   * @test Abre e fecha o menu ao clicar
   * @description Verifica se o `DropdownMenuTrigger` abre e fecha o `DropdownMenuContent` ao ser clicado.
   */
  test("opens and closes the menu on click", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText("Open Menu");
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();

    await user.click(trigger);
    const item1 = screen.getByText("Item 1");
    expect(item1).toBeInTheDocument();

    await user.click(item1);
    await waitFor(() => {
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    });
  });
});

/**
 * @describe DropdownMenuContent
 * @description Testes para o componente `DropdownMenuContent`.
 */
describe("DropdownMenuContent", () => {
  /**
   * @test Renderiza o conteúdo do menu
   * @description Verifica se o `DropdownMenuContent` renderiza seus filhos quando o menu está aberto.
   */
  test("renders menu content", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Content Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Content Item")).toBeInTheDocument();
  });

  /**
   * @test Aplica classes CSS corretamente
   * @description Verifica se as classes CSS padrão e adicionais são aplicadas ao `DropdownMenuContent`.
   */
  test("applies CSS classes correctly", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content-class">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByText("Open"));
    const content = screen.getByText("Item").closest('[data-slot="dropdown-menu-content"]');
    expect(content).toHaveClass("custom-content-class");
    expect(content).toHaveClass("bg-popover"); // Uma das classes padrão
  });
});

/**
 * @describe DropdownMenuItem
 * @description Testes para o componente `DropdownMenuItem`.
 */
describe("DropdownMenuItem", () => {
  /**
   * @test Renderiza e é clicável
   * @description Verifica se o `DropdownMenuItem` renderiza e se o callback `onSelect` é chamado ao clicar.
   */
  test("renders and is clickable", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleSelect}>Click Me</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const item = screen.getByText("Click Me");
    expect(item).toBeInTheDocument();
    await user.click(item);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  /**
   * @test Renderiza desabilitado
   * @description Verifica se o `DropdownMenuItem` é renderizado como desabilitado e não é clicável.
   */
  test("renders disabled", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled
            onSelect={handleSelect}
          >
            Disabled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const item = screen.getByText("Disabled Item");
    await user.click(item);
    expect(handleSelect).not.toHaveBeenCalled();
  });
});

/**
 * @describe DropdownMenuLabel
 * @description Testes para o componente `DropdownMenuLabel`.
 */
describe("DropdownMenuLabel", () => {
  /**
   * @test Renderiza o label
   * @description Verifica se o `DropdownMenuLabel` renderiza o texto fornecido.
   */
  test("renders the label", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText("My Label")).toBeInTheDocument();
    expect(screen.getByText("My Label")).toHaveClass("font-medium");
  });
});
