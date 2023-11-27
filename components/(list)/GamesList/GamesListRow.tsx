'use client'

import ActionModal from '@/components/(modal)/ActionModal/ActionModal'
import WithModal from '@/components/(modal)/WithModal/WithModal'
import classNames from 'classnames'
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
}

/**
 * A row element for the games list.
 * Provides actions to delete and view the game.
 */
export default function GamesListRow(props: Props) {
  const { active, id } = props

  //* Event Handler

  const handleDelete = async () => {
    // TODO: Implement when API is ready
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
    <ListRow variant="games-list">
      <span className="font-mono">{id}</span>
      <span
        className={classNames('text-center text-2xl', {
          'text-green-500': active,
          'text-red-500': !active,
        })}
      >
        {active ? '✔' : '✘'}
      </span>
      <ListActions>
        <WithModal modal={DeletePrompt}>
          <ListAction variant="action" icon="delete" style="danger" />
        </WithModal>
        <ListAction variant="link" href={`/games/${id}`} icon="visibility" style="primary" />
      </ListActions>
    </ListRow>
  )
}
