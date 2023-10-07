import { useSearchParams } from 'next/navigation'
import { ReplayClient } from '../api/clients/ReplayClient'

/**
 * Hook to parse the URL query parameters into {@link ReplayFilterOptions}.
 *
 * @returns The parsed {@link ReplayFilterOptions}.
 */
export function useReplayFilterOptions() {
  const params = useSearchParams()
  return ReplayClient.parseReplayFilterOptions(params)
}
