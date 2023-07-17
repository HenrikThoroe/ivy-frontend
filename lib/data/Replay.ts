import { Color, Replay, ReplayLog, ReplayStats, UCILog } from '@ivy-chess/model'
import { HTTPError } from '../util/error'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import moment from 'moment'

interface FilterOptions {
  engine?: string
  limit?: number
  age?: number
  since?: Date
  date?: Date
  winner?: Color | 'draw'
}

export function parseReplayFilterOptions(params: ReadonlyURLSearchParams): FilterOptions {
  const engine = params.get('engine')
  const limit = params.get('limit')
  const age = params.get('age')
  const since = params.get('since')
  const date = params.get('date')
  const winner = params.get('winner')

  const parseInt = (str: string | null) => {
    if (!str) return undefined
    const value = Number.parseInt(str)

    if (Number.isNaN(value)) {
      return undefined
    }

    return value
  }

  const parseDate = (str: string | null) => {
    if (!str) return undefined
    const date = moment(str, moment.ISO_8601, true)

    if (date.isValid()) {
      return date.toDate()
    }

    return undefined
  }

  const parseWinner = (str: string | null) => {
    if (!str) return undefined
    if (['white', 'black', 'draw'].includes(str)) {
      return str as Color | 'draw'
    }

    return undefined
  }

  return {
    engine: engine ?? undefined,
    limit: parseInt(limit),
    age: parseInt(age),
    since: parseDate(since),
    date: parseDate(date),
    winner: parseWinner(winner),
  }
}

export function encodeReplayFilterOptions(options: FilterOptions) {
  const rawParams = [
    ['engine', options?.engine ?? ''],
    ['limit', options?.limit?.toString() ?? ''],
    ['age', options?.age?.toString() ?? ''],
    ['since', options?.since?.toISOString() ?? ''],
    ['date', options?.date?.toISOString() ?? ''],
    ['winner', options?.winner ?? ''],
  ].filter((param) => param[1] !== '')

  return new Set(rawParams)
}

export function useReplayFilterOptions(): FilterOptions {
  const params = useSearchParams()
  return parseReplayFilterOptions(params)
}

export async function fetchReplays(options?: FilterOptions): Promise<string[]> {
  const encoded = Array.from(encodeReplayFilterOptions(options ?? {}))
  const params = new URLSearchParams(encoded)
  const url = `${process.env.REPLAYS_HOST}/replays${encoded.length > 0 ? `?${params}` : ''}`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch replays`)
  }

  return await response.json()
}

export async function fetchReplay(id: string): Promise<Replay> {
  const url = `${process.env.REPLAYS_HOST}/replays/${id}`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'force-cache' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch replay`)
  }

  const replay = await response.json()

  return {
    ...replay,
    date: new Date(replay.date),
  }
}

export async function fetchReplayStats(id: string): Promise<ReplayStats> {
  const url = `${process.env.REPLAYS_HOST}/replays/${id}/analysis`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'force-cache' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch engine configs`)
  }

  return await response.json()
}

export async function fetchReplayLogs(replay: string): Promise<ReplayLog | undefined> {
  const url = `${process.env.REPLAYS_HOST}/replays/${replay}/logs`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'force-cache' })

  if (!response.ok) {
    return undefined
  }

  return await response.json()
}
