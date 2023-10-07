import ReplayList from '@/components/ReplayList/ReplayList'
import { ReplayClient } from '@/lib/api/clients/ReplayClient'
import { ReadonlyURLSearchParams } from 'next/navigation'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

function parseSearchParams({ searchParams }: Props) {
  const params: string[][] = []

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value) {
      params.push([key, value.toString()])
    }
  })

  return new ReadonlyURLSearchParams(new URLSearchParams(params))
}

export default async function Replays({ searchParams }: Props) {
  const client = new ReplayClient()
  const ids = await client.unsafeKeys(parseSearchParams({ searchParams }))
  const replays = await Promise.all(ids.map(async (id) => await client.unsafeGet(id)))

  replays.sort((a, b) => b.date.getTime() - a.date.getTime())

  return <ReplayList replays={replays} />
}
