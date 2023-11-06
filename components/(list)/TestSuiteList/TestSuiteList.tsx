import { TestSuite } from '@ivy-chess/model'
import List from '../List/List'
import TestSuiteListRow from './TestSuiteListRow'
import TestSuiteListTools from './TestSuiteListTools'

interface Props {
  /**
   * The list of test suites to display.
   */
  suites: TestSuite[]
}

/**
 * A list of {@link TestSuite test suites}.
 * Provides controls for the user to create a new test suite.
 * Each test suite can be viewed, deleted or its ID can be copied.
 *
 * For each test suite the following information is displayed:
 * - Name
 * - Engines
 * - Iterations
 */
export default function TestSuiteList(props: Props) {
  return (
    <List
      variant="custom-2"
      head={['Name', 'Engines', 'Iterations', <TestSuiteListTools key="test-suite-list-tools" />]}
    >
      {props.suites.map((suite) => (
        <TestSuiteListRow suite={suite} key={`test-suite-row-${suite.id}`} />
      ))}
    </List>
  )
}
