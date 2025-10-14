import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ActionOptions } from "./index";
import type { Option } from "./type";

describe("ActionOptions Component", () => {
  it("should render trigger with label", () => {
    render(<ActionOptions label="Ações" />);
    expect(screen.getByText("Ações")).toBeInTheDocument();
  });

  it("should render trigger with icon", () => {
    render(<ActionOptions icon={<span data-testid="icon">⚙️</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should open menu and render items when trigger is clicked", async () => {
    const items: Option[] = [
      { id: 1, label: "Editar", type: "item" },
      { id: 2, label: "Excluir", type: "item" },
    ];

    render(
      <ActionOptions
        label="Ações"
        items={items}
      />
    );

    // Abre o menu
    await userEvent.click(screen.getByText("Ações"));

    // Itens aparecem
    expect(await screen.findByText("Editar")).toBeInTheDocument();
    expect(await screen.findByText("Excluir")).toBeInTheDocument();
  });

  it("should call onClick when item is clicked", async () => {
    const handleClick = vi.fn();
    const items: Option[] = [{ id: 1, label: "Editar", type: "item", onClick: handleClick }];

    render(
      <ActionOptions
        label="Ações"
        items={items}
      />
    );

    // Abre o menu
    await userEvent.click(screen.getByText("Ações"));

    // Clica no item
    const item = await screen.findByText("Editar");
    await userEvent.click(item);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render dialog type items correctly", async () => {
    const items: Option[] = [{ id: 1, label: "Abrir diálogo", type: "dialog" }];

    render(
      <ActionOptions
        label="Mais"
        items={items}
      />
    );

    // Abre o menu
    await userEvent.click(screen.getByText("Mais"));

    // Agora deve encontrar pelo texto normalmente
    expect(await screen.findByText("Abrir diálogo")).toBeInTheDocument();
  });

  it("should not render items when items prop is empty", async () => {
    render(
      <ActionOptions
        label="Sem itens"
        items={[]}
      />
    );

    // Abre o menu
    await userEvent.click(screen.getByText("Sem itens"));

    // Não deve haver nenhum item no menu
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });
});
