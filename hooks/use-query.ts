import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

type UseCustomQueryOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

interface CustomQueryProps<TData, TError> {
  queryKey: QueryKey;
  url: string;
  options?: UseCustomQueryOptions<TData, TError>;
}

export function useCustomQuery<TData = unknown, TError = unknown>({
  queryKey,
  url,
  options
}: CustomQueryProps<TData, TError>): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey: queryKey,
    queryFn: () =>
      fetcher<TData>({
        url
      }),
    ...options
  });
}
