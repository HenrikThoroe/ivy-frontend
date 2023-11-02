'use client'

import { useEditorMode } from '@/lib/api/auth/access/hooks'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { TestSuite } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import ActionModal from '../../(modal)/ActionModal/ActionModal'
import WithModal from '../../(modal)/WithModal/WithModal'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'

interface Props {
  /**
   * Test suite to display
   */
  suite: TestSuite
}

const formatter = Intl.NumberFormat('en-US', {
  compactDisplay: 'short',
  notation: 'compact',
})

/**
 * The {@link ListRow row} for a {@link TestSuite test suite}.
 *
 * Provides controls for the user to view, copy, and delete the test suite.
 */
export default function TestSuiteListRow(props: Props) {
  const router = useRouter()
  const client = new TestSuiteClient(clientStrategy())
  const iter = formatter.format(props.suite.iterations)
  const editor = useEditorMode()

  //* Event Handler

  const handleDelete = async () => {
    await client.unsafeDelete(props.suite.id)
    router.refresh()
  }

  const handleCopy = () => navigator.clipboard.writeText(props.suite.id)

  //* UI

  const DeletePrompt = (
    <ActionModal
      title="Delete Test Suite"
      description="Deleting the test suit will remove it from the registry. This action cannot be undone."
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
    <ListRow variant="custom-2">
      <span>{props.suite.name}</span>
      <span>{`${props.suite.engines[0].name} vs. ${props.suite.engines[1].name}`}</span>
      <span>{iter}</span>
      <ListActions>
        {editor && (
          <WithModal modal={DeletePrompt}>
            <ListAction variant="action" style="danger" icon="delete" />
          </WithModal>
        )}
        <ListAction
          variant="link"
          style="primary"
          icon="visibility"
          href={`/training/suites/${props.suite.id}`}
        />
        <ListAction variant="action" style="primary" icon="copy" onClick={handleCopy} />
      </ListActions>
    </ListRow>
  )
}
