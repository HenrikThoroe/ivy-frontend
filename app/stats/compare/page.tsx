import VerificationGroupList from '@/components/VerificationGroupList/VerificationGroupList'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'

export default async function Compare() {
  const client = new VerificationStatsClient()
  const groups = await client.unsafeGroups()

  return <VerificationGroupList groups={groups} />
}
