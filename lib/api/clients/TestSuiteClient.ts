import { api } from '@ivy-chess/api-schema'
import { TestSuite } from '@ivy-chess/model'
import { Client } from '../Client'
import { JWTProvider } from '../auth/store/types'
import { TokenStrategy } from '../auth/strategy/TokenStrategy'
import { Config, ReturnType, WithID } from '../types'

/**
 * Client for the test suite API.
 */
export class TestSuiteClient extends Client<Config<typeof api.testing.http.testSuitesRoute>> {
  constructor(strategy: TokenStrategy<JWTProvider>) {
    super(api.testing.http.testSuitesRoute, process.env.NEXT_PUBLIC_TEST_SERVER_HOST, strategy)
  }

  //* API

  /**
   * Fetches all test suite ids from the API.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async suites(): Promise<ReturnType<string[]>> {
    return await this.fetch('all', 'no-store', {})
  }

  /**
   * Fetches all test suite ids from the API and expects the result to be successful.
   *
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSuiteClient.suites}
   */
  public async unsafeSuites(): Promise<string[]> {
    return this.unwrap(await this.suites())
  }

  /**
   * Fetches a test suite from the API.
   *
   * @param id The id of the test suite to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async suite(id: string): Promise<ReturnType<TestSuite>> {
    return await this.fetch('get', 'no-store', {
      params: { id },
    })
  }

  /**
   * Fetches a test suite from the API and expects the result to be successful.
   *
   * @param id The id of the test suite to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSuiteClient.suite}
   */
  public async unsafeSuite(id: string): Promise<TestSuite> {
    return this.unwrap(await this.suite(id))
  }

  /**
   * Creates a new test suite.
   *
   * @param suite The suite to create
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async create(suite: Omit<TestSuite, 'id'>): Promise<ReturnType<WithID>> {
    return await this.fetch('create', 'no-store', {
      body: suite,
    })
  }

  /**
   * Creates a new test suite and expects the result to be successful.
   *
   * @param suite The suite to create
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSuiteClient.create}
   */
  public async unsafeCreate(suite: Omit<TestSuite, 'id'>): Promise<WithID> {
    return this.unwrap(await this.create(suite))
  }

  /**
   * Deletes a test suite.
   *
   * @param id The id of the test suite to delete.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async delete(id: string): Promise<ReturnType<WithID>> {
    return await this.fetch('delete', 'no-store', {
      params: { id },
    })
  }

  /**
   * Deletes a test suite and expects the result to be successful.
   *
   * @param id The id of the test suite to delete.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSuiteClient.delete}
   */
  public async unsafeDelete(id: string): Promise<WithID> {
    return this.unwrap(await this.delete(id))
  }
}
