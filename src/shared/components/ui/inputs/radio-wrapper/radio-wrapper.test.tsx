import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioWrapper } from "./index";
import { describe, it, expect } from "vitest";
import { useState } from "react";

describe("RadioWrapper Component", () => {
  const items = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("should render the label", () => {
    render(
      <RadioWrapper
        label="Choose an option"
        items={items}
      />
    );
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("should render all radio options", () => {
    render(
      <RadioWrapper
        label="Choose an option"
        items={items}
      />
    );
    items.forEach(item => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
    });
  });

  it("should select the default value", () => {
    const ControlledRadioWrapper = () => {
      const [value, setValue] = useState("option2");
      return (
        <RadioWrapper
          label="Choose an option"
          items={items}
          value={value}
          onChange={setValue}
        />
      );
    };

    render(<ControlledRadioWrapper />);
    const defaultOption = screen.getByLabelText("Option 2");
    expect(defaultOption).toBeChecked();
  });

  it("should call onChange when a radio option is selected", async () => {
    const ControlledRadioWrapper = () => {
      const [value, setValue] = useState("option1");
      return (
        <RadioWrapper
          label="Choose an option"
          items={items}
          value={value}
          onChange={setValue}
        />
      );
    };

    render(<ControlledRadioWrapper />);
    const option2 = screen.getByLabelText("Option 2");
    await userEvent.click(option2);

    expect(option2).toBeChecked();
  });

  it("should render helper text if provided", () => {
    render(
      <RadioWrapper
        label="Choose an option"
        items={items}
        helperText={{ text: "This is a helper text", variant: "auxiliary" }}
      />
    );
    expect(screen.getByText("This is a helper text")).toBeInTheDocument();
  });
});
