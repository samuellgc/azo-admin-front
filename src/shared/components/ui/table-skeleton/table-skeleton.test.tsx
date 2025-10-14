import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TableSkeleton } from "@/shared/components/ui/table-skeleton";

describe("TableSkeleton", () => {
  it("should render default number of rows and columns", () => {
    render(<TableSkeleton />);

    // 10 linhas (default)
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(11); // 1 header + 10 rows

    // 6 colunas (default)
    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells).toHaveLength(6);

    // cada linha tem 6 células
    const bodyCells = screen.getAllByRole("cell");
    expect(bodyCells.length % 6).toBe(0);
  });

  it("should render custom number of rows and columns", () => {
    render(
      <TableSkeleton
        rows={5}
        cols={3}
      />
    );

    // 1 header + 5 rows
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(6);

    // 3 colunas no header
    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells).toHaveLength(3);

    // 5 * 3 = 15 células no body
    const bodyCells = screen.getAllByRole("cell");
    expect(bodyCells).toHaveLength(15);
  });

  it("should render skeletons in header and body cells", () => {
    render(
      <TableSkeleton
        rows={2}
        cols={2}
      />
    );

    // skeletons no header
    const headerSkeletons = screen.getAllByRole("columnheader")[0].querySelectorAll(".h-4.w-24");
    expect(headerSkeletons.length).toBeGreaterThan(0);

    // skeletons no body
    const bodySkeletons = screen.getAllByRole("cell")[0].querySelectorAll(".h-8.w-full");
    expect(bodySkeletons.length).toBeGreaterThan(0);
  });
});
