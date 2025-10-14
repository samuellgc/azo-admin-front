import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputText } from "./";
import { describe, it, expect } from "vitest";
import { useState } from "react";

describe("InputText Component", () => {
  it("should render the input with a label", () => {
    render(
      <InputText
        label="Texto"
        placeholder="Digite algo"
      />
    );
    expect(screen.getByText("Texto")).toBeInTheDocument();
  });

  it("should allow text input", async () => {
    const ControlledInput = () => {
      const [value, setValue] = useState("");
      return (
        <InputText
          label="Texto"
          placeholder="Digite algo"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByPlaceholderText("Digite algo");

    await userEvent.type(input, "Olá Mundo");
    expect(input).toHaveValue("Olá Mundo");
  });

  it("should call onChange when the value changes", async () => {
    const handleChange = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = useState("");
      return (
        <InputText
          label="Texto"
          value={value}
          id="input-text"
          onChange={e => {
            setValue(e.target.value);
            handleChange(e);
          }}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByLabelText("Texto");

    await userEvent.type(input, "Teste");
    expect(handleChange).toHaveBeenCalled();
  });
});
