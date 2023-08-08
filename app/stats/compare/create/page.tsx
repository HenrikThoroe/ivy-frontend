import CreateVerificationGroupForm from '@/components/CreateVerificationGroupForm/CreateVerificationGroupForm'
import { fetchEngineConfigs } from '@/lib/data/Engine'

export default async function Create() {
  const configs = await fetchEngineConfigs()

  return <CreateVerificationGroupForm configs={configs} />
}
