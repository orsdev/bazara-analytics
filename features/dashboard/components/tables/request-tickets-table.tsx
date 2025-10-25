'use client';

import { DefaultCard, PinchSVGIcon } from '@/components/ui';
import { CustomTable } from '@/components/ui/table';
import { useRequests } from '@/features/dashboard/hooks/use-requests';
import { useTable, useTablePagination } from '@/hooks';
import { cn } from '@/lib';
import { Teams } from '@/types';
import { dateFormatter } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Request, RequestStatus } from '../../types';

export const RequestTicketsTable = () => {
  const [page, setPage] = useState(1);

  const { requests, isLoading, isRefetching } = useRequests({
    team: Teams.NONE
  });

  const columns: ColumnDef<Request>[] = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Form Title',
        cell: ({ row }) => (
          <span className="w-[220px] wrap-break-word whitespace-pre-wrap line-clamp-1">
            {row.getValue('title')}
          </span>
        )
      },
      {
        accessorKey: 'createdAt',
        header: 'Date Created',
        cell: ({ row }) => {
          const date = row.getValue('createdAt') as string;
          const formattedDate = date ? dateFormatter(date) : 'N/A';
          return <span>{formattedDate}</span>;
        }
      },
      {
        accessorKey: 'createdBy',
        header: 'Owner',
        cell: ({ row }) => <span>{row.getValue('createdBy')}</span>
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          const lowerCaseStatus = status.toLowerCase();

          const isPending =
            lowerCaseStatus === RequestStatus.PENDING.toLowerCase();
          const isApproved =
            lowerCaseStatus === RequestStatus.APPROVED.toLowerCase();
          const isRejected =
            lowerCaseStatus === RequestStatus.DECLINED.toLowerCase();

          return (
            <span
              className={cn(
                'px-2 h-5.5 flex items-center justify-center text-xs font-medium rounded-[4px] w-[70px]',
                {
                  'bg-green-100 text-green-800': isApproved,
                  'bg-red-100 text-red-800': isRejected,
                  'bg-yellow-100 text-yellow-800': isPending
                }
              )}
            >
              {status}
            </span>
          );
        }
      }
    ],
    []
  );

  const { table } = useTable({
    columns,
    data: requests,
    total: requests?.length || 0,
    page,
    manualPagination: false
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table, setPage });

  return (
    <>
      <DefaultCard
        headerIcon={<PinchSVGIcon />}
        title="Request Tickets - My Team"
        handleMoreOptions={() => {}}
      >
        <CustomTable
          columns={columns}
          table={table}
          isLoading={isLoading}
          isRefetching={isRefetching}
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
          showPagination
        />
      </DefaultCard>
    </>
  );
};
