import {
  EngineTestConfig,
  VerificationGroup,
  VerificationGroupState,
  VerificationResult,
} from '@ivy-chess/model'
import { HTTPError } from '../util/error'

export async function fetchVerificationGroups(): Promise<VerificationGroup[]> {
  const url = `${process.env.STATS_HOST}/verification/groups`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch verification groups`)
  }

  const groups: VerificationGroup[] = await response.json()

  return groups.sort((a, b) => a.name.localeCompare(b.name))
}

export async function fetchVerificationGroup(id: string): Promise<VerificationGroup> {
  const url = `${process.env.NEXT_PUBLIC_STATS_HOST}/verification/groups/${id}`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch verification group ${id}`)
  }

  return await response.json()
}

export async function fetchVerificationGroupState(id: string): Promise<VerificationGroupState> {
  const url = `${process.env.STATS_HOST}/verification/groups/${id}/state`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch verification group ${id} state`)
  }

  return await response.json()
}

export async function fetchVerificationGroupResult(
  id: string
): Promise<VerificationResult | undefined> {
  const url = `${process.env.STATS_HOST}/verification/groups/${id}/result`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    return undefined
  }

  return await response.json()
}

export async function createVerificationGroup(
  group: Omit<VerificationGroup, 'id'>
): Promise<VerificationGroup> {
  const url = `${process.env.NEXT_PUBLIC_STATS_HOST}/verification/groups`
  const response = await fetch(url, {
    method: 'post',
    mode: 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(group),
  })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to create verification group`)
  }

  return await response.json()
}

export async function deleteVerificationGroup(id: string): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_STATS_HOST}/verification/groups/${id}`
  const response = await fetch(url, {
    method: 'delete',
    mode: 'cors',
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to delete verification group`)
  }
}

export async function addVerificationNode(
  groupId: string,
  engine: EngineTestConfig
): Promise<VerificationGroup> {
  const url = `${process.env.NEXT_PUBLIC_STATS_HOST}/verification/groups/${groupId}/nodes`
  const response = await fetch(url, {
    method: 'post',
    mode: 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ node: engine }),
  })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to add verification node`)
  }

  return await response.json()
}

export async function removeVerificationNode(
  groupId: string,
  engine: EngineTestConfig
): Promise<VerificationGroup> {
  const url = `${process.env.NEXT_PUBLIC_STATS_HOST}/verification/groups/${groupId}/nodes`
  const response = await fetch(url, {
    method: 'delete',
    mode: 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ node: engine }),
  })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to remove verification node`)
  }

  return await response.json()
}
