import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const response = NextResponse.json({})
  const strategy = serverStrategy({ connection: { request, response } })

  //? Check whether the client provided a refresh token.
  //? When a token is available, it will be set as the new refresh token.
  if (typeof body?.token === 'string' && strategy.refresh) {
    const token: string = body.token
    await strategy.refresh(token)
    return response
  }

  const jwt = strategy.store.jwt
  const refreshToken = strategy.store.refreshToken

  //? When a refresh token and JWT is available, the API is called to
  //? update the tokens.
  if (jwt.available && refreshToken.available && strategy.refresh) {
    await strategy.refresh()
  }

  return response
}
