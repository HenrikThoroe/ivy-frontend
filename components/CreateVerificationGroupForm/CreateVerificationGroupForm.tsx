'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { EngineConfig, EngineInstance, EngineTestConfig } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Form from '../Form/Base/Form'
import FormSeparator from '../Form/Base/FormSeparator'
import FormSubmitButton from '../Form/Base/FormSubmitButton'
import LabeledInput from '../Form/Base/LabeledInput'
import ListInput from '../Form/Base/ListInput'
import TextInput from '../Form/Base/TextInput'
import EngineConfigForm from '../Form/Shared/EngineConfigForm'
import LoadingModal from '../Modal/LoadingModal'
import AddNodeModal from './AddNodeModal'

interface Props {
  configs: EngineConfig[]
}

function formatEngine(engine: EngineInstance) {
  return `${engine.name} ${engine.version.major}.${engine.version.minor}.${engine.version.patch}`
}

export default function CreateVerificationGroupForm(props: Props) {
  const [nodes, setNodes] = useState<EngineTestConfig[]>([])
  const [showNodeModal, setShowNodeModal] = useState(false)
  const [name, setName] = useState<string>()
  const [threshold, setThreshold] = useState<number>()
  const [base, setBase] = useState<EngineTestConfig>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const client = new VerificationStatsClient(clientStrategy())

  const isValid = () => {
    if (!name || name.length === 0) {
      return false
    }

    if (!threshold || threshold <= 0 || isNaN(threshold)) {
      return false
    }

    if (!base) {
      return false
    }

    if (nodes.length === 0) {
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isValid()) {
      return
    }

    setLoading(true)
    await client.create({
      name: name!,
      threshold: threshold!,
      base: base!,
      nodes: nodes!,
    })
    setLoading(false)
    router.push('/stats/compare')
  }

  const handleAddNode = (node: EngineTestConfig) => {
    const json = JSON.stringify(node)

    if (nodes.find((n) => JSON.stringify(n) === json)) {
      return
    }

    setNodes([...nodes, node])
  }

  return (
    <>
      <LoadingModal open={loading} />
      <AddNodeModal
        open={showNodeModal}
        onClose={() => setShowNodeModal(false)}
        onAdd={handleAddNode}
        configs={props.configs}
      />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Name" required>
          <TextInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
        </LabeledInput>
        <LabeledInput label="Game Threshold" required>
          <TextInput
            placeholder="Threshold"
            type="number"
            onChange={(e) => setThreshold(e.target.valueAsNumber)}
          />
        </LabeledInput>
        <FormSeparator label="Base Engine" />
        <EngineConfigForm onChange={setBase} configs={props.configs} />
        <FormSeparator label="Compare Against" />
        <LabeledInput label="Nodes" required>
          <ListInput
            label="Name"
            items={nodes}
            onAdd={() => setShowNodeModal(true)}
            onRemove={(node) => setNodes(nodes.filter((n) => !Object.is(n, node)))}
            format={formatEngine}
          />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Create</FormSubmitButton>
      </Form>
    </>
  )
}
