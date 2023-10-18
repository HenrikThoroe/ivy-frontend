import { api } from '@ivy-chess/api-schema'
import { z } from 'zod'
import { Client } from '../Client'
import { JWTProvider } from '../auth/store/types'
import { TokenStrategy } from '../auth/strategy/TokenStrategy'
import { Config, ReturnType, WithID } from '../types'

/**
 * Infered type of the test session schema.
 */
export type TestSession = z.infer<typeof api.testing.http.testSessionSchema>

/**
 * Client for the test session API.
 */
export class TestSessionClient extends Client<Config<typeof api.testing.http.sessionsRoute>> {
  constructor(strategy: TokenStrategy<JWTProvider>) {
    super(
      api.testing.http.sessionsRoute,
      process.env.NEXT_PUBLIC_TEST_SERVER_HOST,
      process.env.TEST_SERVER_HOST,
      strategy
    )
  }

  //* API

  /**
   * Fetches all test sessions from the API.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async sessions(): Promise<ReturnType<TestSession[]>> {
    return await this.fetch('all', 'no-store', 'client', {})
  }

  /**
   * Fetches all test sessions from the API and expects the result to be successful.
   *
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSessionClient.sessions}
   */
  public async unsafeSessions(): Promise<TestSession[]> {
    return this.unwrap(await this.sessions())
  }

  /**
   * Fetches a test session from the API.
   *
   * @param id The id of the test session to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async session(id: string): Promise<ReturnType<TestSession>> {
    return await this.fetch('get', 'no-store', 'client', {
      params: { id },
    })
  }

  /**
   * Fetches a test session from the API and expects the result to be successful.
   *
   * @param id The id of the test session to fetch.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSessionClient.session}
   */
  public async unsafeSession(id: string): Promise<TestSession> {
    return this.unwrap(await this.session(id))
  }

  /**
   * Creates a new test session.
   *
   * @param suite The id of the test suite to use.
   * @param driver The number of drivers to use.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async create(suite: string, driver: number): Promise<ReturnType<TestSession>> {
    return await this.fetch('create', 'no-store', 'client', {
      body: {
        suite,
        driver,
      },
    })
  }

  /**
   * Creates a new test session and expects the result to be successful.
   *
   * @param suite The id of the test suite to use.
   * @param driver The number of drivers to use.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSessionClient.create}
   */
  public async unsafeCreate(suite: string, driver: number): Promise<TestSession> {
    return this.unwrap(await this.create(suite, driver))
  }

  /**
   * Deletes a test session.
   *
   * @param id The id of the test session to delete.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async delete(id: string): Promise<ReturnType<WithID>> {
    return await this.fetch('delete', 'no-store', 'client', {
      params: { id },
    })
  }

  /**
   * Deletes a test session and expects the result to be successful.
   *
   * @param id The id of the test session to delete.
   * @returns The result of the fetch request in case of success.
   * @throws When the API returns a non-successfull result, the fetch result is not compatible with the schema or a network error, etc... occurs.
   * @see {@link TestSessionClient.delete}
   */
  public async unsafeDelete(id: string): Promise<WithID> {
    return this.unwrap(await this.delete(id))
  }
}
