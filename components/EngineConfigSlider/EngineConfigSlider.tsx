'use client'

import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { EngineConfig, EngineTestConfig, VerificationGroup } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddNodeModal from '../CreateVerificationGroupForm/AddNodeModal'
import Icon from '../Icon/Icon'
import LoadingModal from '../Modal/LoadingModal'
import EngineConfigCard from './EngineConfigCard'

interface Props {
  verificationGroup: VerificationGroup
  configs: EngineConfig[]
}

export default function EngineConfigSlider(props: Props) {
  const [showAdd, setShowAdd] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()
  const client = new VerificationStatsClient()

  const handleDelete = async (config: EngineTestConfig) => {
    setShowLoading(true)

    try {
      await client.unsafeRemove(props.verificationGroup.id, config)
    } catch (e) {
      setShowLoading(false)
      return
    }

    setShowLoading(false)
    router.refresh()
  }

  const handleAdd = async (config: EngineTestConfig) => {
    setShowLoading(true)

    try {
      await client.unsafeAdd(props.verificationGroup.id, config)
    } catch (e) {
      setShowLoading(false)
      return
    }

    setShowLoading(false)
    router.refresh()
  }

  return (
    <>
      <LoadingModal open={showLoading} />
      <AddNodeModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        configs={props.configs}
        onAdd={handleAdd}
      />
      <div className="flex w-full flex-row flex-wrap items-start justify-center gap-8 overflow-x-scroll">
        <EngineConfigCard engine={props.verificationGroup.base} alias="Base" />
        {props.verificationGroup.nodes.map((config, i) => (
          <EngineConfigCard
            engine={config}
            alias={i + 1}
            onDelete={
              props.verificationGroup.nodes.length > 1 ? () => handleDelete(config) : undefined
            }
          />
        ))}
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center justify-center self-center rounded-full bg-action-primary p-2 text-on-secondary hover:bg-action-primary-active"
        >
          <Icon name="add" />
        </button>
      </div>
    </>
  )
}
