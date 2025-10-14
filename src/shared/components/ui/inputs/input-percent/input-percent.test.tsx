import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputPercent } from "./";
import { describe, it, expect } from "vitest";
import { useState } from "react";

describe("InputPercent Component", () => {
  it("should render the input with a label", () => {
    render(
      <InputPercent
        label="Percentual"
        placeholder="0,00%"
      />
    );
    expect(screen.getByText("Percentual")).toBeInTheDocument();
  });

  it("should format the input value as a percentage", async () => {
    const ControlledInput = () => {
      const [value, setValue] = useState<number | undefined>(0);
      return (
        <InputPercent
          label="Percentual"
          placeholder="0,00%"
          value={value}
          onChange={val => setValue(val)}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByPlaceholderText("0,00%");

    fireEvent.change(input, { target: { value: 123400 } });

    expect(input).toHaveValue("1.234,00%");
  });

  it("should call onChange when the value changes", async () => {
    const handleChange = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = useState<number | undefined>(0);
      return (
        <InputPercent
          label="Percentual"
          id="input-percent"
          value={value}
          onChange={val => {
            setValue(val);
            handleChange(val);
          }}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByLabelText("Percentual");

    await userEvent.type(input, "50");
    expect(handleChange).toHaveBeenCalled();
  });
});
