import type { Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface IUseTablePagination<TData> {
  table: Table<TData>;
  setPage?: Dispatch<SetStateAction<number>>;
}

export const useTablePagination = <TData>({
  table,
  setPage
}: IUseTablePagination<TData>) => {
  const handleGoToPage = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
    table.resetSorting();
  };

  const handleGoToFirstPage = () => {
    table.setPageIndex(0);
    setPage?.(1);
  };

  const handleGoToPrevPage = () => {
    const { pagination } = table.getState();
    const currentPage = pagination.pageIndex + 1;
    handleGoToPage(currentPage - 1);
    setPage?.(Math.max(1, currentPage - 1));
    table.previousPage();
  };

  const handleGoToNextPage = () => {
    const { pagination } = table.getState();
    const currentPage = pagination.pageIndex + 1;
    handleGoToPage(currentPage + 1);
    setPage?.(Math.min(table.getPageCount(), currentPage + 1));
    table.nextPage();
  };

  const handleGoToLastPage = () => {
    const lastPageIndex = table.getPageCount();
    handleGoToPage(lastPageIndex);
    setPage?.(lastPageIndex);
  };

  return {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  };
};
