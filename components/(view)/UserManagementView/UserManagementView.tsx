'use client'

import LabeledInput from '@/components/(form)/(atoms)/LabeledInput/LabeledInput'
import SelectInput, { Option } from '@/components/(form)/(atoms)/SelectInput/SelectInput'
import TextInput from '@/components/(form)/(atoms)/TextInput/TextInput'
import UserList from '@/components/(list)/UserList/UserList'
import AlertModal from '@/components/(modal)/AlertModal/AlertModal'
import LoadingModal from '@/components/(modal)/LoadingModal/LoadingModal'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { AuthClient, UserData } from '@/lib/api/clients/AuthClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useState } from 'react'
import { z } from 'zod'
import NoContentView from '../NoContentView/NoContentView'
import { parseFilter } from './parse'

const roleOptions: Option<UserData['role'] | 'all'>[] = [
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
  {
    value: 'all' as const,
    label: 'Everyone',
  },
]

const searchSchema = z
  .string()
  .min(3, { message: 'Search strings must be at least 3 character long' })
  .max(32, { message: 'Search strings can be at most 32 characters long' })

/**
 * A view that allows a logged in manager to see, remove and update users.
 *
 * Provides controls to search for users by name or email, and filter by role.
 * When users match the search criteria, they are displayed in a list.
 * Otherwise, a message is displayed.
 */
export default function UserManagementView() {
  const client = new AuthClient(clientStrategy())
  const [users, setUsers] = useState<UserData[]>([])
  const [query, onQueryChange, queryErr] = useChangeListener(searchSchema)
  const [limit, onLimitChange, limitErr] = useChangeListener(z.coerce.number().min(1).max(100))
  const [role, setRole] = useState<UserData['role'] | 'all'>('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [showError, setShowError] = useState(false)

  const refresh = async () => {
    if (queryErr || limitErr) {
      setUsers([])
      return
    }

    const res = await client.list(parseFilter({ query, limit, role }))

    if (res.success) {
      setUsers(res.result)
    }
  }

  //* Event Handler

  const handleUpdate = async () => {
    setLoading(true)
    await refresh()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    setLoading(true)

    const res = await client.remove(id)

    if (res.success) {
      await refresh()
      setLoading(false)
    } else {
      setError(res.error.message)
      setLoading(false)
      setShowError(true)
    }
  }

  useDebounce(refresh, 1000, [limit, query, role])

  //* Render

  return (
    <>
      <LoadingModal open={loading} />
      <AlertModal
        open={showError}
        onClose={() => setShowError(false)}
        icon="error"
        variant="error"
        title="This did not work!"
        description={error ?? ''}
      />
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full flex-row flex-wrap justify-between gap-6">
          <div className="w-full max-w-[24rem]">
            <LabeledInput label="Limit" error={limitErr}>
              <TextInput
                type="number"
                onChange={onLimitChange}
                placeholder="Number of results (1 to 100)"
                clear
              />
            </LabeledInput>
          </div>
          <div className="w-full max-w-[24rem]">
            <LabeledInput label="Search" error={queryErr}>
              <TextInput
                type="text"
                onChange={onQueryChange}
                placeholder="name:<name> email:<email>"
                clear
              />
            </LabeledInput>
          </div>
          <div className="w-full max-w-[24rem]">
            <LabeledInput label="Role">
              <SelectInput defaultValue="all" options={roleOptions} onSelect={setRole} />
            </LabeledInput>
          </div>
        </div>
        <div className="min-h-[30rem]">
          {users.length === 0 ? (
            <NoContentView
              title="No users found."
              message="It seems no users match your search criteria."
            />
          ) : (
            <UserList users={users} onDelete={handleDelete} onUpdate={handleUpdate} />
          )}
        </div>
      </div>
    </>
  )
}
