'use client'

import { TestSessionClient } from '@/lib/api/clients/TestSessionClient'
import { TestSuite } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Form from '../Form/Base/Form'
import FormSubmitButton from '../Form/Base/FormSubmitButton'
import LabeledInput from '../Form/Base/LabeledInput'
import SelectInput from '../Form/Base/SelectInput'
import TextInput from '../Form/Base/TextInput'
import AlertModal from '../Modal/AlertModal'

interface Props {
  suites: TestSuite[]
}

export default function CreateSessionForm(props: Props) {
  const [showError, setShowError] = useState(false)
  const [session, setSession] = useState(props.suites[0].id)
  const [drivers, setDrivers] = useState(10)
  const router = useRouter()
  const client = new TestSessionClient()

  const isValid = () => {
    return drivers > 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValid()) {
      return
    }

    try {
      await client.unsafeCreate(session, drivers)
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
