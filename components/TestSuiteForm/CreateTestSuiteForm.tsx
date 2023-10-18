'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { EngineConfig, EngineTestConfig } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import Form from '../Form/Base/Form'
import FormSeparator from '../Form/Base/FormSeparator'
import FormSubmitButton from '../Form/Base/FormSubmitButton'
import LabeledInput from '../Form/Base/LabeledInput'
import TextInput from '../Form/Base/TextInput'
import EngineConfigForm from '../Form/Shared/EngineConfigForm'
import LoadingModal from '../Modal/LoadingModal'

interface Props {
  configs: EngineConfig[]
}

export default function CreateTestSuiteForm(props: Props) {
  const defEngineConfig: EngineTestConfig = {
    name: props.configs[0].name,
    version: props.configs[0].variations[0].version,
    timeControl: {
      type: 'movetime',
      value: 100,
    },
    options: {
      threads: 1,
      hash: 128,
    },
  }

  const [name, setName] = useState<string>()
  const [iterations, setIterations] = useState<number>()
  const [engine1, setEngine1] = useState<EngineTestConfig>(defEngineConfig)
  const [engine2, setEngine2] = useState<EngineTestConfig>(defEngineConfig)
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()
  const client = new TestSuiteClient(clientStrategy())

  const isValid = () => {
    return name && iterations && engine1 && engine2 ? true : false
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!isValid()) {
      return
    }

    setShowLoading(true)

    await client.unsafeCreate({
      name: name!,
      iterations: iterations!,
      engines: [engine1!, engine2!],
    })

    router.push('/training/suites')
  }

  return (
    <>
      <LoadingModal open={showLoading} />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Name" required>
          <TextInput
            type="text"
            placeholder="Test Suite Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </LabeledInput>
        <LabeledInput label="Iterations" required>
          <TextInput
            type="number"
            placeholder="Number of games to play"
            onChange={(e) => setIterations(e.target.valueAsNumber)}
            required
          />
        </LabeledInput>
        <FormSeparator label="Engine 1" />
        <EngineConfigForm configs={props.configs} onChange={setEngine1} default={defEngineConfig} />
        <FormSeparator label="Engine 2" />
        <EngineConfigForm configs={props.configs} onChange={setEngine2} default={defEngineConfig} />
        <FormSubmitButton disabled={!isValid()}>Create</FormSubmitButton>
      </Form>
    </>
  )
}
