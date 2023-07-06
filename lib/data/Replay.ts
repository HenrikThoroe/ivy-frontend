import { Replay } from '@ivy-chess/model'
import { HTTPError } from '../util/error'

export async function fetchReplays(): Promise<string[]> {
  const url = `${process.env.REPLAYS_HOST}/replays`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch engine configs`)
  }

  return await response.json()
}

export async function fetchReplay(id: string): Promise<Replay> {
  const url = `${process.env.REPLAYS_HOST}/replays/${id}`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'force-cache' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch engine configs`)
  }

  const replay = await response.json()

  return {
    ...replay,
    date: new Date(replay.date),
  }
}
