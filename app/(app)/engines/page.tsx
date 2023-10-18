import EngineCard from '@/components/Card/Engine'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { EngineHelper } from '@/lib/data/EngineHelper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Engine List',
  description: 'List of available engines',
}

export const revalidate = 0

export default async function Engines() {
  const client = new EngineClient(serverStrategy())
  const engines = await client.unsafeEngines()

  const buildCards = () => {
    return engines.map((engine) => {
      const helper = new EngineHelper(engine)
      return <EngineCard variant="engine" name={engine.name} os={helper.os} arch={helper.arch} />
    })
  }

  return (
    <div className="grid w-full grid-cols-auto-fill-card-md justify-center gap-10 p-10">
      <EngineCard variant="template" />
      {buildCards()}
    </div>
  )
}
