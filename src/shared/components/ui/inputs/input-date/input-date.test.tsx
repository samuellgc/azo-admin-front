import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputDate } from "./";
import { describe, it, expect } from "vitest";
import { useState } from "react";

describe("InputDate Component", () => {
  it("should render the input with a label", () => {
    render(
      <InputDate
        label="Data"
        placeholder="DD/MM/AAAA"
      />
    );
    expect(screen.getByText("Data")).toBeInTheDocument();
  });

  it("should display the placeholder when no value is selected", () => {
    render(
      <InputDate
        label="Data"
        placeholder="DD/MM/AAAA"
      />
    );
    const button = screen.getByRole("button", { name: /DD\/MM\/AAAA/i });
    expect(button).toBeInTheDocument();
  });

  it("should display the selected date in the correct format", async () => {
    // Fixa o "agora" em 2025-09-01
    vi.setSystemTime(new Date(2025, 8, 1, 0, 0, 0));
    const ControlledInput = () => {
      const [value, setValue] = useState<Date | undefined>(undefined);
      return (
        <InputDate
          label="Data"
          placeholder="DD/MM/AAAA"
          value={value}
          onChange={date => setValue(date)}
        />
      );
    };

    render(<ControlledInput />);
    const button = screen.getByRole("button", { name: /DD\/MM\/AAAA/i });

    // Simulate opening the calendar and selecting a date
    await userEvent.click(button);
    const day = screen.getByText("15"); // Assuming "15" is a valid day in the calendar
    await userEvent.click(day);

    expect(button).toHaveTextContent("15/09/2025");

    vi.useRealTimers(); // volta ao normal
  });

  it("should call onChange when a date is selected", async () => {
    const handleChange = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = useState<Date | undefined>(undefined);
      return (
        <InputDate
          label="Data"
          value={value}
          placeholder="DD/MM/AAAA"
          onChange={date => {
            setValue(date);
            handleChange(date);
          }}
        />
      );
    };

    render(<ControlledInput />);
    const button = screen.getByRole("button", { name: /DD\/MM\/AAAA/i });

    // Simulate opening the calendar and selecting a date
    await userEvent.click(button);
    const day = screen.getByText("15"); // Assuming "15" is a valid day in the calendar
    await userEvent.click(day);

    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
