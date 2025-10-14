/** biome-ignore-all lint/suspicious/noArrayIndexKey: <only for fallback screen> */
"use client";

import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Stack } from "@/shared/components/ui/stack";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";

export function TableSkeleton({ rows = 10, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <Stack gap="1">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            {Array.from({ length: cols }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-24 rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-8 w-full rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}
