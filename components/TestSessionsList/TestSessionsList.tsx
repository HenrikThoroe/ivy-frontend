import { TestSession } from '@/lib/data/Test'
import List from '../List/List'
import TestSessionListTools from './TestSessionListTools'
import TestSessionsListRow from './TestSessionsListRow'

interface Props {
  sessions: TestSession[]
}

export default function TestSessionsList(props: Props) {
  return (
    <List variant="custom-3" head={['Test Suite', 'Progress', <TestSessionListTools />]}>
      {props.sessions.map((session) => (
        <TestSessionsListRow session={session} />
      ))}
    </List>
  )
}
