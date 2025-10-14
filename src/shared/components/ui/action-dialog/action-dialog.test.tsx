import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { ActionDialog } from "./index";
import { Button } from "@/shared/components/shadcn/ui/button";

describe("ActionDialog", () => {
  it("renderiza trigger e abre modal ao clicar", () => {
    render(
      <ActionDialog
        trigger={<Button>Abrir</Button>}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.queryByText("Tem certeza que deseja excluir este cadastro?")).toBeNull();

    fireEvent.click(screen.getByText("Abrir"));

    expect(screen.getByText("Tem certeza que deseja excluir este cadastro?")).toBeInTheDocument();
  });

  it("chama onCancel ao clicar em cancelar", () => {
    const onCancel = vi.fn();
    render(
      <ActionDialog
        trigger={<Button>Abrir</Button>}
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText("Abrir"));
    fireEvent.click(screen.getByText("Cancelar"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("executa onConfirm síncrono e fecha modal", async () => {
    const onConfirm = vi.fn();

    render(
      <ActionDialog
        trigger={<Button>Abrir</Button>}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByText("Abrir"));
    fireEvent.click(screen.getByText("Confirmar"));

    expect(onConfirm).toHaveBeenCalled();

    await waitFor(() => expect(screen.queryByText("Tem certeza que deseja excluir este cadastro?")).toBeNull());
  });
});
