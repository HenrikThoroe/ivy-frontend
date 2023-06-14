'use client'

import { EngineConfig } from '@/lib/data/Engine'
import Form from '../Form/Form'
import FormSeparator from '../Form/FormSeparator'
import FormSubmitButton from '../Form/FormSubmitButton'
import LabeledInput from '../Form/LabeledInput'
import TextInput from '../Form/TextInput'
import EngineConfigForm from './EngineConfigForm'
import { FormEvent, useState } from 'react'
import { EngineTestConfig, createTestSuite } from '@/lib/data/Test'
import LoadingModal from '../Modal/LoadingModal'
import { useRouter } from 'next/navigation'

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

  const isValid = () => {
    return name && iterations && engine1 && engine2 ? true : false
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!isValid()) {
      return
    }

    setShowLoading(true)

    await createTestSuite({
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
