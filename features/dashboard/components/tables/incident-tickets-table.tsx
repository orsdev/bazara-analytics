'use client';

import {
  Button,
  ConfirmationModal,
  DefaultCard,
  ExportSVGIcon,
  FilterDropdown,
  PinchSVGIcon,
  RangeDatePicker,
  SearchInput
} from '@/components/ui';
import { useTable, useTablePagination } from '@/hooks';
import { CustomTable } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import { useRequests } from '@/features/dashboard/hooks/use-requests';
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
import { Request, RequestStatus } from '../../types';
import { useUser } from '@/features/auth/hooks';
import { useTicketsFilter } from '../../hooks/use-tickets-filter';
import { format } from 'date-fns';

enum ModalType {
  decline,
  approve,
  view
}

export const IncidentTicketsTable = () => {
  const {
    searchTerm,
    handleSearchChange,
    debouncedSearchValue,
    selectedStartDate,
    selectedEndDate,
    hasDateFilter,
    setSelectedStartDate,
    setSelectedEndDate
  } = useTicketsFilter();
  const [modalType, setModalType] = useState<ModalType>(ModalType.view);
  const [page, setPage] = useState(1);

  const { user } = useUser();
  const { requests, isLoading, isRefetching } = useRequests({
    status: RequestStatus.PENDING,
    team: user?.team || '',
    search: debouncedSearchValue,
    ...(hasDateFilter && {
      startDate: format(selectedStartDate!, 'yyyy-MM-dd'),
      endDate: format(selectedEndDate!, 'yyyy-MM-dd')
    })
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
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <span>{row.getValue('id')}</span>
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <span>{row.getValue('category')}</span>
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => <span>{row.getValue('priority')}</span>
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
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        cell: ({ row }) => <span>{row.getValue('assignedTo')}</span>
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
        title="Approve Request"
        description="Are you sure you want to approve this request?"
        onConfirm={() => {}}
      />
      <ConfirmationModal
        isOpen={modalType === ModalType.decline}
        onClose={handleCloseModal}
        title="Decline Request"
        description="Are you sure you want to decline this request?"
        onConfirm={() => {}}
      />
      <DefaultCard
        headerIcon={<PinchSVGIcon />}
        title="Incident Tickets Assigned to my Team"
        handleMoreOptions={() => {}}
      >
        <div className="flex items-center justify-between mb-4 gap-4 mt-6 relative z-10 flex-wrap">
          <div className="max-w-[46.48rem] w-full flex items-center gap-4 flex-wrap">
            <div className="max-w-87 w-full">
              <SearchInput
                placeholder="Search by title"
                value={searchTerm}
                className="bg-background"
                handleSearchChange={handleSearchChange}
              />
            </div>
            <div className="relative z-10 max-w-[13.68rem] w-full">
              <RangeDatePicker
                name="range"
                placeholder="Select range"
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                handleChange={({ from, to }) => {
                  setSelectedStartDate(from);
                  setSelectedEndDate(to);
                }}
              />
            </div>
            <FilterDropdown>...........</FilterDropdown>
          </div>
          <div>
            <Button className="px-4">
              <ExportSVGIcon />
              <span> Export </span>
            </Button>
          </div>
        </div>
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
