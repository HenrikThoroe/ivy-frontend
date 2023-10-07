import { Endpoint, Route } from '@ivy-chess/api-schema'
import { z } from 'zod'

/**
 * Success type of an endpoint.
 */
export type Success<T> = T extends Endpoint<any, any, any, any, infer S, any> ? z.infer<S> : never

/**
 * Failure type of an endpoint.
 */
export type Failure<T> = T extends Endpoint<any, any, any, any, any, infer F> ? z.infer<F> : never

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
}

/**
 * Config type of a route.
 */
export type Config<T> = T extends Route<infer C> ? C : never

/**
 * Return type of a fetch request.
 */
export type ReturnType<T, F = { message: string }> = Result<T, F>
