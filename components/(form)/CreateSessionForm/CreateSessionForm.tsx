'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { TestSessionClient } from '@/lib/api/clients/TestSessionClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { customHandler } from '@/lib/util/handler'
import { TestSuite } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import Form from '../(atoms)/Form/Form'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '../(atoms)/LabeledInput/LabeledInput'
import SelectInput from '../(atoms)/SelectInput/SelectInput'
import TextInput from '../(atoms)/TextInput/TextInput'
import AlertModal from '../../(modal)/AlertModal/AlertModal'

interface Props {
  /**
   * List of test suites to choose from.
   */
  suites: TestSuite[]
}

/**
 * Form for creating a new test session.
 *
 * Requires the user to choose a test suite and the desired number
 * of drivers to use.
 *
 * When created the backend API will be called.
 */
export default function CreateSessionForm(props: Props) {
  const defaultSession = props.suites[0].id
  const client = new TestSessionClient(clientStrategy())
  const router = useRouter()

  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [session, setSession] = useState(defaultSession)
  const [drivers, onDriversChange, driversErr] = useChangeListener(z.coerce.number().positive())

  const isValid = () => drivers !== undefined

  //* Event Handler

  const handleSubmit = customHandler(async (e) => {
    const res = await client.create(session, drivers ?? 0)

    if (res.success) {
      router.push('/training')
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
        icon="error"
        variant="error"
        title="Something went wrong!"
        description={`Could not create session with error: ${error}`}
      />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Test Suite" required>
          <SelectInput
            defaultValue={session}
            onSelect={setSession}
            options={props.suites.map((suite) => ({
              value: suite.id,
              label: suite.name,
            }))}
          />
        </LabeledInput>
        <LabeledInput label="Driver Count" error={driversErr} required>
          <TextInput
            onChange={onDriversChange}
            type="number"
            placeholder="Minimal number of drivers to use."
            required
            clear
          />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Create</FormSubmitButton>
      </Form>
    </>
  )
}
