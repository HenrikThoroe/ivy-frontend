import ReplayView from '@/components/(view)/ReplayView/ReplayView'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { ReplayClient } from '@/lib/api/clients/ReplayClient'
import { ReplayLog } from '@ivy-chess/model'
import { Metadata } from 'next'

interface Params {
  id: string
}

export const metadata: Metadata = {
  title: 'Ivy - Replay',
  description: 'Details about a replay',
}

export default async function Replay({ params }: { params: Params }) {
  const { id } = params
  const client = new ReplayClient(serverStrategy())
  let logs: ReplayLog | undefined

  const res = {
    replay: await client.unsafeGet(id),
    stats: await client.unsafeStats(id),
    logs: await client.logs(id),
  }

  if (res.logs.success) {
    logs = res.logs.result
  }

  return <ReplayView replay={res.replay} stats={res.stats} logs={logs} />
}
