import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  /**
   * Prominent label of the card.
   */
  label: string

  /**
   * URL to navigate to when the card is clicked.
   */
  href: string

  /**
   * Description of the destination.
   * Should not be required to understand the destination,
   * but rather provide additional information.
   */
  description: string
}

/**
 * An interactive card that refers to a destination and
 * displays a description of the destination.
 */
export default function NavCard(props: Props) {
  return (
    <Link href={props.href}>
      <section
        className={classNames(
          'flex w-max max-w-full cursor-pointer flex-col items-center justify-center gap-8 rounded-md p-12 shadow-card',
          'hover:border hover:border-primary-accent-border hover:shadow-none'
        )}
      >
        <span className="bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text text-3xl font-extrabold text-transparent">
          {props.label}
        </span>
        <div>
          <p className="max-w-sm font-medium text-on-primary">{props.description}</p>
        </div>
      </section>
    </Link>
  )
}
