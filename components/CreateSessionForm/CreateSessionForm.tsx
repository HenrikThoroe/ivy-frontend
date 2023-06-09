'use client'

import { TestSuite, createTestSession } from '@/lib/data/Test'
import Form from '../Form/Form'
import FormSubmitButton from '../Form/FormSubmitButton'
import LabeledInput from '../Form/LabeledInput'
import SelectInput from '../Form/SelectInput'
import TextInput from '../Form/TextInput'
import { useState } from 'react'
import AlertModal from '../Modal/AlertModal'
import { useRouter } from 'next/navigation'

interface Props {
  suites: TestSuite[]
}

export default function CreateSessionForm(props: Props) {
  const [showError, setShowError] = useState(false)
  const [session, setSession] = useState(props.suites[0].id)
  const [drivers, setDrivers] = useState(10)
  const router = useRouter()

  const isValid = () => {
    return drivers > 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValid()) {
      return
    }

    try {
      await createTestSession(session, drivers)
      router.push('/training/sessions')
    } catch (e) {
      setShowError(true)
    }
  }

  return (
    <>
      <AlertModal
        open={showError}
        onClose={() => setShowError(false)}
        icon="error"
        variant="error"
        title="Something went wrong!"
        description="This test session could not be created. There are probably not enough devices connected or all devices are currently bussy."
      />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Test Suite" required>
          <SelectInput
            defaultValue={session}
            onSelect={(value) => setSession(value)}
            options={props.suites.map((suite) => ({
              value: suite.id,
              label: suite.name,
            }))}
          />
        </LabeledInput>
        <LabeledInput label="Driver Count" required>
          <TextInput
            onChange={(event) => setDrivers(event.target.valueAsNumber)}
            defaultValue={drivers}
            type="number"
            placeholder="Minimal number of devices"
            required
          />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Create</FormSubmitButton>
      </Form>
    </>
  )
}
