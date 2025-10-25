'use client';

import { ConfirmationModal, DefaultCard, PinchSVGIcon } from '@/components/ui';
import { useTable, useTablePagination } from '@/hooks';
import { CustomTable } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import { useRequests } from '../../hooks/use-requests';
import { cn } from '@/lib';
import { dateFormatter } from '@/utils';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { RequestStatus } from '../../types';
import { Request } from '../../types';

enum ModalType {
  decline,
  approve,
  view
}

export const PendingRequestsTable = () => {
  const [modalType, setModalType] = useState<ModalType>(ModalType.view);
  const [page, setPage] = useState(1);

  const { requests, isLoading, isRefetching } = useRequests({
    status: RequestStatus.PENDING
  });

  const columns: ColumnDef<Request>[] = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
          <span className="w-[220px] wrap-break-word whitespace-pre-wrap line-clamp-1">
            {row.getValue('title')}
          </span>
        )
      },
      {
        accessorKey: 'module',
        header: 'Module',
        cell: ({ row }) => <span>{row.getValue('module')}</span>
      },
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <span>{row.getValue('id')}</span>
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
        cell: ({ row }) => <span>{row.getValue('createdBy')}</span>
      },
      {
        accessorKey: 'createdAt',
        header: 'Created On',
        cell: ({ row }) => {
          const date = row.getValue('createdAt') as string;
          const formattedDate = date ? dateFormatter(date) : 'N/A';
          return <span>{formattedDate}</span>;
        }
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ row }) => {
          const date = row.getValue('dueDate') as string;
          const formattedDate = date ? dateFormatter(date) : 'N/A';
          return <span>{formattedDate}</span>;
        }
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
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const data = row.original;
          const lowerCaseStatus = data.status.toLowerCase();
          const isPending =
            lowerCaseStatus === RequestStatus.PENDING.toLowerCase();

          return (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 p-0 cursor-pointer">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="w-5 h-5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setModalType(ModalType.view);
                  }}
                  className="cursor-pointer text-xs over:bg-primary/5!"
                >
                  View
                </DropdownMenuItem>

                {isPending && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-xs over:bg-primary/5!"
                      onClick={() => {
                        setModalType(ModalType.approve);
                      }}
                    >
                      Approve
                    </DropdownMenuItem>
                  </>
                )}
                {isPending && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-xs over:bg-primary/5!"
                      onClick={() => {
                        setModalType(ModalType.decline);
                      }}
                    >
                      Decline
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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

  const handleCloseModal = () => {
    setModalType(ModalType.view);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={modalType === ModalType.approve}
        onClose={handleCloseModal}
        onConfirm={() => {}}
        isLoading={false}
        title="Approve Request"
        description="Are you sure you want to approve this request?"
        confirmText="Approve Request"
        cancelText="Cancel"
      />
      <ConfirmationModal
        isOpen={modalType === ModalType.decline}
        onClose={handleCloseModal}
        onConfirm={() => {}}
        isLoading={false}
        title="Decline Request"
        description="Are you sure you want to decline this request?"
        confirmText="Decline Request"
        cancelText="Cancel"
      />
      <DefaultCard
        headerIcon={<PinchSVGIcon />}
        title="Awaiting Approval"
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
