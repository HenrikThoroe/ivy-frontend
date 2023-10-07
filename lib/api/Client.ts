import { Route, RouteConfig } from '@ivy-chess/api-schema'
import { buildSearchParams } from '../util/buildSearchParams'
import { Failure, FetchOptions, FetchResult, Result } from './types'

/**
 * A client allows to make requests against an API given by its schema.
 */
export abstract class Client<T extends RouteConfig> {
  private readonly schema: Route<T>

  private readonly clientUrl?: string

  private readonly serverUrl?: string

  constructor(schema: Route<T>, clientUrl: string | undefined, serverUrl: string | undefined) {
    this.schema = schema
    this.clientUrl = clientUrl
    this.serverUrl = serverUrl
  }

  //* API

  /**
   * Takes a result from a fetch request and unwraps it.
   * If the result resolves to an error, the method will throw.
   *
   * @param result The {@link Result} to unwrap.
   * @throws When the result resolves to an error an `Error` will be thrown.
   *         The error message will be the `message` property of the error if available.
   *         Otherwise the error will be converted to a string.
   * @returns The result of the fetch request in case of success.
   */
  public unwrap<T, F extends object>(result: Result<T, F>): T {
    if (!result.success) {
      if ('message' in result.error && typeof result.error.message === 'string') {
        throw new Error(result.error.message)
      }

      throw new Error(result.error.toString())
    }

    return result.result
  }

  //* Protected Methods

  /**
   * Fetches a resource from the API.
   *
   * @param key The key of the resource to fetch.
   * @param cache The cache strategy to use.
   * @param target The target to fetch from depending on the environment of the client.
   * @param options The options to pass to the fetch request.
   * @return The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  protected async fetch<K extends Extract<keyof T, string>>(
    key: K,
    cache: RequestCache | number,
    target: 'client' | 'server',
    options: Partial<FetchOptions<T[K]>>
  ): Promise<FetchResult<T[K]>> {
    const ep = this.schema.get(key)
    const url = this.buildURL(key, target, options)

    const response = await fetch(url, {
      method: ep.method,
      body: JSON.stringify(options.body),
      mode: 'cors',
      cache: typeof cache === 'number' ? 'default' : cache,
      next: typeof cache !== 'number' ? undefined : { revalidate: cache },
    })

    if (!response.ok) {
      const body = await response.json()
      const error = ep.validateFailure(body) as Failure<T[K]>

      return {
        success: false,
        error,
      }
    }

    const body = await response.json()
    const result = ep.validateSuccess(body)

    return {
      success: true,
      result,
    }
  }

  //* Private Methods

  private buildURL<K extends Extract<keyof T, string>>(
    key: K,
    target: 'client' | 'server',
    options: Partial<FetchOptions<T[K]>>
  ) {
    const host = target === 'client' ? this.clientUrl : this.serverUrl

    if (!host) {
      throw new Error(`No ${target} host configured`)
    }

    const query = buildSearchParams(options.query ?? {})
    const ep = this.schema.get(key)
    let path = ep.path

    for (const key in options.params) {
      const value = options.params[key]
      path = path.replace(`:${key}`, value)
    }

    return `${host}${this.schema.path}${path}${this.encodeQuery(query)}`
  }

  private encodeQuery(query: URLSearchParams): string {
    const encoded = query.toString()

    if (encoded.length === 0) {
      return ''
    }

    return `?${encoded}`
  }
}
