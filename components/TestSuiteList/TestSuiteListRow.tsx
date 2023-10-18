'use client'

import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { TestSuite } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'
import ActionModal from '../Modal/ActionModal'
import WithModal from '../Modal/WithModal'

interface Props {
  suite: TestSuite
}

export default function TestSuiteListRow(props: Props) {
  const router = useRouter()
  const client = new TestSuiteClient(clientStrategy())

  const iter = Intl.NumberFormat('en-US', { compactDisplay: 'short' }).format(
    props.suite.iterations
  )

  const handleDelete = async () => {
    await client.unsafeDelete(props.suite.id)
    router.refresh()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(props.suite.id)
  }

  return (
    <ListRow variant="custom-2">
      <span>{props.suite.name}</span>
      <span>{`${props.suite.engines[0].name} vs. ${props.suite.engines[1].name}`}</span>
      <span>{iter}</span>
      <ListActions>
        <WithModal
          modal={
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
          }
        >
          <ListAction variant="action" style="danger" icon="delete" />
        </WithModal>
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
