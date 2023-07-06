import { TestSuite } from '@ivy-chess/model'
import List from '../List/List'
import TestSuiteListRow from './TestSuiteListRow'
import TestSuiteListTools from './TestSuiteListTools'

interface Props {
  suites: TestSuite[]
}

export default function TestSuiteList(props: Props) {
  return (
    <List variant="custom-2" head={['Name', 'Engines', 'Iterations', <TestSuiteListTools />]}>
      {props.suites.map((suite) => (
        <TestSuiteListRow suite={suite} />
      ))}
    </List>
  )
}
