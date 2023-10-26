'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { VerificationGroup } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import ActionModal from '../../(modal)/ActionModal/ActionModal'
import WithModal from '../../(modal)/WithModal/WithModal'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'
import { formatEngine } from './format'

interface Props {
  /**
   * Verification group to display
   */
  group: VerificationGroup
}

/**
 * The {@link ListRow row} for a {@link VerificationGroup verification group}.
 * Provides controls for the user to view and delete the verification group.
 */
export default function VerificationGroupListRow(props: Props) {
  const router = useRouter()
  const client = new VerificationStatsClient(clientStrategy())

  //* Event Handler

  const handleDelete = async () => {
    await client.delete(props.group.id)
    router.refresh()
  }

  //* UI

  const DeletePrompt = (
    <ActionModal
      title="Delete Verification Group"
      description="Deleting the verification group will remove it from the registry. This action cannot be undone."
      icon="delete"
      action={{
        label: 'Delete',
        variant: 'danger',
        onClick: handleDelete,
      }}
    />
  )

  //* Render

  return (
    <ListRow variant="custom-5">
      <span>{props.group.name}</span>
      <span>{formatEngine(props.group.base)}</span>
      <ListActions>
        <WithModal modal={DeletePrompt}>
          <ListAction icon="delete" variant="action" style="danger" />
        </WithModal>
        <ListAction
          icon="visibility"
          variant="link"
          style="primary"
          href={`/stats/compare/${props.group.id}`}
        />
      </ListActions>
    </ListRow>
  )
}
