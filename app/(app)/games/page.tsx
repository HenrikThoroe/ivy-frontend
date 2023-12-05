import GamesList from '@/components/(list)/GamesList/GamesList'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { GameClient } from '@/lib/api/clients/GameClient'
import { LiveGame } from '@ivy-chess/model'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Ivy - Live Games',
  description: 'List of all live games',
}

export default async function Games() {
  const client = new GameClient(serverStrategy())
  const ids = await client.list()

  if (!ids.success) {
    notFound()
  }

  const data = await Promise.all(ids.result.map((id) => client.get(id)))

  if (!data.every((game) => game.success)) {
    notFound()
  }

  const games = data
    .map((g) => (g.success ? g.result : undefined))
    .filter((g): g is LiveGame => g !== undefined)

  return <GamesList games={games} />
}
