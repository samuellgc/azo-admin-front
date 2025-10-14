/** biome-ignore-all lint/suspicious/noExplicitAny: <é um componente dinâmico> */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";

type Column<T> = {
  key: keyof T | string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface SimpleTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function SimpleTable<T extends Record<string, any>>({ columns, data }: SimpleTableProps<T>) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead
              key={String(col.key)}
              className={col.className}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map(row => (
          <TableRow key={row.id}>
            {columns.map(col => (
              <TableCell
                key={String(col.key)}
                className={col.className}
              >
                {col.render ? col.render(row) : row[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
