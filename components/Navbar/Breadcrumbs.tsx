'use client'

import interleave from '@/lib/util/interleave'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

function Separator() {
  return <span className="font-base text-[1.2rem] text-on-primary">{'>'}</span>
}

function Breadcrumb({ name, path }: { name: string; path: string }) {
  return (
    <Link
      href={`/${path}`}
      className="font-base cursor-pointer rounded px-2 py-1 text-on-primary last-of-type:font-semibold hover:bg-primary-hover"
    >
      {name}
    </Link>
  )
}

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()

  const data = () =>
    segments.map((seg, idx) => {
      const name = seg[0].toUpperCase() + seg.slice(1)
      const path = segments.slice(0, idx + 1).join('/')
      return { name, path }
    })

  return (
    <span className="flex flex-row items-center gap-x-2 text-[1.5rem]">
      {interleave(data().map(Breadcrumb), <Separator />)}
    </span>
  )
}
