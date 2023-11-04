import Icon from '@/components/(media)/Icon/Icon'

interface Props {
  /**
   * The username of the user
   */
  name: string

  /**
   * The email of the user
   */
  email: string

  /**
   * The role of the user
   */
  role: string
}

/**
 * A styled card that displays basic user information.
 */
export default function UserInfoCard(props: Props) {
  const { name, email, role } = props

  return (
    <section className="flex flex-col gap-3 rounded-md p-8 shadow-card">
      <h1 className="text-3xl font-black text-on-primary">{name}</h1>
      <div className="flex flex-col gap-1 pl-2 text-lg font-medium text-on-primary-light">
        <span>
          <Icon name="email-read" /> {email}
        </span>
        <span>
          <Icon name="person" /> {role}
        </span>
      </div>
    </section>
  )
}
