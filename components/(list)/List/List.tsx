import classNames from 'classnames'
import { LayoutVariant, translateLayoutVariant } from './translateLayoutVariant'

interface Props {
  variant: LayoutVariant
  head: React.ReactNode[]
  children: React.ReactNode
}

/**
 * A list is a styled and structured table-like element.
 * Data is displayed in rows, with a header row at the top.
 *
 * The `variant` prop determines the layout of the list.
 * `head` and `children` should have the same length.
 */
export default function List(props: Props) {
  const head = props.head.map((head) => <span>{head}</span>)

  return (
    <section className="flex flex-col text-on-primary">
      <div
        className={classNames(
          'grid w-full justify-start gap-x-6 px-2 py-4 font-semibold',
          translateLayoutVariant(props.variant)
        )}
      >
        {head}
      </div>
      {props.children}
    </section>
  )
}
