import { ReactNode } from 'react'

/**
 * A view for displaying different categories of content.
 *
 * Use the `Section` to separate content into different categories.
 * Each section can have an optional action button.
 */
export default function SectionedView({ children }: { children: ReactNode[] | ReactNode }) {
  return <article className="flex flex-col gap-20 p-12">{children}</article>
}
