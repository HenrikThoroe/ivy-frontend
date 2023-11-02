import { NextRequest, NextResponse } from 'next/server'
import {
  JWTStore,
  RefreshTokenStore,
  RoleStore,
  TokenResult,
  tokenKeys,
  tokenResult,
} from './types'

/**
 * Token store that uses cookies from a request and response.
 * Allows for updating and clearing of all tokens.
 */
export class RequestTokenStore implements JWTStore, RefreshTokenStore, RoleStore {
  private readonly request: NextRequest

  private readonly response: NextResponse

  constructor(request: NextRequest, response: NextResponse) {
    this.request = request
    this.response = response
  }

  //* API

  public get jwt(): TokenResult {
    return tokenResult(this.request.cookies.get(tokenKeys.jwt)?.value)
  }

  public get refreshToken(): TokenResult {
    return tokenResult(this.request.cookies.get(tokenKeys.refreshToken)?.value)
  }

  public get role(): TokenResult {
    return tokenResult(this.request.cookies.get(tokenKeys.role)?.value)
  }

  public updateJwt(token: string): void {
    this.response.cookies.set(tokenKeys.jwt, token)
  }

  public updateRefreshToken(token: string): void {
    this.response.cookies.set(tokenKeys.refreshToken, token, {
      httpOnly: true,
    })
  }

  public updateRole(role: string): void {
    this.response.cookies.set(tokenKeys.role, role)
  }

  public clear(): void {
    this.response.cookies.delete(tokenKeys.jwt)
    this.response.cookies.delete(tokenKeys.refreshToken)
    this.response.cookies.delete(tokenKeys.role)
  }
}
