import { TestSession } from '@/lib/api/clients/TestSessionClient'
import List from '../List/List'
import TestSessionListTools from './TestSessionListTools'
import TestSessionsListRow from './TestSessionsListRow'

interface Props {
  /**
   * Test sessions to display
   */
  sessions: TestSession[]
}

/**
 * A {@link List list} of {@link TestSession test sessions}.
 * Provides controls for the user to create a new test session.
 * For each test session, a {@link TestSessionsListRow row} is rendered.
 * The user can delete a test session by clicking the delete button in the row.
 *
 * The following information is displayed for each test session:
 * - Test suite name
 * - Current progress
 */
export default function TestSessionsList(props: Props) {
  return (
    <List
      variant="custom-3"
      head={['Test Suite', 'Progress', <TestSessionListTools key="test-session-list-tools" />]}
    >
      {props.sessions.map((session) => (
        <TestSessionsListRow session={session} key={`test-session-row-${session.id}`} />
      ))}
    </List>
  )
}
