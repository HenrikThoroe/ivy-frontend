import ReplayList from '@/components/(list)/ReplayList/ReplayList'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { ReplayClient } from '@/lib/api/clients/ReplayClient'
import { Metadata } from 'next'
import { ReadonlyURLSearchParams } from 'next/navigation'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Ivy - Replays',
  description: 'List of all stored replays',
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
  const client = new ReplayClient(serverStrategy())
  const ids = await client.unsafeKeys(parseSearchParams({ searchParams }))
  const replays = await Promise.all(ids.map(async (id) => await client.unsafeGet(id)))

  replays.sort((a, b) => b.date.getTime() - a.date.getTime())

  return <ReplayList replays={replays} />
}
