interface Store {
  /**
   * Clear the stored tokens.
   */
  clear(): void
}

/**
 * Result of a token lookup.
 *
 * @param T - Whether the token is available
 */
export type TokenResult<T extends boolean = boolean> = T extends true
  ? { available: T; token: string }
  : { available: T }

/**
 * Source for stored JWTs.
 */
export interface JWTProvider {
  /**
   * The stored JWT.
   */
  get jwt(): TokenResult
}

/**
 * Source for stored refresh tokens.
 */
export interface RefreshTokenProvider {
  /**
   * The stored refresh token.
   */
  get refreshToken(): TokenResult
}

/**
 * Source for stored user roles.
 */
export interface RoleProvider {
  /**
   * The stored user role.
   */
  get role(): TokenResult
}

/**
 * Write-enabled JWT provider.
 */
export interface JWTStore extends JWTProvider, Store {
  /**
   * Update the stored JWT.
   *
   * @param token The new JWT
   */
  updateJwt(token: string): void
}

/**
 * Write-enabled refresh token provider.
 */
export interface RefreshTokenStore extends RefreshTokenProvider, Store {
  /**
   * Update the stored refresh token.
   *
   * @param token The new refresh token
   */
  updateRefreshToken(token: string): void
}

/**
 * Write-enabled role provider.
 */
export interface RoleStore extends RoleProvider, Store {
  /**
   * Update the stored role.
   *
   * @param role The new role
   */
  updateRole(role: string): void
}

/**
 * Recommended keys to use for storing tokens.
 */
export const tokenKeys = {
  jwt: 'jwt',
  refreshToken: 'rt',
  role: 'role',
}

/**
 * Create a token result from an optional token value.
 *
 * @param value The token value
 * @returns The token result
 */
export const tokenResult = (value?: string): TokenResult => {
  if (value) {
    return {
      available: true,
      token: value,
    }
  }

  return { available: false }
}
