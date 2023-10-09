import CreateVerificationGroupForm from '@/components/CreateVerificationGroupForm/CreateVerificationGroupForm'
import { EngineClient } from '@/lib/api/clients/EngineClient'

export default async function Create() {
  const client = new EngineClient()
  const configs = await client.unsafeEngines()

  return <CreateVerificationGroupForm configs={configs} />
}
