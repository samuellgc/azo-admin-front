import { render, screen } from "@testing-library/react";
import { SimpleTable } from "./index";
import { describe, it, expect } from "vitest";
import { Button } from "@/shared/components/shadcn/ui/button";

describe("SimpleTable Component", () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "actions", label: "Actions", render: (row: { name: string }) => <Button>Delete {row.name}</Button> },
  ];

  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ];

  it("should render the table headers", () => {
    render(
      <SimpleTable
        columns={columns}
        data={data}
      />
    );

    columns.forEach(col => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });
  });

  it("should render the table rows and cells", () => {
    render(
      <SimpleTable
        columns={columns}
        data={data}
      />
    );

    data.forEach(row => {
      expect(screen.getByText(row.id.toString())).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age.toString())).toBeInTheDocument();
    });
  });

  it("should render custom cell content using the render function", () => {
    render(
      <SimpleTable
        columns={columns}
        data={data}
      />
    );

    data.forEach(row => {
      expect(screen.getByText(`Delete ${row.name}`)).toBeInTheDocument();
    });
  });

  it("should handle empty data gracefully", () => {
    render(
      <SimpleTable
        columns={columns}
        data={[]}
      />
    );

    // Ensure the table renders headers but no rows
    columns.forEach(col => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });
});
