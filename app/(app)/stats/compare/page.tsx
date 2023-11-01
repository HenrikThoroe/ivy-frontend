import VerificationGroupList from '@/components/(list)/VerificationGroupList/VerificationGroupList'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Compare Engines',
  description: 'Compare sets of engines',
}

export default async function Compare() {
  const client = new VerificationStatsClient(serverStrategy())
  const groups = await client.unsafeGroups()

  return <VerificationGroupList groups={groups} />
}
