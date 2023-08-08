'use client'

import { EngineInstance, VerificationGroup } from '@ivy-chess/model'
import ListRow from '../List/ListRow'
import ListActions from '../List/ListActions'
import ListAction from '../List/ListAction'
import WithModal from '../Modal/WithModal'
import ActionModal from '../Modal/ActionModal'
import { deleteVerificationGroup } from '@/lib/data/Stats'
import { useRouter } from 'next/navigation'

interface Props {
  group: VerificationGroup
}

function formatEngine(engine: EngineInstance) {
  return `${engine.name} ${engine.version.major}.${engine.version.minor}.${engine.version.patch}`
}

export default function VerificationGroupListRow(props: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteVerificationGroup(props.group.id)
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
