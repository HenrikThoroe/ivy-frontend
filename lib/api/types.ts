import { Endpoint, Route, shared } from '@ivy-chess/api-schema'
import { z } from 'zod'

/**
 * Common API return type.
 */
export type WithID = z.infer<typeof shared.generic.withIdSchema>

/**
 * Common API return type.
 */
export interface SuccessState {
  success: boolean
}

/**
 * Success type of an endpoint.
 */
export type Success<T> = T extends Endpoint<any, any, any, any, infer S, any> ? z.infer<S> : never

/**
 * Failure type of an endpoint.
 */
export type Failure<T> = T extends Endpoint<any, any, any, any, any, any, infer F>
  ? z.infer<F>
  : never

/**
 * Body type of an endpoint.
 */
export type Body<T> = T extends Endpoint<any, infer B, any, any, any, any> ? z.infer<B> : never

/**
 * Query type of an endpoint.
 */
export type Query<T> = T extends Endpoint<infer Q, any, any, any, any, any> ? z.infer<Q> : never

/**
 * Params type of an endpoint.
 */
export type Params<T> = T extends Endpoint<any, any, infer P, any, any, any> ? z.infer<P> : never

/**
 * Files type of an endpoint.
 */
export type Files<T> = T extends Endpoint<any, any, any, infer F, any, any> ? F : never

/**
 * Result which contains either a success or an error property depending on the success type.
 */
export type Result<S, F, B = boolean> = B extends true
  ? { success: B; result: S }
  : { success: B; error: F }

/**
 * Fetch result which contains either a success or an error property depending on the success type.
 */
export type FetchResult<T, B = boolean> = Result<Success<T>, Failure<T>, B>

/**
 * Fetch options for an endpoint.
 */
export interface FetchOptions<T extends Endpoint<any, any, any, any, any, any>> {
  body: Body<T>
  query: Query<T>
  params: Params<T>
  files: Record<Files<T>, Blob>

  /**
   * A transformation function used to serialize form data before sending it.
   * Will only apply if the data is sent as form data, which is the case when a file is present.
   *
   * @param key The key of the body value.
   * @param value The value for the key.
   * @returns A string value to replace the original value or undefined to keep the original value.
   */
  transform?: <K extends keyof Body<T>>(key: K, value: Body<T>[K]) => string | undefined
}

/**
 * Config type of a route.
 */
export type Config<T> = T extends Route<infer C> ? C : never

/**
 * Return type of a fetch request.
 */
export type ReturnType<T, F = { message: string }> = Result<T, F>
