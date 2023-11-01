import ActionCard from '@/components/(card)/ActionCard/ActionCard'
import EngineCard from '@/components/(card)/EngineCard/EngineCard'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ivy - Engine List',
  description: 'List of available engines',
}

export default async function Engines() {
  const client = new EngineClient(serverStrategy())
  const engines = await client.unsafeEngines()

  return (
    <div className="flex w-full flex-row flex-wrap justify-start gap-x-10 gap-y-20 p-10">
      <ActionCard icon="upload" title="Upload Engine" href="/engines/upload" />
      {engines.map((e, i) => (
        <Link href={`/engines/${e.name}`}>
          <EngineCard engine={e} variant={i % 3 === 0 ? 'glass' : 'primary'} />
        </Link>
      ))}
    </div>
  )
}
