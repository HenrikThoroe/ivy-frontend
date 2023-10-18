import CreateVerificationGroupForm from '@/components/CreateVerificationGroupForm/CreateVerificationGroupForm'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'

export default async function Create() {
  const client = new EngineClient(serverStrategy())
  const configs = await client.unsafeEngines()

  return <CreateVerificationGroupForm configs={configs} />
}
