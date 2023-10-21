'use client'

import AlertModal from '@/components/Modal/AlertModal'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { customHandler } from '@/lib/util/handler'
import { shared } from '@ivy-chess/api-schema'
import {
  EngineConfig,
  EngineTestConfig,
  encodeVersion,
  hashEngineTestConfig,
} from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import Form from '../(atoms)/Form/Form'
import FormSeparator from '../(atoms)/FormSeparator/FormSeparator'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '../(atoms)/LabeledInput/LabeledInput'
import ListInput from '../(atoms)/ListInput/ListInput'
import TextInput from '../(atoms)/TextInput/TextInput'
import EngineConfigForm from '../(compositions)/EngineConfigForm/EngineConfigForm'
import LoadingModal from '../../Modal/LoadingModal'
import AddNodeModal from './AddNodeModal'

interface Props {
  /**
   * A list of engine configurations to compare against.
   */
  configs: EngineConfig[]
}

interface Node {
  id: string
  config: EngineTestConfig
}

/**
 * A form for creating a new verification group.
 * The component uses a client side API client instance,
 * to create the group on the server.
 */
export default function CreateVerificationGroupForm(props: Props) {
  const router = useRouter()
  const client = new VerificationStatsClient(clientStrategy())

  const [nodes, setNodes] = useState<Node[]>([])
  const [showAddPrompt, setShowAddPrompt] = useState(false)
  const [base, setBase] = useState<EngineTestConfig>()
  const [loading, setLoading] = useState(false)
  const [name, onNameChange, nameErr] = useChangeListener(shared.engine.engineNameSchema)
  const [num, onNumChange, numErr] = useChangeListener(z.coerce.number().positive())
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const isValid = () => {
    if (!name || !num || nameErr || numErr) {
      return false
    }

    if (nodes.length === 0 || !base) {
      return false
    }

    return true
  }

  //* Event Handler

  const handleRemove = (node: Node) => {
    setNodes(nodes.filter((n) => n.id !== node.id))
  }

  const handleAdd = (node: EngineTestConfig) => {
    const id = hashEngineTestConfig(node)

    if (nodes.find((n) => n.id === id)) {
      return
    }

    setNodes([...nodes, { id, config: node }])
  }

  const handleSubmit = customHandler(async () => {
    if (!name || !num || !base) {
      return
    }

    setLoading(true)

    const res = await client.catchNetworkError(
      client.create({
        name: name,
        threshold: num,
        base: base,
        nodes: nodes.map((n) => n.config),
      })
    )

    setLoading(false)

    if (res.success) {
      router.push('/stats/compare')
    } else {
      setError(res.error.message)
      setShowError(true)
    }
  })

  //* Render

  return (
    <>
      <AlertModal
        open={showError}
        onClose={() => setShowError(false)}
        title="Error"
        description={error ?? ''}
        icon="error"
        variant="error"
      />
      <LoadingModal open={loading} />
      <AddNodeModal
        open={showAddPrompt}
        onClose={() => setShowAddPrompt(false)}
        onAdd={handleAdd}
        configs={props.configs}
      />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Name" error={nameErr} required>
          <TextInput placeholder="Name" type="text" onChange={onNameChange} required clear />
        </LabeledInput>
        <LabeledInput label="Game Threshold" error={numErr} required>
          <TextInput placeholder="Threshold" type="number" onChange={onNumChange} required clear />
        </LabeledInput>
        <FormSeparator label="Base Engine" />
        <EngineConfigForm onChange={setBase} configs={props.configs} />
        <FormSeparator label="Compare Against" />
        <LabeledInput label="Nodes" required>
          <ListInput
            label="Name"
            items={nodes}
            onAdd={() => setShowAddPrompt(true)}
            onRemove={handleRemove}
            format={(node) => `${node.config.name} ${encodeVersion(node.config.version, false)}`}
          />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Create</FormSubmitButton>
      </Form>
    </>
  )
}
