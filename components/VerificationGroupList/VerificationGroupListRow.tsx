'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { EngineInstance, VerificationGroup } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'
import ActionModal from '../Modal/ActionModal'
import WithModal from '../Modal/WithModal'

interface Props {
  group: VerificationGroup
}

function formatEngine(engine: EngineInstance) {
  return `${engine.name} ${engine.version.major}.${engine.version.minor}.${engine.version.patch}`
}

export default function VerificationGroupListRow(props: Props) {
  const router = useRouter()
  const client = new VerificationStatsClient(clientStrategy())

  const handleDelete = async () => {
    try {
      await client.unsafeDelete(props.group.id)
    } catch (e) {
      return
    }

    router.refresh()
  }

  return (
    <ListRow variant="custom-5">
      <span>{props.group.name}</span>
      <span>{formatEngine(props.group.base)}</span>
      <ListActions>
        <WithModal
          modal={
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
          }
        >
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
