import { NextRequest, NextResponse } from 'next/server'
import { isJwtValid, shouldRefresh } from './lib/api/auth/parser/jwt'
import { serverStrategy } from './lib/api/auth/strategy/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const strategy = serverStrategy({ connection: { request, response } })
  const jwt = strategy.store.jwt

  //? When a JWT is not available, the user is redirected to the login page.
  if (!jwt.available) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //? When a JWT is available, but not valid, the user is redirected to the login page and tokens are cleared.
  if (!isJwtValid(jwt.token)) {
    strategy.logout?.call(undefined)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //? When a JWT is available and valid, but should be refreshed, the API is called to update the tokens.
  if (shouldRefresh(jwt.token) && strategy.refresh) {
    try {
      await strategy.refresh()
    } catch (e) {
      strategy.logout?.call(undefined)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register|waiting).*)'],
}
