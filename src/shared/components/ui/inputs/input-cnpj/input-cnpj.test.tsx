import { describe, it, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { InputCnpj } from ".";
import { useState } from "react";

function Wrapper() {
  const [cnpj, setCnpj] = useState("");
  return (
    <InputCnpj
      value={cnpj}
      onChange={value => setCnpj(value)}
    />
  );
}

describe("<InputCnpj />", () => {
  it("deve renderizar o input", () => {
    render(
      <InputCnpj
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  describe("<InputCnpj />", () => {
    it("deve aplicar a formatação de CNPJ corretamente", () => {
      render(<Wrapper />);

      const input = screen.getByRole("textbox") as HTMLInputElement;

      fireEvent.change(input, { target: { value: "12345678000195" } });

      expect(input.value).toBe("12.345.678/0001-95");
    });
  });

  it("deve limitar a entrada a 14 dígitos numéricos", () => {
    render(
      <InputCnpj
        value="12345678901234567890"
        onChange={() => {}}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("12.345.678/9012-34");
  });
});
