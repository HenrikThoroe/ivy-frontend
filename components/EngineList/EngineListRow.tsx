'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { EngineVersion } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'
import ActionModal from '../Modal/ActionModal'
import LoadingModal from '../Modal/LoadingModal'
import WithModal from '../Modal/WithModal'

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
  const client = new EngineClient(clientStrategy())

  const handleDelete = async () => {
    setShowLoading(true)

    await client.unsafeDelete(props.engine, props.id)
    const engine = await client.engine(props.engine)

    if (!engine.success || engine.result.variations.length === 0) {
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
