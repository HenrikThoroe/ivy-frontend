'use client'

import StateDot from '@/components/(media)/StateDot/StateDot'
import ActionModal from '@/components/(modal)/ActionModal/ActionModal'
import AlertModal from '@/components/(modal)/AlertModal/AlertModal'
import WithModal from '@/components/(modal)/WithModal/WithModal'
import { useEditorMode } from '@/lib/api/auth/access/hooks'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { GameClient } from '@/lib/api/clients/GameClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'

interface Props {
  /**
   * Whether the game is active.
   */
  active: boolean

  /**
   * The game ID.
   */
  id: string

  /**
   * The date the game was created.
   */
  date: string
}

/**
 * A row element for the games list.
 * Provides actions to delete and view the game.
 */
export default function GamesListRow(props: Props) {
  const { active, id, date } = props
  const router = useRouter()
  const [error, setError] = useState<string>()
  const [showError, setShowError] = useState(false)
  const edit = useEditorMode()

  //* Event Handler

  const handleDelete = async () => {
    const client = new GameClient(clientStrategy())
    const res = await client.catchNetworkError(client.delete(id))

    if (res.success) {
      router.refresh()
    } else {
      setError(res.error.message)
      setShowError(true)
    }
  }

  //* UI

  const DeletePrompt = (
    <ActionModal
      title="Delete Game"
      description="Deleting a game will remove its data from the database. This action cannot be undone."
      icon="delete"
      action={{
        label: 'Delete',
        onClick: handleDelete,
        variant: 'danger',
      }}
    />
  )

  //* Render

  return (
    <>
      <AlertModal
        icon="error"
        variant="error"
        open={showError}
        onClose={() => setShowError(false)}
        title="Could not delete game!"
        description={error ?? ''}
      />
      <ListRow variant="games-list">
        <span className="font-mono">{date}</span>
        <div className="p-2">
          <StateDot label="" color={active ? 'green' : 'red'} />
        </div>
        <ListActions>
          {edit && (
            <WithModal modal={DeletePrompt}>
              <ListAction variant="action" icon="delete" style="danger" />
            </WithModal>
          )}
          <ListAction variant="link" href={`/games/${id}`} icon="visibility" style="primary" />
        </ListActions>
      </ListRow>
    </>
  )
}
