import Link from 'next/link'
import Icon, { IconName } from '../../Icon/Icon'

interface Props {
  /**
   * Short, descriptive title.
   */
  title: string

  /**
   * Longer message to explain how to add content.
   */
  message: string

  /**
   * Optional action to instantly add content.
   */
  action?: {
    /**
     * Link to the action.
     */
    href: string

    /**
     * Label for the action.
     */
    label: string

    /**
     * Icon for the action.
     */
    icon: IconName
  }
}

/**
 * View that can be used when currently no user content is available.
 * It prompts the user to take action and add new content.
 */
export default function NoContentView(props: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 py-28">
      <h1 className="text-2xl font-extrabold text-on-primary">{props.title}</h1>
      <p className="max-w-xl text-center text-base font-medium text-on-primary-light">
        {props.message}
      </p>
      {props.action && (
        <Link
          href={props.action.href}
          className="mt-10 flex w-fit flex-row gap-3 rounded-full bg-action-primary px-6 py-3 font-semibold text-on-secondary hover:bg-action-primary-active"
        >
          <Icon name={props.action.icon} />
          {props.action.label}
        </Link>
      )}
    </div>
  )
}
