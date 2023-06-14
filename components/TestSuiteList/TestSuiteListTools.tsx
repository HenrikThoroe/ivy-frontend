import ListAction from '../List/ListAction'

export default function TestSuiteListTools() {
  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/training/suites/create" />
    </div>
  )
}
