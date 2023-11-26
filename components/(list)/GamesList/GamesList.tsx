import { LiveGame } from '@ivy-chess/model'
import List from '../List/List'
import GamesListRow from './GamesListRow'
import GamesListTools from './GamesListTools'

interface Props {
  /**
   * The list of games to display.
   */
  games: LiveGame[]
}

/**
 * A list of games.
 * Provides a link to create new games and for each game,
 * a link to view the game and a button to delete the game.
 */
export default function GamesList({ games }: Props) {
  return (
    <List variant="games-list" head={['ID', 'Active', <GamesListTools />]}>
      {games.map((game) => (
        <GamesListRow key={game.id} id={game.id} active={game.isActive} />
      ))}
    </List>
  )
}
