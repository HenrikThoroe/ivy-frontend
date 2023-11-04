import { AuthClient, Credentials } from '../../clients/AuthClient'
import { ClientTokenStore } from '../store/ClientTokenStore'
import { JWTStore, RoleStore } from '../store/types'
import { TokenStrategy } from './TokenStrategy'

type ClientStore = JWTStore & RoleStore

type ClientStrategy = TokenStrategy<ClientStore>

interface SetupOptions {
  client: AuthClient
  strategy: ClientStrategy
  credentials: Credentials
}

/**
 * Setup user credentials on the client.
 * The users access tokens will be stored in cookies
 * and the users will be fetched from the API.
 *
 * @param options The client, strategy and credentials to use.
 */
export async function setupCredentials(options: SetupOptions) {
  const { client, strategy, credentials } = options

  strategy.store.updateJwt(credentials.jwt)

  //? If refreshing is supported, refresh jwt to synchronize refresh token

  if (strategy.refresh) {
    await strategy.refresh(credentials.refreshToken)
  }

  //? Get user profile and store role

  const user = await client.profile()

  if (user.success) {
    strategy.store.updateRole(user.result.role)
  }
}

/**
 * Creates a client strategy which implements the {@link TokenStrategy} interface.
 * The strategy allows reading and writing the users access token and role from and to a cookie.
 *
 * @returns A {@link TokenStrategy} which stores the users access token in a cookie.
 */
export function clientStrategy(): ClientStrategy {
  const store = new ClientTokenStore()

  return {
    store,
    refresh: async (token) => {
      const resp = await fetch(process.env.NEXT_PUBLIC_REFRESH_URL!, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ token }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!resp.ok) {
        store.clear()
      }
    },
    logout: () => store.clear(),
  }
}
