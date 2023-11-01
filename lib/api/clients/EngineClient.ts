import { api } from '@ivy-chess/api-schema'
import { EngineConfig, EngineVariation, EngineVersion, encodeVersion } from '@ivy-chess/model'
import { Client } from '../Client'
import { JWTProvider } from '../auth/store/types'
import { TokenStrategy } from '../auth/strategy/TokenStrategy'
import { Config, ReturnType, SuccessState } from '../types'

interface CreateOptions {
  name: string
  version: EngineVersion
  os: string
  arch: string
  capabilities: string[]
}

/**
 * A client for the engine versioning API.
 */
export class EngineClient extends Client<Config<typeof api.evc.engineVersioningRoute>> {
  constructor(strategy: TokenStrategy<JWTProvider>) {
    super(api.evc.engineVersioningRoute, process.env.NEXT_PUBLIC_EVC_HOST, strategy)
  }

  //* API

  /**
   * Fetches all engine configurations from the API.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async engines(): Promise<ReturnType<EngineConfig[]>> {
    return await this.fetch('all', 'no-store', {})
  }

  /**
   * Fetches all engine configurations from the API and expects the result to be successful.
   *
   * @returns The result of the fetch request.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link EngineClient.engines}
   */
  public async unsafeEngines(): Promise<EngineConfig[]> {
    return this.unwrap(await this.engines())
  }

  /**
   * Fetches an engine configuration from the API.
   *
   * @param name The name of the engine to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async engine(name: string): Promise<ReturnType<EngineConfig>> {
    return await this.fetch('get', 'no-store', {
      params: { id: name },
    })
  }

  /**
   * Fetches an engine configuration from the API and expects the result to be successful.
   *
   * @param name The name of the engine to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link EngineClient.engine}
   */
  public async unsafeEngine(name: string): Promise<EngineConfig> {
    return this.unwrap(await this.engine(name))
  }

  /**
   * Deletes an engine configuration from the API.
   *
   * @param name The name of the engine to delete.
   * @param id The id of the engine variation to delete.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async delete(name: string, id: string): Promise<ReturnType<SuccessState>> {
    return await this.fetch('delete', 'no-store', {
      params: { id, engine: name },
    })
  }

  /**
   * Deletes an engine configuration from the API and expects the result to be successful.
   *
   * @param name The name of the engine to delete.
   * @param id The id of the engine variation to delete.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link EngineClient.delete}
   */
  public async unsafeDelete(name: string, id: string): Promise<SuccessState> {
    return this.unwrap(await this.delete(name, id))
  }

  /**
   * Fetches an engine variation from the API.
   *
   * @param name The name of the engine to fetch.
   * @param version The version of the engine to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async version(name: string, version: EngineVersion): Promise<ReturnType<EngineVariation>> {
    return await this.fetch('getVersion', 'no-store', {
      params: { name, version },
    })
  }

  /**
   * Fetches an engine variation from the API and expects the result to be successful.
   *
   * @param name The name of the engine to fetch.
   * @param version The version of the engine to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link EngineClient.version}
   */
  public async unsafeVersion(name: string, version: EngineVersion): Promise<EngineVariation> {
    return this.unwrap(await this.version(name, version))
  }

  /**
   * Creates an engine configuration on the API.
   *
   * @param data The executable file of the engine.
   * @param meta The metadata of the engine.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async create(data: Blob, meta: CreateOptions): Promise<ReturnType<EngineConfig>> {
    return await this.fetch('create', 'no-store', {
      body: {
        ...meta,
      },
      files: {
        engine: data,
      },
      transform: (key, _) => {
        if (key === 'version') {
          return encodeVersion(meta.version)
        }

        if (key === 'capabilities') {
          return meta.capabilities.join(',')
        }

        return undefined
      },
    })
  }

  /**
   * Creates an engine configuration on the API and expects the result to be successful.
   *
   * @param data The executable file of the engine.
   * @param meta The metadata of the engine.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link EngineClient.create}
   */
  public async unsafeCreate(data: Blob, meta: CreateOptions): Promise<EngineConfig> {
    return this.unwrap(await this.create(data, meta))
  }
}
