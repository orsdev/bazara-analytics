import {
  type ColumnDef,
  type Table as ReactTable,
  flexRender
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoveDown,
  MoveUp
} from 'lucide-react';
import { cn } from '@/lib';
import { Button } from '../buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './table';
import { Skeleton } from '../skeleton';
import { Spinner } from '../spinner';
import { NoDataSVGIcon } from '../icons';

interface CustomTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  tbodyClassName?: string;
  contentClassName?: string;
  showPagination?: boolean;
  table: ReactTable<TData>;
  isLoading?: boolean;
  isRefetching?: boolean;
  handleGoToFirstPage: () => void;
  handleGoToPrevPage: () => void;
  handleGoToNextPage: () => void;
  handleGoToLastPage: () => void;
}

export function CustomTable<TData>({
  columns,
  tbodyClassName,
  table,
  contentClassName,
  handleGoToFirstPage,
  handleGoToPrevPage,
  handleGoToNextPage,
  handleGoToLastPage,
  showPagination = false,
  isRefetching = false,
  isLoading = false
}: CustomTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const isRowGreaterThan10 = rows?.length > 10;

  const renderSkeletonRows = () => (
    <>
      {Array.from(new Array(4).fill(123456)).map((_, index) => {
        const key = `skeleton-row-${index}`;
        return (
          <TableRow key={key} className="relative z-0">
            {table.getVisibleLeafColumns().map((column) => (
              <TableCell key={column.id}>
                <Skeleton className="px-[16px] py-[20px]" />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );

  const hasData = table.getRowModel().rows?.length > 0;
  const displayPagination = showPagination && hasData && !isLoading;

  return (
    <>
      <div
        className={cn(
          'relative w-full overflow-y-auto h-auto',
          {
            'h-[605px] rounded-bl-[8px] rounded-br-[8px]': isRowGreaterThan10
          },
          contentClassName
        )}
      >
        <Table className="w-full">
          {/* Table Header */}
          <TableHeader className="sticky top-0 z-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnDef = header.column.columnDef;
                  const isSortable = columnDef.enableSorting;

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'px-2 py-3 text-sm font-bold bg-primary border-separate first:rounded-tl-[8px] last:rounded-tr-[8px]',
                        {
                          'cursor-pointer select-none': isSortable
                        }
                      )}
                      onClick={() => {
                        if (isSortable) {
                          header.column.toggleSorting();
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 text-white">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {isSortable && (
                          <>
                            {{
                              asc: <MoveUp size={16} />,
                              desc: <MoveDown size={16} />
                            }[header.column.getIsSorted() as string] ?? (
                              <ArrowUpDown size={16} />
                            )}
                          </>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody
            className={cn(
              '**:data-[slot=table-cell]:first:w-8 border-l border-r border-b rounded-b-[8px] shadow',
              tbodyClassName
            )}
          >
            {hasData && !isLoading && (
              <>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      key={row.id}
                      className="relative z-0 hover:bg-transparent"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            key={cell.id}
                            className={cn('px-2 py-4 text-sm font-normal')}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </>
            )}

            {/* Loading */}
            {isLoading && renderSkeletonRows()}

            {/* Refetching */}
            {isRefetching && !isLoading && (
              <TableRow className="h-full w-full! absolute left-0 right-0 top-0">
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-full w-full! absolute left-0 top-0"
                >
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white/30">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* No Data */}
            {!hasData && !isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-65 text-center"
                >
                  <span className="flex flex-col items-center justify-center">
                    <span className="mb-6 flex">
                      <NoDataSVGIcon />
                    </span>
                    <span className="font-bold">No items found</span>
                    <span className="text-xs mt-2 opacity-70">
                      Request found will be displayed here
                    </span>
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {displayPagination && (
        <div
          className={cn('flex items-center justify-end px-4 py-[10px] border')}
        >
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handleGoToFirstPage()}
                disabled={!table.getCanPreviousPage() || isLoading}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => handleGoToPrevPage()}
                disabled={!table.getCanPreviousPage() || isLoading}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => handleGoToNextPage()}
                disabled={!table.getCanNextPage() || isLoading}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => handleGoToLastPage()}
                disabled={!table.getCanNextPage() || isLoading}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
