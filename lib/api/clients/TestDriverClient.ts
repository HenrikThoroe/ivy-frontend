import { api } from '@ivy-chess/api-schema'
import { TestDriver } from '@ivy-chess/model'
import { Client } from '../Client'
import { Config, ReturnType } from '../types'

/**
 * Client for the test driver API.
 */
export class TestDriverClient extends Client<Config<typeof api.testing.http.driverRoute>> {
  constructor() {
    super(
      api.testing.http.driverRoute,
      process.env.NEXT_PUBLIC_TEST_SERVER_HOST,
      process.env.TEST_SERVER_HOST
    )
  }

  //* API

  /**
   * Fetches all test drivers from the API.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async drivers(): Promise<ReturnType<TestDriver[]>> {
    return await this.fetch('all', 'no-store', 'client', {})
  }

  /**
   * Fetches all test drivers from the API and expects the result to be successful.
   *
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestDriverClient.drivers}
   */
  public async unsafeDrivers(): Promise<TestDriver[]> {
    return this.unwrap(await this.drivers())
  }

  /**
   * Fetches a test driver from the API.
   *
   * @param id The id of the test driver to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async driver(id: string): Promise<ReturnType<TestDriver>> {
    return await this.fetch('get', 'no-store', 'client', {
      params: { id },
    })
  }

  /**
   * Fetches a test driver from the API and expects the result to be successful.
   *
   * @param id The id of the test driver to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestDriverClient.driver}
   */
  public async unsafeDriver(id: string): Promise<TestDriver> {
    return this.unwrap(await this.driver(id))
  }
}
