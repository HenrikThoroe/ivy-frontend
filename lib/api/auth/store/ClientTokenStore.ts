import Cookies from 'js-cookie'
import { JWTStore, RoleStore, TokenResult, tokenKeys, tokenResult } from './types'

/**
 * Client side token store.
 * Allows for updating and clearing of the JWT,
 * but has no access to the refresh token.
 */
export class ClientTokenStore implements JWTStore, RoleStore {
  public get jwt(): TokenResult {
    return tokenResult(Cookies.get(tokenKeys.jwt))
  }

  public get role(): TokenResult {
    return tokenResult(Cookies.get(tokenKeys.role))
  }

  public updateJwt(token: string): void {
    Cookies.set(tokenKeys.jwt, token)
  }

  public updateRole(role: string): void {
    Cookies.set(tokenKeys.role, role)
  }

  public clear(): void {
    Cookies.remove(tokenKeys.jwt)
    Cookies.remove(tokenKeys.role)
  }
}
