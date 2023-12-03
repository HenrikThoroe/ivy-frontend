import { useEffect, useState } from 'react'
import { PlayerClient } from '../live/PlayerClient'

/**
 * A hook that returns a `PlayerClient` instance.
 * Uses the WebSocket API to listen for updates for the
 * given player.
 *
 * @returns The player client.
 */
export function usePlayerClient() {
  const [_, setToggle] = useState(false)
  const client = PlayerClient.cached

  useEffect(() => {
    const remove = client.subscribe(() => {
      setToggle((prev) => !prev)
    })

    return () => {
      remove()
    }
  }, [])

  return client
}
