import VerificationGroupList from '@/components/VerificationGroupList/VerificationGroupList'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'

export default async function Compare() {
  const client = new VerificationStatsClient(serverStrategy())
  const groups = await client.unsafeGroups()

  return <VerificationGroupList groups={groups} />
}
