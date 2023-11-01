import CreateVerificationGroupForm from '@/components/(form)/CreateVerificationGroupForm/CreateVerificationGroupForm'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Create Compare Group',
  description: 'Create a new group of engines to compare',
}

export default async function Create() {
  const client = new EngineClient(serverStrategy())
  const configs = await client.unsafeEngines()

  return <CreateVerificationGroupForm configs={configs} />
}
