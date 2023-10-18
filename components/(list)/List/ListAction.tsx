import classNames from 'classnames'
import Link from 'next/link'
import Icon, { IconName } from '../../Icon/Icon'

type Variant = 'action' | 'link' | 'download'

type Props<T extends Variant> = T extends 'action'
  ? ActionProps
  : T extends 'link'
  ? LinkProps
  : DownloadProps

interface BaseProps<T extends Variant> {
  variant: T
  style: 'primary' | 'danger'
  icon: IconName
}

interface ActionProps extends BaseProps<'action'> {
  onClick?: () => void
}

interface LinkProps extends BaseProps<'link'> {
  href: string
}

interface DownloadProps extends BaseProps<'download'> {
  href: string
  filename: string
}

/**
 * Button that should be used as an action in a list row.
 * Depending on the variant, the button will either act as a button, link, or download link.
 */
export default function ListAction<T extends Variant>(props: Props<T>) {
  const Action = ({ className }: { className: string }) => {
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
    <Action
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
