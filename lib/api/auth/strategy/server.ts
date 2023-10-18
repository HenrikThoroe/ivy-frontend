import { NextRequest, NextResponse } from 'next/server'
import { AuthClient } from '../../clients/AuthClient'
import { NextTokenStore } from '../store/NextTokenStore'
import { RequestTokenStore } from '../store/RequestTokenStore'
import { JWTProvider, RefreshTokenProvider } from '../store/types'
import { TokenStrategy } from './TokenStrategy'

interface Options {
  connection?: {
    request: NextRequest
    response: NextResponse
  }
}

type ServerProvider = JWTProvider & RefreshTokenProvider

function requestStrategy(
  request: NextRequest,
  response: NextResponse
): TokenStrategy<ServerProvider> {
  const store = new RequestTokenStore(request, response)

  return {
    store,
    refresh: async (token) => {
      if (token) {
        store.updateRefreshToken(token)
        return
      }

      const rt = store.refreshToken
      const jwt = store.jwt

      if (!rt.available || !jwt.available) {
        return
      }

      const client = new AuthClient({ store })
      const updated = await client.refresh(rt.token)

      if (updated.success) {
        const { jwt, refreshToken } = updated.result

        store.updateJwt(jwt)
        store.updateRefreshToken(refreshToken)
      }
    },
    logout: () => store.clear(),
  }
}

function nextStrategy(): TokenStrategy<ServerProvider> {
  const store = new NextTokenStore()
  return { store }
}

/**
 * Creates a {@link TokenStrategy} for server-side requests.
 * When given a connection, the strategy will support refreshing and updating tokens.
 *
 * @param options An optional connection to use for the strategy.
 * @returns A token strategy for server-side requests.
 */
export function serverStrategy(options?: Options): TokenStrategy<ServerProvider> {
  if (options?.connection) {
    return requestStrategy(options.connection.request, options.connection.response)
  }

  return nextStrategy()
}
