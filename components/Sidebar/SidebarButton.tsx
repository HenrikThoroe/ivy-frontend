import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  icon: React.ReactNode
  text: string
  active?: boolean
  href?: string
}

export default function SidebarButton(props: Props) {
  const { icon, text, href, active } = props

  return (
    <Link
      className={classNames(
        'flex w-[12rem] appearance-none gap-x-4 rounded-full px-6 py-3 font-semibold transition duration-300',
        {
          'bg-secondary text-on-secondary': active,
          'bg-primary text-on-primary hover:bg-primary-hover': !active,
        }
      )}
      href={href ?? '/'}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}
