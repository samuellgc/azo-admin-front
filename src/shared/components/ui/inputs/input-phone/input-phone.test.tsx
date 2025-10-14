// path: src/shared/components/ui/inputs/input-phone/InputPhone.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { InputPhone } from ".";

function Wrapper() {
  const [phone, setPhone] = useState("");
  return (
    <InputPhone
      value={phone}
      onChange={setPhone}
      label="Telefone"
      placeholder="Informe seu telefone"
    />
  );
}

describe("<InputPhone />", () => {
  it("deve renderizar o input", () => {
    render(
      <InputPhone
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("deve aplicar a formatação de telefone para 11 dígitos", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "11987654321" } });

    expect(input.value).toBe("(11) 98765-4321");
  });

  it("deve aplicar a formatação de telefone para 10 dígitos", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "1123456789" } });

    expect(input.value).toBe("(11) 2345-6789");
  });

  it("deve ignorar caracteres não numéricos", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "11a987b6543-21" } });

    expect(input.value).toBe("(11) 98765-4321");
  });

  it("deve chamar onChange com o valor já formatado", () => {
    const onChange = vi.fn();
    render(
      <InputPhone
        value=""
        onChange={onChange}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "11987654321" } });

    expect(onChange).toHaveBeenCalledWith("(11) 98765-4321");
  });

  it("deve exibir o valor controlado já formatado quando passado via prop", () => {
    render(
      <InputPhone
        value="11987654321"
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("(11) 98765-4321");
  });

  it("deve exibir label e helperText quando fornecidos", () => {
    render(
      <InputPhone
        value=""
        onChange={() => {}}
        label="Telefone"
        helperText={{ text: "Informe seu telefone" }}
      />
    );

    expect(screen.getByText("Telefone")).toBeInTheDocument();
    expect(screen.getByText("Informe seu telefone")).toBeInTheDocument();
  });

  it("deve definir inputMode='numeric' e maxLength=15", () => {
    render(
      <InputPhone
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input).toHaveAttribute("maxlength", "15");
  });
});
