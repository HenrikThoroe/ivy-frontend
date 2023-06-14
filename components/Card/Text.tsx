import Link from 'next/link'
import Icon, { IconName } from '../Icon/Icon'

interface Props {
  title: string
  description: string
  icon: IconName
  href: string
}

export default function TextCard(props: Props) {
  return (
    <Link href={props.href}>
      <div className="border-on-primary-accent group flex min-h-[25rem] max-w-[20rem] flex-col gap-2 rounded-lg border-2 bg-primary px-4 py-8 hover:cursor-pointer hover:border-action-primary-active">
        <h2 className="flex flex-row items-center gap-2 text-lg font-bold text-on-primary group-hover:text-action-primary-active">
          <Icon name={props.icon} />
          {props.title}
        </h2>
        <p className="text-on-primary-light">{props.description}</p>
      </div>
    </Link>
  )
}
