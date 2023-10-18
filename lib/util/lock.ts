const locks = new Map<string, number>()

/**
 * A simple time-based lock to prevent multiple requests from being made
 * at the same time frame.
 *
 * When a lock is unset or expired, the function will return `false` and
 * set the lock to the current time plus the duration.
 *
 * Otherwise, the function will return `true` and leave the lock as is.
 *
 * @param key The key of the lock. Calls with with different keys do not affect each other.
 * @param duration The duration of the lock in milliseconds.
 * @returns `true` if the caller should not proceed, `false` otherwise.
 */
export function timeLock(key: string, duration: number): boolean {
  const current = locks.get(key)
  const now = Date.now()

  if (!current) {
    locks.set(key, now + duration)
    return false
  }

  if (current < now) {
    locks.set(key, now + duration)
    return false
  }

  return true
}
