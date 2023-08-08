'use client'

import { fetchVerificationGroup } from '@/lib/data/Stats'
import { fetchTestSuite } from '@/lib/data/Test'
import { interleave } from '@/lib/util/array'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Suspense } from 'react'

interface Segment {
  name: string
  path: string
}

function Separator() {
  return <span className="font-base text-[1.2rem] text-on-primary">{'>'}</span>
}

function Breadcrumb({ name, path }: Segment) {
  return (
    <Link
      href={`/${path}`}
      className="font-base cursor-pointer rounded px-2 py-1 text-on-primary last-of-type:font-semibold hover:bg-primary-hover hover:bg-opacity-60"
    >
      {name}
    </Link>
  )
}

async function TestSuiteBreadcrumb({ id }: { id: string }) {
  const suite = await fetchTestSuite(id)

  return <Breadcrumb name={suite.name} path={`training/suites/${id}`} />
}

async function VerificationGroupBreadcrumb({ id }: { id: string }) {
  const group = await fetchVerificationGroup(id)

  return <Breadcrumb name={group.name} path={`stats/compare/${id}`} />
}

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()

  const isTestSuite = (segments: Segment[]) =>
    segments[segments.length - 1]?.path.startsWith('training/suites/') &&
    !segments[segments.length - 1]?.path.endsWith('/create')

  const isVerificationGroup = (segments: Segment[]) =>
    segments[segments.length - 1]?.path.startsWith('stats/compare/') &&
    !segments[segments.length - 1]?.path.endsWith('/create')

  const data = () =>
    segments.map((seg, idx) => {
      const name = seg[0].toUpperCase() + seg.slice(1)
      const path = segments.slice(0, idx + 1).join('/')
      return { name, path }
    })

  const Body = () => {
    const seg = data()

    if (isTestSuite(seg) || isVerificationGroup(seg)) {
      const last = seg[seg.length - 1]
      const DropIn = isTestSuite(seg) ? TestSuiteBreadcrumb : VerificationGroupBreadcrumb

      return interleave(
        [
          ...seg.slice(0, -1).map(Breadcrumb),
          <Suspense fallback={<Breadcrumb name="Loading..." path={last.path} />}>
            <DropIn id={last.name.toLowerCase()} />
          </Suspense>,
        ],
        <Separator />
      )
    }

    return interleave(seg.map(Breadcrumb), <Separator />)
  }

  return (
    <span className="flex flex-row items-center gap-x-2 text-[1.5rem]">
      <Body />
    </span>
  )
}
