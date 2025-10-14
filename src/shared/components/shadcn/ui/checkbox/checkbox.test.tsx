import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./index";

describe("Checkbox Component", () => {
  it("should render the checkbox", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("should render as checked when defaultChecked is true", () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("should toggle state when clicked (uncontrolled)", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    // estado inicial
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    // clicar -> checked
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");

    // clicar -> unchecked novamente
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("should call onCheckedChange when toggled (controlled)", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        onCheckedChange={handleChange}
      />
    );
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("should show aria-invalid when invalid", () => {
    render(<Checkbox aria-invalid="true" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });
});
