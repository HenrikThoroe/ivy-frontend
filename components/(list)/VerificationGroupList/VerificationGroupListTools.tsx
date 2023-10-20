import ListAction from '../List/ListAction'

/**
 * A set of tools for the verification group list header.
 * Contains a button to create a new verification group.
 */
export default function VerificationGroupListTools() {
  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/stats/compare/create" />
    </div>
  )
}
