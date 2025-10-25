import { renderHook, act } from '@testing-library/react';
import { useChangeRequestsFilter } from '../use-change-requests-filter';

describe('useChangeRequestsFilter', () => {
  it('initializes with default dates', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    expect(result.current.selectedStartDate).toBeInstanceOf(Date);
    expect(result.current.selectedEndDate).toBeInstanceOf(Date);
    expect(result.current.hasStartDate).toBe(true);
    expect(result.current.hasEndDate).toBe(true);
    expect(result.current.hasDateFilter).toBe(true);
  });

  it('updates start date', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());
    const newDate = new Date('2024-06-01');

    act(() => {
      result.current.setSelectedStartDate(newDate);
    });

    expect(result.current.selectedStartDate).toEqual(newDate);
  });

  it('updates end date', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());
    const newDate = new Date('2024-12-31');

    act(() => {
      result.current.setSelectedEndDate(newDate);
    });

    expect(result.current.selectedEndDate).toEqual(newDate);
  });

  it('sets hasStartDate to false when start date is null', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    act(() => {
      result.current.setSelectedStartDate(null);
    });

    expect(result.current.hasStartDate).toBe(false);
  });

  it('sets hasEndDate to false when end date is null', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    act(() => {
      result.current.setSelectedEndDate(null);
    });

    expect(result.current.hasEndDate).toBe(false);
  });

  it('sets hasDateFilter to false when start date is null', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    act(() => {
      result.current.setSelectedStartDate(null);
    });

    expect(result.current.hasDateFilter).toBe(false);
  });

  it('sets hasDateFilter to false when end date is null', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    act(() => {
      result.current.setSelectedEndDate(null);
    });

    expect(result.current.hasDateFilter).toBe(false);
  });

  it('sets hasDateFilter to false when both dates are null', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    act(() => {
      result.current.setSelectedStartDate(null);
      result.current.setSelectedEndDate(null);
    });

    expect(result.current.hasDateFilter).toBe(false);
  });

  it('maintains hasDateFilter as true when both dates are set', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    act(() => {
      result.current.setSelectedStartDate(startDate);
      result.current.setSelectedEndDate(endDate);
    });

    expect(result.current.hasDateFilter).toBe(true);
  });

  it('provides setter functions', () => {
    const { result } = renderHook(() => useChangeRequestsFilter());

    expect(typeof result.current.setSelectedStartDate).toBe('function');
    expect(typeof result.current.setSelectedEndDate).toBe('function');
  });
});
