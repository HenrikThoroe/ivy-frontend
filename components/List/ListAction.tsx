import classNames from 'classnames'
import Icon, { IconName } from '../Icon/Icon'
import Link from 'next/link'

type Variant = 'action' | 'link' | 'download'

interface Props<T extends Variant> {
  variant: T
  style: 'primary' | 'danger'
  icon: IconName
}

interface ActionProps extends Props<'action'> {
  onClick?: () => void
}

interface LinkProps extends Props<'link'> {
  href: string
}

interface DownloadProps extends Props<'download'> {
  href: string
  filename: string
}

export default function ListAction<T extends Variant>(
  props: T extends 'action' ? ActionProps : T extends 'link' ? LinkProps : DownloadProps
) {
  const Element = ({ className }: { className: string }) => {
    switch (props.variant) {
      case 'action':
        return (
          <button onClick={props.onClick} className={className}>
            <Icon name={props.icon} />
          </button>
        )
      case 'link':
        return (
          <Link href={props.href} className={className}>
            <Icon name={props.icon} />
          </Link>
        )
      case 'download':
        return (
          <a href={props.href} download={props.filename} className={className}>
            <Icon name={props.icon} />
          </a>
        )
    }
  }

  return (
    <Element
      className={classNames(
        'flex items-center justify-center rounded-lg p-2 hover:text-on-secondary',
        {
          'text-action-destructive hover:bg-action-destructive-active': props.style === 'danger',
          'text-action-primary hover:bg-action-primary-active': props.style === 'primary',
        }
      )}
    />
  )
}
