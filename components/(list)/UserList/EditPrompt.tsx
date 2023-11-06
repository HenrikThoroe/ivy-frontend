'use client'

import Form from '@/components/(form)/(atoms)/Form/Form'
import FormSubmitButton from '@/components/(form)/(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '@/components/(form)/(atoms)/LabeledInput/LabeledInput'
import SelectInput, { Option } from '@/components/(form)/(atoms)/SelectInput/SelectInput'
import TextInput from '@/components/(form)/(atoms)/TextInput/TextInput'
import Modal from '@/components/(modal)/Modal/Modal'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { AuthClient, UserData } from '@/lib/api/clients/AuthClient'
import { customHandler } from '@/lib/util/handler'
import { useEffect, useState } from 'react'

interface Props {
  /**
   * The user to edit
   */
  user: UserData

  /**
   * Whether the modal is open
   */
  open: boolean

  /**
   * Event handler for closing the modal
   */
  onClose: () => void

  /**
   * Called when the user was updated
   */
  onUpdate: () => void
}

const roleOptions: Option<UserData['role']>[] = [
  {
    value: 'manager' as const,
    label: 'Manager',
  },
  {
    value: 'contributor' as const,
    label: 'Contributor',
  },
  {
    value: 'visitor' as const,
    label: 'Visitor',
  },
]

/**
 * A modal for editing a user's details.
 *
 * Automatically calls the backend API to update the user.
 * When the update was successfull, the `onUpdate` event handler is called.
 */
export default function EditPrompt({ user, open, onClose, onUpdate }: Props) {
  const [role, setRole] = useState<UserData['role']>(user.role)
  const client = new AuthClient(clientStrategy())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const disabled = () => role === user.role || role === undefined || user.role === 'manager'

  //* Event Handler

  const handleSave = customHandler(async () => {
    setError(undefined)
    setLoading(true)

    const res = await client.update(user.id, role)

    setLoading(false)

    if (res.success) {
      onClose()
      onUpdate()
    } else {
      setError(res.error.message)
    }
  })

  useEffect(() => {
    setRole(user.role)
    setError(undefined)
    setLoading(false)
  }, [user, open])

  //* Render

  return (
    <Modal open={open} onClose={onClose}>
      <aside className="flex flex-col gap-2 px-4 py-8">
        <h2 className="text-2xl font-bold">User Details</h2>
        <Form onSubmit={handleSave}>
          <LabeledInput label="Id">
            <TextInput type="text" defaultValue={user.id} readonly />
          </LabeledInput>
          <LabeledInput label="Email">
            <TextInput type="email" defaultValue={user.email} readonly />
          </LabeledInput>
          <LabeledInput label="Name">
            <TextInput type="text" defaultValue={user.name} readonly />
          </LabeledInput>
          <LabeledInput label="Role">
            <SelectInput options={roleOptions} defaultValue={user.role} onSelect={setRole} />
          </LabeledInput>
          <FormSubmitButton loading={loading} disabled={disabled()} error={error}>
            Save Changes
          </FormSubmitButton>
        </Form>
      </aside>
    </Modal>
  )
}
