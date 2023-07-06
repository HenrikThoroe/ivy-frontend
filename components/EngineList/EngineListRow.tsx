'use client'

import { deleteEngineConfig } from '@/lib/data/Engine'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoadingModal from '../Modal/LoadingModal'
import ListRow from '../List/ListRow'
import ListActions from '../List/ListActions'
import WithModal from '../Modal/WithModal'
import ListAction from '../List/ListAction'
import ActionModal from '../Modal/ActionModal'
import { EngineVersion } from '@ivy-chess/model'

interface Props {
  id: string
  version: EngineVersion
  arch: string
  os: string
  capabilities: string[]
  engine: string
}

export default function EngineListRow(props: Props) {
  const router = useRouter()
  const [showLoading, setShowLoading] = useState(false)

  const handleDelete = async () => {
    setShowLoading(true)

    const didRemoveEngine = await deleteEngineConfig(props.engine, props.id)

    if (didRemoveEngine) {
      router.push('/engines')
    } else {
      router.refresh()
    }
  }

  return (
    <>
      <LoadingModal open={showLoading} />
      <ListRow variant="custom-1">
        <span>{`v${props.version.major}.${props.version.minor}.${props.version.patch}`}</span>
        <span>{props.os}</span>
        <span>{props.arch}</span>
        <span>{props.capabilities.join(', ')}</span>
        <ListActions>
          <WithModal
            modal={
              <ActionModal
                title="Delete Engine"
                description="Deleting an engine will remove it from the registry. This action cannot be undone."
                icon="delete"
                action={{
                  label: 'Delete',
                  onClick: handleDelete,
                  variant: 'danger',
                }}
              />
            }
          >
            <ListAction variant="action" style="danger" icon="delete" />
          </WithModal>
          <ListAction
            variant="download"
            style="primary"
            icon="download"
            href={`http://localhost:4500/engines/bin/${props.engine}/${props.id}`}
            filename={props.engine}
          />
        </ListActions>
      </ListRow>
    </>
  )
}
