import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputCpf } from ".";
import { useState } from "react";

/**
 * Componente wrapper que simula um campo CPF controlado via estado.
 * Utilizado para testar a formatação e atualização de valor.
 */
function ControlledInput() {
  const [cpf, setCpf] = useState("");
  return (
    <InputCpf
      value={cpf}
      onChange={setCpf}
      label="CPF"
      placeholder="Digite seu CPF"
    />
  );
}

describe("<InputCpf />", () => {
  /**
   * Testa se o componente renderiza corretamente o label e o texto auxiliar (helperText).
   */
  it("renderiza com label e helper text", () => {
    render(
      <InputCpf
        value=""
        onChange={() => {}}
        label="CPF"
        placeholder="Digite seu CPF"
      />
    );
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu CPF")).toBeInTheDocument();
  });

  /**
   * Testa se o valor digitado no input é formatado corretamente como CPF (XXX.XXX.XXX-XX).
   */
  it("formata corretamente um CPF ao digitar", () => {
    render(<ControlledInput />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "12345678901" } });
    expect(input).toHaveValue("123.456.789-01");
  });

  /**
   * Testa se o onChange é chamado com o valor do CPF já formatado.
   */
  it("chama onChange com CPF formatado", () => {
    const handleChange = vi.fn();
    render(
      <InputCpf
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "98765432100" } });
    expect(handleChange).toHaveBeenCalledWith("987.654.321-00");
  });

  /**
   * Testa se o campo limita corretamente a entrada a 11 dígitos numéricos (formato do CPF).
   */
  it("limita o valor a 11 dígitos numéricos", () => {
    render(<ControlledInput />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "1234567890123456" } });
    expect(input).toHaveValue("123.456.789-01"); // apenas os 11 primeiros dígitos
  });
});
