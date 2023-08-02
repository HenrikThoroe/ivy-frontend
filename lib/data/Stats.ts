import { VerificationGroup } from '@ivy-chess/model'
import { HTTPError } from '../util/error'

export async function fetchVerificationGroups(): Promise<VerificationGroup[]> {
  const url = `${process.env.STATS_HOST}/verification/groups`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch verification groups`)
  }

  return await response.json()
}
