import { api } from '@ivy-chess/api-schema'
import { Replay, ReplayLog, ReplayStats } from '@ivy-chess/model'
import moment from 'moment'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Client } from '../Client'
import { Config, ReturnType } from '../types'

/**
 * Inferred type for {@link api.replay.filterOptionsSchema}
 */
export type ReplayFilterOptions = z.infer<typeof api.replay.filterOptionsSchema>

type AcceptedReplayFilterOptions = ReadonlyURLSearchParams | ReplayFilterOptions

/**
 * A client for the replay API.
 */
export class ReplayClient extends Client<Config<typeof api.replay.replayRoute>> {
  constructor() {
    super(api.replay.replayRoute, undefined, process.env.REPLAYS_HOST)
  }

  //* API

  /**
   * Takes URL query parameters and parses them into {@link ReplayFilterOptions}.
   *
   * @param params The URL query parameters to parse.
   * @returns The parsed {@link ReplayFilterOptions}.
   * @throws When the URL query parameters are not compatible with the schema.
   */
  public static parseReplayFilterOptions(params: ReadonlyURLSearchParams): ReplayFilterOptions {
    const engine = params.get('engine')
    const limit = params.get('limit')
    const age = params.get('age')
    const since = params.get('since')
    const date = params.get('date')
    const winner = params.get('winner')

    return api.replay.filterOptionsSchema.parse({
      engine: engine ?? undefined,
      limit: limit ?? undefined,
      age: age ?? undefined,
      since: since ? moment(since, moment.ISO_8601, true).toDate() : undefined,
      date: date ? moment(date, moment.ISO_8601, true).toDate() : undefined,
      winner: winner ?? undefined,
    })
  }

  /**
   * Fetches all replay ids from the API.
   *
   * @param options The options to filter the replay ids.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async keys(options?: AcceptedReplayFilterOptions): Promise<ReturnType<string[]>> {
    const query =
      options instanceof ReadonlyURLSearchParams
        ? ReplayClient.parseReplayFilterOptions(options)
        : options ?? {}

    return await this.fetch('all', 'no-store', 'server', { query })
  }

  /**
   * Fetches all replay ids from the API and expects the result to be successful.
   *
   * @param options The options to filter the replay ids.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link ReplayClient.keys}
   */
  public async unsafeKeys(options?: AcceptedReplayFilterOptions): Promise<string[]> {
    return this.unwrap(await this.keys(options))
  }

  /**
   * Fetches a replay from the API.
   *
   * @param id The id of the replay to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async get(id: string): Promise<ReturnType<Replay>> {
    return await this.fetch('get', 'force-cache', 'server', {
      params: { id },
    })
  }

  /**
   * Fetches a replay from the API and expects the result to be successful.
   *
   * @param id The id of the replay to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link ReplayClient.get}
   */
  public async unsafeGet(id: string): Promise<Replay> {
    return this.unwrap(await this.get(id))
  }

  /**
   * Fetches the stats of a replay from the API.
   *
   * @param id The id of the replay to fetch the stats of.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async stats(id: string): Promise<ReturnType<ReplayStats>> {
    return await this.fetch('analysis', 'force-cache', 'server', {
      params: { id },
    })
  }

  /**
   * Fetches the stats of a replay from the API and expects the result to be successful.
   *
   * @param id The id of the replay to fetch the stats of.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async unsafeStats(id: string): Promise<ReplayStats> {
    return this.unwrap(await this.stats(id))
  }

  /**
   * Fetches the logs of a replay from the API.
   *
   * @param id The id of the replay to fetch the logs of.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async logs(id: string): Promise<ReturnType<ReplayLog>> {
    return await this.fetch('logs', 'force-cache', 'server', {
      params: { id },
    })
  }

  /**
   * Fetches the logs of a replay from the API and expects the result to be successful.
   *
   * @param id The id of the replay to fetch the logs of.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async unsafeLogs(id: string): Promise<ReplayLog> {
    return this.unwrap(await this.logs(id))
  }
}
