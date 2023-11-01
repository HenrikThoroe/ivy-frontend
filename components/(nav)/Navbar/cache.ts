import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'

const caches = new Map<string, Map<string, string>>()

/**
 * A function that resolves an ID to a name.
 *
 * @see resolveTestSuiteName
 * @see resolveVerificationGroupName
 */
export interface IDResolver {
  (id: string): Promise<string>
}

/**
 * Caches a value for a given key and cache name.
 * Tries to find a value for the key in the cache and returns it if found.
 * Otherwise, calls the fallback function, caches the result and returns it.
 *
 * @param cache The cache name
 * @param key The key to cache the value under
 * @param fallback The fallback function to call if the value is not found in the cache
 * @returns The cached value or the result of the fallback function
 */
async function withCache(cache: string, key: string, fallback: () => Promise<string>) {
  if (!caches.has(cache)) {
    caches.set(cache, new Map())
  }

  const store = caches.get(cache)!

  if (!store.has(key)) {
    store.set(key, await fallback())
  }

  return store.get(key)!
}

/**
 * Resolves the name of a test suite by its ID.
 * Will attempt to find the name in an in-memory cache first.
 *
 * @param id The ID of the test suite
 * @returns The name of the test suite
 */
export async function resolveTestSuiteName(id: string) {
  return withCache('test-suite-names', id, async () => {
    const client = new TestSuiteClient(clientStrategy())
    const suite = await client.unsafeSuite(id)

    return suite.name
  })
}

/**
 * Resolves the name of a verification group by its ID.
 * Will attempt to find the name in an in-memory cache first.
 *
 * @param id The ID of the verification group
 * @returns The name of the verification group
 */
export async function resolveVerificationGroupName(id: string) {
  return withCache('verification-group-names', id, async () => {
    const client = new VerificationStatsClient(clientStrategy())
    const group = await client.unsafeGroup(id)

    return group.name
  })
}
