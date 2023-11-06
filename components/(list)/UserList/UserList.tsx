'use client'

import { UserData } from '@/lib/api/clients/AuthClient'
import List from '../List/List'
import UserListRow from './UserListRow'

interface Props {
  /**
   * The users to display
   */
  users: UserData[]

  /**
   * Called when a user should be deleted
   */
  onDelete: (id: string) => void

  /**
   * Called when a user was updated
   */
  onUpdate: () => void
}

/**
 * List of users.
 * Dislpays for each user their email, username and role.
 * Allows to edit and delete users.
 *
 * Should only be displayed, when the logged in user has permissions
 * to edit and delete user data.
 */
export default function UserList({ users, onDelete, onUpdate }: Props) {
  return (
    <List variant="user-list" head={['E-Mail', 'Username', 'Role']}>
      {users.map((user) => (
        <UserListRow
          key={`user-list-row-${user.id}`}
          user={user}
          onDelete={() => onDelete(user.id)}
          onUpdate={onUpdate}
        />
      ))}
    </List>
  )
}
