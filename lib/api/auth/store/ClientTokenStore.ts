import Cookies from 'js-cookie'
import { JWTStore, TokenResult, tokenKeys, tokenResult } from './types'

/**
 * Client side token store.
 * Allows for updating and clearing of the JWT,
 * but has no access to the refresh token.
 */
export class ClientTokenStore implements JWTStore {
  public get jwt(): TokenResult {
    return tokenResult(Cookies.get(tokenKeys.jwt))
  }

  public updateJwt(token: string): void {
    Cookies.set(tokenKeys.jwt, token)
  }

  public clear(): void {
    Cookies.remove(tokenKeys.jwt)
  }
}
