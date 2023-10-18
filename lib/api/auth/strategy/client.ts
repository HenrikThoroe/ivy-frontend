import { ClientTokenStore } from '../store/ClientTokenStore'
import { JWTStore } from '../store/types'
import { TokenStrategy } from './TokenStrategy'

export function clientStrategy(): TokenStrategy<JWTStore> {
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
