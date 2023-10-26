'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { TestSession, TestSessionClient } from '@/lib/api/clients/TestSessionClient'
import { useRouter } from 'next/navigation'
import ActionModal from '../../(modal)/ActionModal/ActionModal'
import WithModal from '../../(modal)/WithModal/WithModal'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'

interface Props {
  /**
   * Test session to display
   */
  session: TestSession
}

/**
 * The {@link ListRow row} for a {@link TestSession test session}.
 * Provides controls for the user to delete the test session.
 */
export default function TestSessionsListRow({ session }: Props) {
  const router = useRouter()
  const progress = (session.suite.iterations - session.remaining) / session.suite.iterations
  const client = new TestSessionClient(clientStrategy())

  //* Event Handler

  const handleDelete = async () => {
    await client.delete(session.id)
    router.refresh()
  }

  //* UI

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="flex-start flex h-1.5 w-full overflow-hidden rounded-lg bg-slate-300 font-sans text-xs font-medium">
      <div
        className="flex h-full items-baseline justify-center overflow-hidden break-all bg-pink-500 text-white"
        style={{
          width: `${progress * 100}%`,
        }}
      ></div>
    </div>
  )

  const DeletePrompt = (
    <ActionModal
      title="Delete Test Session"
      description={
        'Deleting the test session will discard all current progress and cannot be undone. ' +
        'It can take some time until the involved test drivers can be reused. ' +
        'Are you sure you want to delete this test session?'
      }
      icon="delete"
      action={{
        label: 'Delete',
        variant: 'danger',
        onClick: handleDelete,
      }}
    />
  )

  //* Render

  return (
    <ListRow variant="custom-3">
      <span>{session.suite.name}</span>
      <ProgressBar progress={progress} />
      <ListActions>
        <WithModal modal={DeletePrompt}>
          <ListAction variant="action" style="danger" icon="delete" />
        </WithModal>
      </ListActions>
    </ListRow>
  )
}
