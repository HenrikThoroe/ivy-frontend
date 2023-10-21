import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  /**
   * The icon should be descriptive of the button's purpose.
   */
  icon: React.ReactNode

  /**
   * Short text describing the navigation destination.
   * Should not be longer than 10 characters.
   */
  text: string

  /**
   * Whether the button is active or not.
   */
  active?: boolean

  /**
   * The URL of the navigation destination.
   */
  href: string
}

/**
 * A button that is used to navigate to a different page.
 */
export default function SidebarButton(props: Props) {
  const { icon, text, href, active } = props

  //* UI

  const Indicator = () => (
    <div
      className={classNames(
        'absolute right-4 top-1/2 h-2 w-2 translate-y-[-50%] rounded-full bg-primary',
        {
          hidden: !active,
        }
      )}
    />
  )

  //* Render

  return (
    <Link
      className={classNames(
        'relative flex w-[12rem] appearance-none gap-x-4 rounded-lg px-6 py-3 font-semibold transition duration-300',
        {
          'bg-secondary text-on-secondary': active,
          'bg-primary text-on-primary shadow-md hover:bg-primary-hover hover:shadow-inner': !active,
        }
      )}
      href={href}
    >
      {icon}
      <span>{text}</span>
      <Indicator />
    </Link>
  )
}
