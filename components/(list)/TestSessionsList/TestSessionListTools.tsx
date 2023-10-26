import ListAction from '../List/ListAction'

/**
 * A set of tools for the test session list.
 * Provides a button to create a new test session.
 */
export default function TestSessionListTools() {
  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/training/add" />
    </div>
  )
}
