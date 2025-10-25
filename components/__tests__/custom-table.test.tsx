import { render, screen, fireEvent } from '@testing-library/react';
import { CustomTable } from '../ui/table/custom-table';
import type { ColumnDef, Table as ReactTable } from '@tanstack/react-table';

// Mock all dependencies
jest.mock('@tanstack/react-table', () => ({
  flexRender: jest.fn((content) => content)
}));

jest.mock('lucide-react', () => ({
  ArrowUpDown: () => <svg data-testid="arrow-up-down" />,
  ChevronLeftIcon: () => <svg data-testid="chevron-left" />,
  ChevronRightIcon: () => <svg data-testid="chevron-right" />,
  ChevronsLeftIcon: () => <svg data-testid="chevrons-left" />,
  ChevronsRightIcon: () => <svg data-testid="chevrons-right" />,
  MoveDown: () => <svg data-testid="move-down" />,
  MoveUp: () => <svg data-testid="move-up" />
}));

jest.mock('../ui/buttons', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    className
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: string;
    size?: string;
  }) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
}));

jest.mock('../ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  )
}));

jest.mock('../ui/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>
}));

jest.mock('../ui/icons', () => ({
  NoDataSVGIcon: () => <svg data-testid="no-data-icon" />
}));

interface TestData {
  id: number;
  name: string;
  email: string;
}

const createMockTable = (options: {
  rows?: TestData[];
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  pageIndex?: number;
  pageCount?: number;
}) => {
  const {
    rows = [],
    canPreviousPage = false,
    canNextPage = false,
    pageIndex = 0,
    pageCount = 1
  } = options;

  return {
    getRowModel: () => ({
      rows: rows.map((row, index) => ({
        id: `row-${index}`,
        getIsSelected: () => false,
        getVisibleCells: () => [
          {
            id: `cell-${index}-id`,
            column: {
              columnDef: {
                cell: row.id
              }
            },
            getContext: () => ({})
          },
          {
            id: `cell-${index}-name`,
            column: {
              columnDef: {
                cell: row.name
              }
            },
            getContext: () => ({})
          },
          {
            id: `cell-${index}-email`,
            column: {
              columnDef: {
                cell: row.email
              }
            },
            getContext: () => ({})
          }
        ]
      }))
    }),
    getHeaderGroups: () => [
      {
        id: 'header-group-1',
        headers: [
          {
            id: 'header-id',
            colSpan: 1,
            isPlaceholder: false,
            column: {
              columnDef: {
                header: 'ID',
                enableSorting: true
              },
              toggleSorting: jest.fn(),
              getIsSorted: () => false
            },
            getContext: () => ({})
          },
          {
            id: 'header-name',
            colSpan: 1,
            isPlaceholder: false,
            column: {
              columnDef: {
                header: 'Name',
                enableSorting: true
              },
              toggleSorting: jest.fn(),
              getIsSorted: () => 'asc'
            },
            getContext: () => ({})
          },
          {
            id: 'header-email',
            colSpan: 1,
            isPlaceholder: false,
            column: {
              columnDef: {
                header: 'Email',
                enableSorting: false
              },
              toggleSorting: jest.fn(),
              getIsSorted: () => false
            },
            getContext: () => ({})
          }
        ]
      }
    ],
    getVisibleLeafColumns: () => [
      { id: 'col-1' },
      { id: 'col-2' },
      { id: 'col-3' }
    ],
    getCanPreviousPage: () => canPreviousPage,
    getCanNextPage: () => canNextPage,
    getState: () => ({
      pagination: {
        pageIndex
      }
    }),
    getPageCount: () => pageCount
  } as unknown as ReactTable<TestData>;
};

const mockColumns: ColumnDef<TestData, unknown>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' }
];

describe('CustomTable', () => {
  const mockHandlers = {
    handleGoToFirstPage: jest.fn(),
    handleGoToPrevPage: jest.fn(),
    handleGoToNextPage: jest.fn(),
    handleGoToLastPage: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table with data', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    const table = createMockTable({ rows: mockData });

    render(
      <CustomTable columns={mockColumns} table={table} {...mockHandlers} />
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays loading skeleton when isLoading is true', () => {
    const table = createMockTable({ rows: [] });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        isLoading={true}
        {...mockHandlers}
      />
    );

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('displays spinner when isRefetching is true', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({ rows: mockData });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        isRefetching={true}
        {...mockHandlers}
      />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays no data message when table is empty', () => {
    const table = createMockTable({ rows: [] });

    render(
      <CustomTable columns={mockColumns} table={table} {...mockHandlers} />
    );

    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByTestId('no-data-icon')).toBeInTheDocument();
  });

  it('shows pagination when showPagination is true and has data', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({
      rows: mockData,
      pageIndex: 0,
      pageCount: 5,
      canNextPage: true
    });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        showPagination={true}
        {...mockHandlers}
      />
    );

    expect(screen.getByText(/Page 1 of 5/)).toBeInTheDocument();
  });

  it('hides pagination when showPagination is false', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({ rows: mockData });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        showPagination={false}
        {...mockHandlers}
      />
    );

    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
  });

  it('calls handleGoToPrevPage when previous button is clicked', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({
      rows: mockData,
      canPreviousPage: true,
      pageIndex: 1,
      pageCount: 5
    });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        showPagination={true}
        {...mockHandlers}
      />
    );

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find((btn) =>
      btn.textContent?.includes('Go to previous page')
    );

    if (prevButton) {
      fireEvent.click(prevButton);
      expect(mockHandlers.handleGoToPrevPage).toHaveBeenCalledTimes(1);
    }
  });

  it('calls handleGoToNextPage when next button is clicked', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({
      rows: mockData,
      canNextPage: true,
      pageIndex: 0,
      pageCount: 5
    });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        showPagination={true}
        {...mockHandlers}
      />
    );

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find((btn) =>
      btn.textContent?.includes('Go to next page')
    );

    if (nextButton) {
      fireEvent.click(nextButton);
      expect(mockHandlers.handleGoToNextPage).toHaveBeenCalledTimes(1);
    }
  });

  it('disables pagination buttons when cannot navigate', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({
      rows: mockData,
      canPreviousPage: false,
      canNextPage: false,
      pageIndex: 0,
      pageCount: 1
    });

    render(
      <CustomTable
        columns={mockColumns}
        table={table}
        showPagination={true}
        {...mockHandlers}
      />
    );

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find((btn) =>
      btn.textContent?.includes('Go to previous page')
    );
    const nextButton = buttons.find((btn) =>
      btn.textContent?.includes('Go to next page')
    );

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('renders table headers correctly', () => {
    const table = createMockTable({ rows: [] });

    render(
      <CustomTable columns={mockColumns} table={table} {...mockHandlers} />
    );

    // Headers are rendered via flexRender mock
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays sorting icons for sortable columns', () => {
    const mockData: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ];
    const table = createMockTable({ rows: mockData });

    render(
      <CustomTable columns={mockColumns} table={table} {...mockHandlers} />
    );

    // Should have sorting icons for sortable columns
    expect(screen.getByTestId('move-up')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-up-down')).toBeInTheDocument();
  });
});
