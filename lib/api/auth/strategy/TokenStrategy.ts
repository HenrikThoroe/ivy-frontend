import { JWTProvider } from '../store/types'

/**
 * A token strategy is a set of functions that allow for
 * actions based on the stored tokens.
 *
 * The strategy varies based on the environment and
 * access to the tokens.
 *
 * @see {@link clientStrategy}
 * @see {@link serverStrategy}
 */
export interface TokenStrategy<T extends JWTProvider> {
  /**
   * The underlying token store.
   * Has at least the capability of reading the JWT.
   */
  store: T

  /**
   * When available refreshes the JWT.
   * May perform a network request.
   *
   * @param refreshToken When given will use the token instead of requesting it from the API.
   */
  refresh?: (refreshToken?: string) => Promise<void>

  /**
   * When available removes all stored tokens,
   * accessible from the current environment.
   */
  logout?: () => void
}
