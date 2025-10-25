import { renderHook, waitFor } from '@testing-library/react';
import { useTeamTicketsMetrics } from '../use-team-tickets-metrics';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useResolvedTickets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasAgents).toBe(false);
  });

  it('returns empty array when no data', () => {
    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.agents).toEqual([]);
    expect(result.current.hasAgents).toBe(false);
  });

  it('returns agents data', async () => {
    const mockData = {
      data: [
        { id: 'agent-1', name: 'Agent 1', ticketsResolved: 50 },
        { id: 'agent-2', name: 'Agent 2', ticketsResolved: 30 }
      ]
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    await waitFor(() => {
      expect(result.current.agents).toHaveLength(2);
    });

    expect(result.current.hasAgents).toBe(true);
    expect(result.current.agents[0]).toEqual({
      id: 'agent-1',
      name: 'Agent 1',
      ticketsResolved: 50
    });
  });

  it('sets hasAgents to true when agents exist', () => {
    const mockData = {
      data: [{ id: 'agent-1', name: 'Agent 1', ticketsResolved: 10 }]
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.hasAgents).toBe(true);
  });

  it('sets hasAgents to false when loading', () => {
    const mockData = {
      data: [{ id: 'agent-1', name: 'Agent 1', ticketsResolved: 10 }]
    };

    const mockResult = {
      data: mockData,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as unknown as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.hasAgents).toBe(false);
  });

  it('returns error state', () => {
    const mockError = new Error('Failed to fetch');

    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: false,
      error: mockError,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.error).toBe(mockError);
  });

  it('handles empty agents array', () => {
    const mockData = {
      data: []
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.agents).toEqual([]);
    expect(result.current.hasAgents).toBe(false);
  });

  it('handles multiple agents', () => {
    const mockData = {
      data: [
        { id: 'agent-1', name: 'Agent 1', ticketsResolved: 100 },
        { id: 'agent-2', name: 'Agent 2', ticketsResolved: 85 },
        { id: 'agent-3', name: 'Agent 3', ticketsResolved: 70 }
      ]
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useTeamTicketsMetrics());

    expect(result.current.agents).toHaveLength(3);
    expect(result.current.hasAgents).toBe(true);
  });
});
