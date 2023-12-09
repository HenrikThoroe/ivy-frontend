import LiveGameView from '@/components/(view)/LiveGameView/LiveGameView'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { GameClient } from '@/lib/api/clients/GameClient'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'Ivy - Live Game',
  description: 'Interactive game with live updates',
}

export default async function GamePage({ params }: Props) {
  const client = new GameClient(serverStrategy())
  const game = await client.get(params.id)

  if (!game.success) {
    notFound()
  }

  return <LiveGameView data={game.result} />
}
