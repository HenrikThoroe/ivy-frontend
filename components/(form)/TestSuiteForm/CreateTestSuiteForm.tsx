'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { customHandler } from '@/lib/util/handler'
import { EngineConfig, EngineTestConfig } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import Form from '../(atoms)/Form/Form'
import FormSeparator from '../(atoms)/FormSeparator/FormSeparator'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '../(atoms)/LabeledInput/LabeledInput'
import TextInput from '../(atoms)/TextInput/TextInput'
import EngineConfigForm from '../(compositions)/EngineConfigForm/EngineConfigForm'
import AlertModal from '../../Modal/AlertModal'
import LoadingModal from '../../Modal/LoadingModal'

interface Props {
  /**
   * A list of engine configuration, to choose from for the test suite.
   */
  configs: EngineConfig[]
}

/**
 * A form for creating a new test suite.
 * The component uses a client side API client instance,
 * to create the suite on the server.
 *
 * A test suite requires the user to provide a name,
 * the number of iterations to run, and two engine configurations.
 */
export default function CreateTestSuiteForm(props: Props) {
  const router = useRouter()
  const client = new TestSuiteClient(clientStrategy())

  const [showLoading, setShowLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState(false)
  const [name, onNameChange, nameErr] = useChangeListener(z.string().min(3))
  const [iter, onIterChange, iterErr] = useChangeListener(z.coerce.number().positive())
  const [engine1, setEngine1] = useState<EngineTestConfig>()
  const [engine2, setEngine2] = useState<EngineTestConfig>()

  const isValid = () => (name && iter && engine1 && engine2 && !nameErr && !iterErr ? true : false)

  //* Event Handler

  const handleSubmit = customHandler(async () => {
    if (!name || !iter || !engine1 || !engine2) {
      return
    }

    setShowLoading(true)

    const res = await client.catchNetworkError(
      client.create({
        name,
        iterations: iter,
        engines: [engine1, engine2],
      })
    )

    setShowLoading(false)

    if (res.success) {
      router.push('/training/suites')
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
        description={`Could not create test suite: ${error}`}
        icon="error"
        variant="error"
      />
      <LoadingModal open={showLoading} />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Name" error={nameErr} required>
          <TextInput
            type="text"
            placeholder="Test Suite Name"
            onChange={onNameChange}
            required
            clear
          />
        </LabeledInput>
        <LabeledInput label="Iterations" error={iterErr} required>
          <TextInput
            type="number"
            placeholder="Number of games to play"
            onChange={onIterChange}
            required
            clear
          />
        </LabeledInput>
        <FormSeparator label="Engine 1" />
        <EngineConfigForm configs={props.configs} onChange={setEngine1} />
        <FormSeparator label="Engine 2" />
        <EngineConfigForm configs={props.configs} onChange={setEngine2} />
        <FormSubmitButton disabled={!isValid()}>Create</FormSubmitButton>
      </Form>
    </>
  )
}
