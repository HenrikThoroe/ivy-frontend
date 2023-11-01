'use client'

import { interleave } from '@/lib/util/array'
import classNames from 'classnames'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Suspense } from 'react'
import { z } from 'zod'
import { IDResolver, resolveTestSuiteName, resolveVerificationGroupName } from './cache'

interface Segment {
  name: string
  path: string
}

interface IndirectSegment {
  id: string
  path: string
  resolver: IDResolver
}

/**
 * A breadcrumb trail is a secondary navigation scheme that reveals the user's location on the site.
 * The user can navigate to all higher levels of the site hierarchy by choosing one of the breadcrumbs.
 *
 * Breadcrumbs are typically generated automatically based on the page's URL.
 * When the URL contains a path segment, that is not human readable, but can be
 * resolved to a human readable name, the breadcrumb will be generated asynchronously.
 */
export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()
  const id = z.string().uuid()

  const buildBreadcrumbs = () => {
    const breadcrumbs = []

    for (const [index, segment] of segments.entries()) {
      const name = segment[0].toUpperCase() + segment.slice(1)
      const path = `/${segments.slice(0, index + 1).join('/')}`

      if (path.startsWith('/training/suites/') && id.safeParse(segment).success) {
        breadcrumbs.push(
          <Suspense fallback={<Breadcrumb name="Loading..." path={path} />}>
            <IndirectBreadcrumb id={segment} path={path} resolver={resolveTestSuiteName} />
          </Suspense>
        )
      } else if (path.startsWith('/stats/compare/') && id.safeParse(segment).success) {
        breadcrumbs.push(
          <Suspense fallback={<Breadcrumb name="Loading..." path={path} />}>
            <IndirectBreadcrumb id={segment} path={path} resolver={resolveVerificationGroupName} />
          </Suspense>
        )
      } else {
        breadcrumbs.push(<Breadcrumb name={name} path={path} />)
      }
    }

    return breadcrumbs
  }

  //* UI

  const Separator = () => {
    return <span className="font-base text-[1.2rem] text-on-primary">{'>'}</span>
  }

  const Breadcrumb = ({ name, path }: Segment) => {
    return (
      <Link
        href={`${path}`}
        className={classNames(
          'cursor-pointer rounded px-2 py-1 font-medium tracking-tight text-on-primary',
          'last-of-type:font-black hover:text-action-primary-active'
        )}
      >
        {name}
      </Link>
    )
  }

  const IndirectBreadcrumb = async ({ id, path, resolver }: IndirectSegment) => {
    const name = await resolver(id)
    return <Breadcrumb name={name} path={path} />
  }

  //* Render

  return (
    <span className="flex flex-row items-center gap-x-2 text-[1.5rem]">
      {interleave(buildBreadcrumbs(), <Separator />)}
    </span>
  )
}
