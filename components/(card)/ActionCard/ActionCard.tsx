import Icon, { IconName } from '@/components/(media)/Icon/Icon'
import Link from 'next/link'

interface Props {
  /**
   * The URL to navigate to when the card is clicked.
   */
  href: string

  /**
   * The title of the card.
   * Should be a short, descriptive text
   * like "Upload" or "Create".
   */
  title: string

  /**
   * The name of the icon to use in the card.
   */
  icon: IconName
}

/**
 * `ActionCard` is a card component used to prominently display
 * a single action. The card should be used to nudge the user, when
 * the action is the expected next step.
 */
export default function ActionCard(props: Props) {
  return (
    <section className="flex w-full flex-row items-center justify-center rounded-lg bg-slate-700 p-10">
      <Link href={props.href}>
        <button className="flex flex-row gap-2 rounded-full bg-primary px-5 py-2 font-medium tracking-wide text-on-primary hover:text-action-primary-active">
          <Icon name={props.icon} />
          <span>{props.title}</span>
        </button>
      </Link>
    </section>
  )
}
