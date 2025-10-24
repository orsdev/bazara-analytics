import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState
} from '@tanstack/react-table';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  total?: number;
  page: number;
  columnFilters?: ColumnFiltersState;
  manualPagination?: boolean;
  onFilterChange?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onGlobalFilterChange?(val: string): void;
}

const emptyArray: never[] = []; // Fixes table.getRowModel().rows multiple rendering

const defaultPageSize = 10;

export const useTable = <TData>({
  columns,
  data,
  total,
  page,
  onGlobalFilterChange,
  onFilterChange,
  columnFilters = emptyArray,
  manualPagination = true,
  pageSize = defaultPageSize
}: DataTableProps<TData>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? emptyArray,
    columns,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize
      },
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    manualPagination,
    rowCount: total,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: onFilterChange,
    onGlobalFilterChange: onGlobalFilterChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  const hasTableData = data && data?.length > 0;

  return {
    hasTableData,
    table,
    pageSize,
    manualPagination
  };
};
