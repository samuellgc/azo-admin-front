import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from ".";

// Mock do componente `cn`
vi.mock("@/shared/lib/utils", () => ({
  cn: vi.fn((...args) => args.join(" ")),
}));

beforeAll(() => {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.scrollIntoView = () => {};
});

describe("Select", () => {
  /**
   * @test Renderiza o componente raiz
   * @description Verifica se o `Select` renderiza sem erros.
   */
  test("renders the root component", () => {
    render(
      <Select>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test Item</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});

describe("SelectTrigger", () => {
  /**
   * @test Abre e fecha o menu ao clicar
   * @description Verifica se o `SelectTrigger` abre e fecha o `SelectContent` ao ser clicado.
   */
  test("opens and closes the menu on click", async () => {
    const user = userEvent.setup({});
    render(
      <Select>
        <SelectTrigger>Open Select</SelectTrigger>
        <SelectContent>
          <SelectItem value="item1">Item 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText("Open Select");
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();

    await user.click(trigger);
    const item1 = await screen.findByText("Item 1");
    expect(item1).toBeInTheDocument();

    // Clicar novamente para fechar
    await user.click(item1);
    await waitFor(() => {
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    });
  });
});

describe("SelectValue", () => {
  /**
   * @test Exibe o placeholder quando nenhum valor é selecionado
   * @description Verifica se o `SelectValue` exibe o placeholder quando nenhum valor é selecionado.
   */
  test("displays placeholder when no value is selected", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });
});

describe("SelectContent", () => {
  /**
   * @test Renderiza o conteúdo do menu
   * @description Verifica se o `SelectContent` renderiza seus filhos quando o Select está aberto.
   */
  test("renders menu content", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent>
          <SelectItem value="item">Content Item</SelectItem>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Content Item")).toBeInTheDocument();
  });
});

describe("SelectItem", () => {
  /**
   * @test Renderiza e é selecionável
   * @description Verifica se o `SelectItem` renderiza e pode ser selecionado.
   */
  test("renders and is selectable", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select
        onValueChange={handleChange}
        open
      >
        <SelectTrigger>Select</SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    // Espera até que o item apareça no DOM
    const option1 = await screen.findByText("Option 1");
    await user.click(option1);

    expect(handleChange).toHaveBeenCalledWith("option1");
    expect(await screen.findByText("Option 1")).toBeInTheDocument(); // selecionado
  });

  /**
   * @test Renderiza desabilitado
   * @description Verifica se o `SelectItem` é renderizado como desabilitado e não é clicável.
   */
  test("renders disabled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select onValueChange={handleChange}>
        <SelectTrigger>Select</SelectTrigger>
        <SelectContent>
          <SelectItem
            value="option1"
            disabled
          >
            Disabled Option
          </SelectItem>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByText("Select"));
    const disabledOption = await screen.findByText("Disabled Option");
    await user.click(disabledOption);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
