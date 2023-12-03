import { api } from '@ivy-chess/api-schema'
import { LiveGame } from '@ivy-chess/model'
import { useEffect, useState } from 'react'
import { RealTimeClient } from '../live/RealTimeClient'

const spectatorInterface = api.games.ws.spectatorInterface

type SpectatorClient = RealTimeClient<
  typeof spectatorInterface.input,
  typeof spectatorInterface.output
>

/**
 * A hook that returns a `LiveGame` object.
 * Uses the WebSocket API to listen for updates on the
 * given game.
 *
 * @param init The initial game state. Use the REST API to fetch it.
 * @returns The game state with live updates.
 */
export function useLiveGame(init: LiveGame) {
  const [game, setGame] = useState(init)
  const [socket, setSocket] = useState<SpectatorClient | null>(null)

  const listen = async () => {
    const client = await RealTimeClient.custom(
      process.env.NEXT_PUBLIC_GAMES_SPECTATOR_HOST!,
      spectatorInterface
    )

    setSocket(client)
    client.send('subscribe', { key: 'subscribe-msg', id: game.id })
    client.on('state', (data) => setGame(data.game))
  }

  useEffect(() => {
    listen()
    return () => {
      socket?.exit()
    }
  }, [])

  return game
}
