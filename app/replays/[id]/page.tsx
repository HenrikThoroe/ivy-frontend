import ReplayInfo from '@/components/ReplayInfo/ReplayInfo'
import { fetchReplay, fetchReplayStats } from '@/lib/data/Replay'

interface Params {
  id: string
}

export default async function Replay({ params }: { params: Params }) {
  const { id } = params
  const replay = await fetchReplay(id)
  const stats = await fetchReplayStats(id)

  return <ReplayInfo replay={replay} stats={stats} />
}
