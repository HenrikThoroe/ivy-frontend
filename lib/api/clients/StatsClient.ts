import { api } from '@ivy-chess/api-schema'
import {
  EngineTestConfig,
  VerificationGroup,
  VerificationGroupState,
  VerificationResult,
} from '@ivy-chess/model'
import { Client } from '../Client'
import { JWTProvider } from '../auth/store/types'
import { TokenStrategy } from '../auth/strategy/TokenStrategy'
import { Config, ReturnType, WithID } from '../types'

type VerificationConfig = Config<typeof api.stats.verification.verificationRoute>

/**
 * A client for the verification API.
 */
export class VerificationStatsClient extends Client<VerificationConfig> {
  constructor(strategy: TokenStrategy<JWTProvider>) {
    super(
      api.stats.verification.verificationRoute,
      process.env.NEXT_PUBLIC_STATS_HOST,
      process.env.STATS_HOST,
      strategy
    )
  }

  //* API

  /**
   * Fetches all verification groups from the API.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async groups(): Promise<ReturnType<VerificationGroup[]>> {
    const res = await this.fetch('all', 'no-store', 'server', {})

    if (res.success) {
      return { ...res, result: res.result.sort((a, b) => a.name.localeCompare(b.name)) }
    }

    return res
  }

  /**
   * Fetches all replay ids from the API and expects the result to be successful.
   *
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.groups}
   */
  public async unsafeGroups(): Promise<VerificationGroup[]> {
    return this.unwrap(await this.groups())
  }

  /**
   * Fetches a verification group from the API.
   *
   * @param id The id of the verification group to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async group(id: string): Promise<ReturnType<VerificationGroup>> {
    return await this.fetch('get', 'no-store', 'client', { params: { id } })
  }

  /**
   * Fetches a verification group from the API and expects the result to be successful.
   *
   * @param id The id of the verification group to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.group}
   */
  public async unsafeGroup(id: string): Promise<VerificationGroup> {
    return this.unwrap(await this.group(id))
  }

  /**
   * Fetches the state of a verification group from the API.
   *
   * @param id The id of the verification group to fetch the state of.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async state(id: string): Promise<ReturnType<VerificationGroupState>> {
    return await this.fetch('state', 'no-store', 'server', { params: { id } })
  }

  /**
   * Fetches the state of a verification group from the API and expects the result to be successful.
   *
   * @param id The id of the verification group to fetch the state of.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.state}
   */
  public async unsafeState(id: string): Promise<VerificationGroupState> {
    return this.unwrap(await this.state(id))
  }

  /**
   * Fetches the result of a verification from the API.
   *
   * @param id The id of the verification to fetch the result of.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async result(id: string): Promise<ReturnType<VerificationResult>> {
    return await this.fetch('result', 'no-store', 'server', { params: { id } })
  }

  /**
   * Fetches the result of a verification from the API and expects the result to be successful.
   *
   * @param id The id of the verification to fetch the result of.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.result}
   */
  public async unsafeResult(id: string): Promise<VerificationResult> {
    return this.unwrap(await this.result(id))
  }

  /**
   * Creates a new verification group.
   *
   * @param group The group to create.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async create(
    group: Omit<VerificationGroup, 'id'>
  ): Promise<ReturnType<VerificationGroup>> {
    return await this.fetch('create', 'no-store', 'client', { body: group })
  }

  /**
   * Creates a new verification group and expects the result to be successful.
   *
   * @param group The group to create.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.create}
   */
  public async unsafeCreate(group: Omit<VerificationGroup, 'id'>): Promise<VerificationGroup> {
    return this.unwrap(await this.create(group))
  }

  /**
   * Deletes a verification group.
   *
   * @param id The id of the group to delete.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async delete(id: string): Promise<ReturnType<WithID>> {
    return await this.fetch('delete', 'no-store', 'client', { params: { id } })
  }

  /**
   * Deletes a verification group and expects the result to be successful.
   *
   * @param id The id of the group to delete.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.delete}
   */
  public async unsafeDelete(id: string): Promise<WithID> {
    return this.unwrap(await this.delete(id))
  }

  /**
   * Adds a new engine to a verification group.
   *
   * @param group The id of the group to add the engine to.
   * @param engine The engine to add.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async add(
    group: string,
    engine: EngineTestConfig
  ): Promise<ReturnType<VerificationGroup>> {
    return await this.fetch('addNode', 'no-store', 'client', {
      params: { id: group },
      body: { node: engine },
    })
  }

  /**
   * Adds a new engine to a verification group and expects the result to be successful.
   *
   * @param group The id of the group to add the engine to.
   * @param engine The engine to add.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.add}
   */
  public async unsafeAdd(group: string, engine: EngineTestConfig): Promise<VerificationGroup> {
    return this.unwrap(await this.add(group, engine))
  }

  /**
   * Removes an engine from a verification group.
   *
   * @param group The id of the group to remove the engine from.
   * @param engine The engine to remove.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.remove}
   */
  public async remove(
    group: string,
    engine: EngineTestConfig
  ): Promise<ReturnType<VerificationGroup>> {
    return await this.fetch('removeNode', 'no-store', 'client', {
      params: { id: group },
      body: { node: engine },
    })
  }

  /**
   * Removes an engine from a verification group and expects the result to be successful.
   *
   * @param group The id of the group to remove the engine from.
   * @param engine The engine to remove.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link VerificationStatsClient.remove}
   */
  public async unsafeRemove(group: string, engine: EngineTestConfig): Promise<VerificationGroup> {
    return this.unwrap(await this.remove(group, engine))
  }
}
