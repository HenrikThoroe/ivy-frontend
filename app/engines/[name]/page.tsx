import EngineList from '@/components/EngineList/EngineList'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'

interface Props {
  params: {
    name: string
  }
}

export const revalidate = 1

export function generateMetadata({ params }: Props) {
  return {
    title: `Ivy - ${params.name}`,
    description: `Versions of engine '${params.name}'`,
  }
}

export default async function Engine({ params }: Props) {
  const client = new EngineClient(serverStrategy())
  const engine = await client.unsafeEngine(params.name)

  return <EngineList engine={engine} />
}
