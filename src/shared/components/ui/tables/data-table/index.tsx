/** biome-ignore-all lint/suspicious/noExplicitAny: <Shared component> */
"use client";

import React, { useMemo, useCallback } from "react";
import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";
import { Checkbox } from "@/shared/components/shadcn/ui/checkbox";
import { Button } from "@/shared/components/shadcn/ui/button";
import { cn } from "@/shared/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import type { DataTableProps } from "./type";

/**
 * DataTable - Componente de tabela genérica com suporte a:
 *
 * - **Sorting (Ordenação)**: permite ordenar colunas ao clicar no cabeçalho.
 * - **Row Selection (Seleção de linhas)**: checkboxes individuais e "selecionar todos".
 * - **Pagination (Paginação)**: exibe botões de navegação e contador de itens.
 * - **Performance**: memoização das colunas (`useMemo`), dos handlers (`useCallback`) e exportação com `React.memo`.
 *
 * @template T Tipo dos itens da tabela.
 *
 * @param {DataTableProps<T>} props
 * @param {Array<{ key: keyof T; label: string; render?: (row: T) => React.ReactNode; className?: string; cellClassName?: string }>} props.columns
 *   Definição das colunas da tabela.
 * @param {T[]} props.data Lista de dados exibidos na tabela.
 * @param {boolean} [props.enableSorting=false] Habilita a ordenação ao clicar no cabeçalho.
 * @param {boolean} [props.enablePagination=false] Habilita a paginação no rodapé.
 * @param {boolean} [props.enableRowSelection=false] Habilita a seleção de linhas com checkboxes.
 * @param {object} [props.pagination] Configurações de paginação (página atual, total de itens, etc).
 * @param {Array} [props.sorting=[]] Estado controlado de ordenação.
 * @param {(sorting: any) => void} [props.onSortingChange] Callback disparado ao alterar ordenação.
 * @param {object} [props.rowSelection={}] Estado controlado da seleção de linhas.
 * @param {(selection: any) => void} [props.onRowSelectionChange] Callback disparado ao alterar seleção de linhas.
 * @param {(page: number) => void} [props.onPageChange] Callback disparado ao mudar de página.
 *
 */
function DataTableComponent<T>({
  columns,
  data,
  enableSorting = false,
  enablePagination = false,
  enableRowSelection = false,
  pagination,
  sorting = [],
  onSortingChange,
  rowSelection = {},
  onRowSelectionChange,
  onPageChange,
}: DataTableProps<T>) {
  /**
   * Memoiza as colunas convertidas para `ColumnDef`.
   * Isso evita recriar os objetos a cada render e melhora performance.
   */
  const columnDefs: ColumnDef<T>[] = useMemo(
    () =>
      columns.map(col => ({
        accessorKey: col.key as string,
        header: () => col.label,
        cell: ({ row }) => (col.render ? col.render(row.original) : (row.original as any)[col.key]),
      })),
    [columns]
  );

  /**
   * Memoiza os handlers para não recriar funções a cada render.
   */
  const handleSortingChange = useCallback(
    (updater: any) => {
      const newSorting = typeof updater === "function" ? updater(sorting ?? []) : updater;
      onSortingChange?.(newSorting);
    },
    [sorting, onSortingChange]
  );

  const handleRowSelectionChange = useCallback(
    (updater: any) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection ?? {}) : updater;
      onRowSelectionChange?.(newSelection);
    },
    [rowSelection, onRowSelectionChange]
  );

  /**
   * Instância da tabela gerenciada pelo `useReactTable`.
   *
   * - `data`: os dados que vão preencher a tabela.
   * - `columns`: definição das colunas convertidas para o formato esperado pelo React Table.
   * - `state`: estado controlado da tabela (ordenação e seleção de linhas).
   * - `enableSorting`: habilita ou não a ordenação de colunas.
   * - `enableRowSelection`: habilita ou não a seleção de linhas (checkbox).
   * - `onSortingChange`: callback chamado sempre que a ordenação mudar.
   * - `onRowSelectionChange`: callback chamado sempre que a seleção mudar.
   * - `getCoreRowModel`: método obrigatório para calcular o modelo base de linhas.
   */
  const table = useReactTable({
    data,
    columns: columnDefs,
    state: { sorting, rowSelection },
    enableSorting,
    enableRowSelection,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* Cabeçalho da tabela */}
      <Table className="table-fixed w-full">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-gray-3"
            >
              {enableRowSelection && (
                <TableHead className="text-left py-3">
                  <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
                  />
                </TableHead>
              )}
              {headerGroup.headers.map(header => {
                const colDef = columns.find(c => c.key === header.column.id);
                return (
                  <TableHead
                    key={header.id}
                    className="py-3 cursor-pointer select-none"
                    onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <Stack
                      direction="row"
                      alignment="center"
                      gap="1"
                      className={cn(colDef?.className)}
                    >
                      {colDef?.label}
                      {colDef?.label &&
                        enableSorting &&
                        (header.column.getIsSorted() === "asc" ? (
                          <ChevronUp size={14} />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ChevronDown size={14} />
                        ) : (
                          <ChevronsUpDown
                            size={14}
                            className="rotate-180 opacity-50"
                          />
                        ))}
                    </Stack>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Corpo da tabela */}
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className={cn("border-b border-gray-3", (row.original as any).rowClassName)}
            >
              {enableRowSelection && (
                <TableCell className="text-left py-4">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={v => row.toggleSelected(!!v)}
                  />
                </TableCell>
              )}
              {columns.map(col => (
                <TableCell
                  key={String(col.key)}
                  className={cn("py-4 text-left", col.cellClassName)}
                >
                  {col.render ? col.render(row.original as T) : (row.original as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      {enablePagination && pagination && pagination.totalPages > 1 && (
        <Stack
          direction="row"
          alignment="center"
          justify="end"
          className="pt-4 pb-0"
          gap="1"
        >
          <Typography variant="auxiliary">{`${pagination.start}-${pagination.end} de ${pagination.totalItems}`}</Typography>
          <Stack
            direction="row"
            alignment="center"
            gap="0"
          >
            <Button
              variant="ghost"
              aria-label="Página anterior"
              className={cn(
                "!bg-transparent size-fit hover:cursor-pointer !text-gray-7",
                pagination.currentPage <= 1 && "!text-gray-5"
              )}
              onClick={() => onPageChange?.(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="ghost"
              aria-label="Próxima página"
              className={cn(
                "!bg-transparent size-fit hover:cursor-pointer !text-gray-7",
                pagination.currentPage >= pagination.totalPages && "!text-gray-5"
              )}
              onClick={() => onPageChange?.(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </Stack>
        </Stack>
      )}
    </div>
  );
}

/**
 * Exporta memoizado para evitar re-renderizações desnecessárias.
 * O componente só será re-renderizado se as props realmente mudarem.
 */
const DataTable = React.memo(DataTableComponent) as typeof DataTableComponent;
export default DataTable;
