import { cookies } from 'next/headers'
import { JWTProvider, RefreshTokenProvider, TokenResult, tokenKeys, tokenResult } from './types'

/**
 * Token store that uses NextJS `cookies()` API.
 * Allows for reading of all tokens but not updating or clearing.
 */
export class NextTokenStore implements JWTProvider, RefreshTokenProvider {
  public get jwt(): TokenResult {
    return tokenResult(cookies().get(tokenKeys.jwt)?.value)
  }

  public get refreshToken(): TokenResult {
    return tokenResult(cookies().get(tokenKeys.refreshToken)?.value)
  }
}
