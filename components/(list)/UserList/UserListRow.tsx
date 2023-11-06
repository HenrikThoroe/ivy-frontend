'use client'

import ActionModal from '@/components/(modal)/ActionModal/ActionModal'
import WithModal from '@/components/(modal)/WithModal/WithModal'
import { UserData } from '@/lib/api/clients/AuthClient'
import { useState } from 'react'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'
import EditPrompt from './EditPrompt'

interface Props {
  /**
   * The user to display
   */
  user: UserData

  /**
   * Called when the user should be deleted
   */
  onDelete: () => void

  /**
   * Called when the user was updated
   */
  onUpdate: () => void
}

/**
 * Row for a user list.
 *
 * Allows to edit and delete the user.
 * Should only be displayed, when the logged in user has permissions
 * to edit and delete user data.
 */
export default function UserListRow({ user, onDelete, onUpdate }: Props) {
  const [showEditModal, setShowEditModal] = useState(false)

  //* UI

  const DeletePrompt = (
    <ActionModal
      title="Remove User?"
      description="Removing a user will revoke their access to the application and delete all their data. This action cannot be undone."
      icon="delete"
      action={{
        label: 'Delete',
        variant: 'danger',
        onClick: onDelete,
      }}
    />
  )

  //* Render

  return (
    <>
      <EditPrompt
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onUpdate={onUpdate}
      />
      <ListRow variant="user-list">
        <span className="font-mono">{user.email}</span>
        <span>{user.name}</span>
        <span>{user.role}</span>
        <ListActions>
          <WithModal modal={DeletePrompt}>
            <ListAction variant="action" style="danger" icon="delete" />
          </WithModal>
          <ListAction
            icon="edit"
            variant="action"
            style="primary"
            onClick={() => setShowEditModal(true)}
          />
        </ListActions>
      </ListRow>
    </>
  )
}
