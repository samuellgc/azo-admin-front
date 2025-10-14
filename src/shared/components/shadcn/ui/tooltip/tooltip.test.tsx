import { render, screen } from "@testing-library/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./index";
import { describe, it, expect } from "vitest";

describe("Componente Tooltip", () => {
  it("deve renderizar o trigger do tooltip", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    expect(trigger).toBeInTheDocument();
  });

  it("não deve exibir o conteúdo quando não está em hover", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    );

    const content = screen.queryByText("Tooltip content");
    expect(content).not.toBeInTheDocument();
  });
});
