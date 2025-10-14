import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DataTable from "./index"; // agora é export default

const columns = [
  { key: "name", label: "Nome" },
  { key: "age", label: "Idade" },
];

const data = [
  { name: "Samuel", age: 27 },
  { name: "Ana", age: 31 },
];

describe("DataTable Component", () => {
  it("should render table headers and rows", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
      />
    );

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Idade")).toBeInTheDocument();
    expect(screen.getByText("Samuel")).toBeInTheDocument();
    expect(screen.getByText("27")).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("31")).toBeInTheDocument();
  });

  it("should call onSortingChange when clicking sortable column", () => {
    const onSortingChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        enableSorting
        onSortingChange={onSortingChange}
      />
    );

    const header = screen.getByText("Nome");
    fireEvent.click(header);

    expect(onSortingChange).toHaveBeenCalled();
  });

  it("should call onRowSelectionChange when selecting a row", () => {
    const onRowSelectionChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        enableRowSelection
        onRowSelectionChange={onRowSelectionChange}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(checkbox);

    expect(onRowSelectionChange).toHaveBeenCalled();
  });

  it("should call onPageChange when clicking pagination buttons", () => {
    const onPageChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        enablePagination
        pagination={{
          currentPage: 1,
          totalPages: 2,
          start: 1,
          end: 2,
          perPage: 10, // ✅ voltou para perPage
          totalItems: 2,
        }}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: /próxima página/i });
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should disable previous button on first page", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        enablePagination
        pagination={{
          currentPage: 1,
          totalPages: 2,
          start: 1,
          end: 2,
          perPage: 10, // ✅ aqui também
          totalItems: 2,
        }}
      />
    );

    const prevButton = screen.getByRole("button", { name: /página anterior/i });
    expect(prevButton).toBeDisabled();
  });
});
