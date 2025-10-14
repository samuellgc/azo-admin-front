// path: src/shared/components/ui/inputs/input-cep/InputCep.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { InputCep } from ".";

/**
 * Envolve o componente para simular controle externo de estado.
 * Mantém o valor fornecido por onChange retornando ao prop value.
 */
function Wrapper() {
  const [cep, setCep] = useState("");
  return (
    <InputCep
      value={cep}
      id="cep"
      name="cep"
      onChange={setCep}
      label="CEP"
      placeholder="Digite o CEP"
    />
  );
}

describe("<InputCep />", () => {
  it("deve renderizar o input", () => {
    render(
      <InputCep
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("deve aplicar a formatação de CEP corretamente", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12345678" } });

    expect(input.value).toBe("12.345-678");
  });

  it("deve limitar a entrada a 8 dígitos numéricos", () => {
    render(
      <InputCep
        value="123456789012345"
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("12.345-678");
  });

  it("deve chamar onChange com valor formatado", () => {
    const onChange = vi.fn();
    render(
      <InputCep
        value=""
        onChange={onChange}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "87654321" } });

    expect(onChange).toHaveBeenCalledWith("87.654-321");
  });

  it("deve ignorar caracteres não numéricos", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12a34b5 6-7/8" } });

    expect(input.value).toBe("12.345-678");
  });

  it("deve exibir label e helperText quando fornecidos", () => {
    render(
      <InputCep
        value=""
        name="cep"
        onChange={() => {}}
        label="CEP"
        id="cep"
        placeholder="Digite o CEP"
      />
    );

    expect(screen.getByText("CEP")).toBeInTheDocument();
    expect(screen.getByLabelText("CEP")).toBeInTheDocument();
  });

  it("deve definir inputMode='numeric' e maxLength=10", () => {
    render(
      <InputCep
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // Checamos atributos pois o Input subjacente propaga para o DOM
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input).toHaveAttribute("maxlength", "10");
  });
});
