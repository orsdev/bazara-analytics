import { renderHook, act } from '@testing-library/react';
import { useTicketsFilter } from '../use-tickets-filter';

jest.mock('@/hooks/table/use-table-search', () => ({
  useTableSearch: jest.fn(() => ({
    searchTerm: '',
    handleSearchChange: jest.fn(),
    handleClearSearch: jest.fn(),
    debouncedSearchValue: ''
  }))
}));

describe('useTicketsFilter', () => {
  it('initializes with null dates', () => {
    const { result } = renderHook(() => useTicketsFilter());

    expect(result.current.selectedStartDate).toBeNull();
    expect(result.current.selectedEndDate).toBeNull();
    expect(result.current.hasStartDate).toBe(false);
    expect(result.current.hasEndDate).toBe(false);
    expect(result.current.hasDateFilter).toBe(false);
  });

  it('initializes with search functionality', () => {
    const { result } = renderHook(() => useTicketsFilter());

    expect(result.current.searchTerm).toBe('');
    expect(result.current.debouncedSearchValue).toBe('');
    expect(typeof result.current.handleSearchChange).toBe('function');
    expect(typeof result.current.handleClearSearch).toBe('function');
  });

  it('updates start date', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const newDate = new Date('2024-06-01');

    act(() => {
      result.current.setSelectedStartDate(newDate);
    });

    expect(result.current.selectedStartDate).toEqual(newDate);
    expect(result.current.hasStartDate).toBe(true);
  });

  it('updates end date', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const newDate = new Date('2024-12-31');

    act(() => {
      result.current.setSelectedEndDate(newDate);
    });

    expect(result.current.selectedEndDate).toEqual(newDate);
    expect(result.current.hasEndDate).toBe(true);
  });

  it('sets hasDateFilter to true when both dates are set', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    act(() => {
      result.current.setSelectedStartDate(startDate);
      result.current.setSelectedEndDate(endDate);
    });

    expect(result.current.hasDateFilter).toBe(true);
  });

  it('sets hasDateFilter to false when only start date is set', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const startDate = new Date('2024-01-01');

    act(() => {
      result.current.setSelectedStartDate(startDate);
    });

    expect(result.current.hasStartDate).toBe(true);
    expect(result.current.hasEndDate).toBe(false);
    expect(result.current.hasDateFilter).toBe(false);
  });

  it('sets hasDateFilter to false when only end date is set', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const endDate = new Date('2024-12-31');

    act(() => {
      result.current.setSelectedEndDate(endDate);
    });

    expect(result.current.hasStartDate).toBe(false);
    expect(result.current.hasEndDate).toBe(true);
    expect(result.current.hasDateFilter).toBe(false);
  });

  it('clears start date', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const startDate = new Date('2024-01-01');

    act(() => {
      result.current.setSelectedStartDate(startDate);
    });

    expect(result.current.hasStartDate).toBe(true);

    act(() => {
      result.current.setSelectedStartDate(null);
    });

    expect(result.current.hasStartDate).toBe(false);
  });

  it('clears end date', () => {
    const { result } = renderHook(() => useTicketsFilter());
    const endDate = new Date('2024-12-31');

    act(() => {
      result.current.setSelectedEndDate(endDate);
    });

    expect(result.current.hasEndDate).toBe(true);

    act(() => {
      result.current.setSelectedEndDate(null);
    });

    expect(result.current.hasEndDate).toBe(false);
  });

  it('provides all required functions', () => {
    const { result } = renderHook(() => useTicketsFilter());

    expect(typeof result.current.setSelectedStartDate).toBe('function');
    expect(typeof result.current.setSelectedEndDate).toBe('function');
    expect(typeof result.current.handleSearchChange).toBe('function');
    expect(typeof result.current.handleClearSearch).toBe('function');
  });
});
