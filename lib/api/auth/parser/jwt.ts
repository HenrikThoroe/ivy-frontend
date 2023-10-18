import { timeLock } from '@/lib/util/lock'
import * as jose from 'jose'

//? Refresh token two minutes before expiration.
const refreshOffset = 60 * 2

const lockKey = 'refresh'

const lockDuration = 1000

/**
 * Check if the JWT should be refreshed.
 * If the token is invalid, this function will return `false`.
 *
 * The function is time locked, to prevent multiple refreshes when
 * requests are made in parallel.
 *
 * @param jwt The JWT string.
 * @returns `true` if the JWT should be refreshed, `false` otherwise.
 */
export function shouldRefresh(jwt: string): boolean {
  if (timeLock(lockKey, lockDuration)) {
    return false
  }

  try {
    const payload = jose.decodeJwt(jwt)

    if (payload.exp && payload.exp < Date.now() / 1000 + refreshOffset) {
      return true
    }

    return false
  } catch (e) {
    return false
  }
}

/**
 * Checks if the JWT is valid and not expired.
 * Does not verify the signature.
 *
 * @param jwt The JWT string.
 * @returns `true` if the JWT is valid, `false` otherwise.
 */
export function isJwtValid(jwt: string): boolean {
  try {
    const payload = jose.decodeJwt(jwt)

    if (!payload.exp || payload.exp <= Date.now() / 1000) {
      return false
    }

    return true
  } catch (e) {
    return false
  }
}
