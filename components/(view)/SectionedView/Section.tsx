import { ReactNode as Node } from 'react'

interface Props {
  /**
   * The title of the section.
   */
  title: string

  /**
   * The content of the section.
   */
  children: Node

  /**
   * An optional action button to display on the right side of the section.
   *
   * Can be any node, but typically a non-text button.
   */
  action?: Node
}

/**
 * A section of a `SectionedView`.
 *
 * Can optionally have an action button but must have a title and content.
 */
export default function Section(props: Props) {
  const { title, children, action } = props

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-3xl font-semibold text-on-primary-light">{title}</h2>
        {action}
      </div>
      <div className="pl-4">{children}</div>
    </section>
  )
}
