import { cookies } from 'next/headers'
import {
  JWTProvider,
  RefreshTokenProvider,
  RoleProvider,
  TokenResult,
  tokenKeys,
  tokenResult,
} from './types'

/**
 * Token store that uses NextJS `cookies()` API.
 * Allows for reading of all tokens but not updating or clearing.
 */
export class NextTokenStore implements JWTProvider, RefreshTokenProvider, RoleProvider {
  public get jwt(): TokenResult {
    return tokenResult(cookies().get(tokenKeys.jwt)?.value)
  }

  public get refreshToken(): TokenResult {
    return tokenResult(cookies().get(tokenKeys.refreshToken)?.value)
  }

  public get role(): TokenResult {
    return tokenResult(cookies().get(tokenKeys.role)?.value)
  }
}
