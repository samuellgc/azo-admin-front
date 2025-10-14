import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from ".";

describe("Input Component", () => {
  /**
   * Teste para verificar se o componente Input é renderizado com as propriedades padrão.
   */
  it("should render the input with default props", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      "w-full outline-none text-gray-6 border-none placeholder:text-sm h-10 bg-background border border-gray-3 rounded px-4 hover:border-gray-5 focus:border-green-7"
    );
  });

  /**
   * Teste para verificar se uma classe CSS personalizada é aplicada corretamente.
   */
  it("should apply custom className", () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-class");
  });

  /**
   * Teste para verificar se o tipo do input é renderizado corretamente como "password".
   */
  it("should render with type 'password'", () => {
    render(
      <Input
        placeholder="Coloque sua senha"
        type="password"
      />
    );
    const inputElement = screen.getByPlaceholderText("Coloque sua senha");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  /**
   * Teste para verificar se os estilos de isWrapped são aplicados corretamente.
   */
  it("should render with isWrapped styles when isWrapped is true", () => {
    render(<Input isWrapped />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).not.toHaveClass(
      "h-10 bg-background border border-gray-3 rounded px-4 hover:border-gray-5 focus:border-green-7"
    );
  });

  /**
   * Teste para verificar se os estilos de disabled são aplicados corretamente.
   */
  it("should render with disabled styles when disabled is true", () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("bg-gray-4 border-gray-3");
  });

  /**
   * Teste para verificar se o evento onChange é chamado ao digitar no input.
   */
  it("should call onChange when typing", async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "test");
    expect(handleChange).toHaveBeenCalledTimes(4); // Chamado para cada caractere digitado
  });

  /**
   * Teste para verificar se o placeholder é renderizado corretamente.
   */
  it("should render placeholder text", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  /**
   * Teste para verificar se o input aceita valores digitados.
   */
  it("should accept input value", async () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "Hello");
    expect(inputElement).toHaveValue("Hello");
  });

  /**
   * Teste para verificar se o input respeita o atributo `maxLength`.
   */
  it("should respect maxLength attribute", async () => {
    render(<Input maxLength={5} />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "HelloWorld");
    expect(inputElement).toHaveValue("Hello");
  });

  /**
   * Teste para verificar se o input dispara o evento onFocus.
   */
  it("should trigger onFocus event", async () => {
    const handleFocus = vi.fn();
    render(<Input onFocus={handleFocus} />);
    const inputElement = screen.getByRole("textbox");
    inputElement.focus();
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  /**
   * Teste para verificar se o input dispara o evento onBlur.
   */
  it("should trigger onBlur event", async () => {
    const handleBlur = vi.fn();
    render(<Input onBlur={handleBlur} />);
    const inputElement = screen.getByRole("textbox");
    inputElement.focus();
    inputElement.blur();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  /**
   * Teste para verificar se o input dispara o evento onBlur.
   */
  it("should call onChange when typing", async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "test");
    expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character typed
  });

  /**
   * Teste para verificar se o input renderiza o placeholder corretamente.
   */
  it("should render placeholder text", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });
});
