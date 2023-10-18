import ReplayInfo from '@/components/ReplayInfo/ReplayInfo'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { ReplayClient } from '@/lib/api/clients/ReplayClient'

interface Params {
  id: string
}

export default async function Replay({ params }: { params: Params }) {
  const { id } = params
  const client = new ReplayClient(serverStrategy())

  const res = {
    replay: await client.get(id),
    stats: await client.stats(id),
  }

  if (!res.replay.success) {
    throw new Error(res.replay.error.message)
  }

  if (!res.stats.success) {
    throw new Error(res.stats.error.message)
  }

  const replay = res.replay.result
  const stats = res.stats.result

  return <ReplayInfo replay={replay} stats={stats} />
}
