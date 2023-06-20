import ListAction from '../List/ListAction'

export default function TestSessionListTools() {
  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/training/sessions/create" />
    </div>
  )
}
