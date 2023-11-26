import ListAction from '../List/ListAction'

/**
 * A set of tools for the games list.
 * Provides a button to create a new game.
 */
export default function GamesListTools() {
  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/games/add" />
    </div>
  )
}
