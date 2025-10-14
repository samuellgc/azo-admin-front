import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputCurrency } from "./";
import { describe, it, expect } from "vitest";
import { useState } from "react";

describe("InputCurrency Component", () => {
  it("should render the input with a label", () => {
    render(
      <InputCurrency
        label="Valor"
        placeholder="R$ 0,00"
      />
    );
    expect(screen.getByText("Valor")).toBeInTheDocument();
  });

  it("should format the input value as currency", async () => {
    const ControlledInput = () => {
      const [value, setValue] = useState<number | undefined>(0);
      return (
        <InputCurrency
          label="Valor"
          id="input-currency"
          placeholder="R$ 0,00"
          value={value}
          onChange={val => setValue(val)}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByPlaceholderText("R$ 0,00");

    fireEvent.change(input, { target: { value: 123400 } });
    expect(input).toHaveValue("R$ 1.234,00");
  });

  it("should call onChange when the value changes", async () => {
    const handleChange = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = useState<number | undefined>(0);
      return (
        <InputCurrency
          label="Valor"
          id="input-currency"
          value={value}
          onChange={val => {
            setValue(val);
            handleChange(val);
          }}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByLabelText("Valor");

    await userEvent.type(input, "500");
    expect(handleChange).toHaveBeenCalled();
  });
});
