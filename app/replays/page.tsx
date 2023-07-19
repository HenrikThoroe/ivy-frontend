import ReplayList from '@/components/ReplayList/ReplayList'
import { fetchReplay, fetchReplays, parseReplayFilterOptions } from '@/lib/data/Replay'
import { ReadonlyURLSearchParams } from 'next/navigation'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

function parseFilterOptions(props: Props) {
  const params: string[][] = []

  Object.entries(props.searchParams ?? {}).forEach(([key, value]) => {
    if (value) {
      params.push([key, value.toString()])
    }
  })

  return parseReplayFilterOptions(new ReadonlyURLSearchParams(new URLSearchParams(params)))
}

export default async function Replays({ searchParams }: Props) {
  const filterOptions = parseFilterOptions({ searchParams })
  const ids = await fetchReplays(filterOptions)
  const replays = await Promise.all(ids.map((id) => fetchReplay(id)))

  replays.sort((a, b) => b.date.getTime() - a.date.getTime())

  return <ReplayList replays={replays} />
}
