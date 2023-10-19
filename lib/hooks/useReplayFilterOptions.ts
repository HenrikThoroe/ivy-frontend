import { useSearchParams } from 'next/navigation'
import { ReplayClient, ReplayFilterOptions } from '../api/clients/ReplayClient'

/**
 * Hook to parse the URL query parameters into {@link ReplayFilterOptions}.
 *
 * @returns The parsed {@link ReplayFilterOptions}.
 */
export function useReplayFilterOptions(): ReplayFilterOptions {
  const params = useSearchParams()

  if (!params) {
    return {}
  }

  return ReplayClient.parseReplayFilterOptions(params)
}
