import ListAction from '../List/ListAction'

export default function VerificationGroupListTools() {
  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/stats/compare/create" />
    </div>
  )
}
