import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputNumber } from "./";
import { describe, it, expect } from "vitest";
import { useState } from "react";

describe("InputNumber Component", () => {
  it("should render the input with a label", () => {
    render(
      <InputNumber
        label="Número"
        placeholder="Digite um número"
      />
    );
    expect(screen.getByText("Número")).toBeInTheDocument();
  });

  it("should allow only numeric input", async () => {
    const ControlledInput = () => {
      const [value, setValue] = useState<undefined | number>(0);
      return (
        <InputNumber
          label="Número"
          placeholder="Digite um número"
          value={value}
          onChange={val => setValue(val)}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByPlaceholderText("Digite um número");

    fireEvent.change(input, { target: { value: 1234 } });

    expect(input).toHaveValue("1234");
  });

  it("should call onChange when the value changes", async () => {
    const handleChange = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = useState<undefined | number>(0);
      return (
        <InputNumber
          label="Número"
          id="number-input"
          value={value}
          onChange={val => {
            setValue(val);
            handleChange(val);
          }}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByLabelText("Número");

    await userEvent.type(input, "456");
    expect(handleChange).toHaveBeenCalled();
  });
});
