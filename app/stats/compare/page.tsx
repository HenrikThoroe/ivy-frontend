import VerificationGroupList from '@/components/VerificationGroupList/VerificationGroupList'
import { fetchVerificationGroups } from '@/lib/data/Stats'

export default async function Compare() {
  const groups = await fetchVerificationGroups()

  return <VerificationGroupList groups={groups} />
}
