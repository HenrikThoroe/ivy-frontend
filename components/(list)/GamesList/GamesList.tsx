import { LiveGame } from '@ivy-chess/model'
import { useId } from 'react'
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
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  })

  const toolID = useId()
  const created = (game: LiveGame) => (game.events.length > 0 ? game.events[0].timestamp : 0)
  const managed = games
    .sort((a, b) => created(b) - created(a))
    .sort((a, b) => +b.isActive - +a.isActive)

  return (
    <List variant="games-list" head={['Created', 'Active', <GamesListTools key={toolID} />]}>
      {managed.map((game, idx) => (
        <GamesListRow
          key={`${game.id}-${idx}`}
          id={game.id}
          date={dateFormatter.format(created(game))}
          active={game.isActive}
        />
      ))}
    </List>
  )
}
