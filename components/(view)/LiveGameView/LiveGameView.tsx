'use client'

import PlayerCard from '@/components/(card)/PlayerCard/PlayerCard'
import StateDot from '@/components/(media)/StateDot/StateDot'
import { useLiveGame } from '@/lib/hooks/useLiveGame'
import { usePlayerClient } from '@/lib/hooks/usePlayerClient'
import { capitalize } from '@/lib/util/format'
import { LiveGame, Player } from '@ivy-chess/model'
import classNames from 'classnames'
import LiveGameEventsView from '../LiveGameEventsView/LiveGameEventsView'
import Section from '../SectionedView/Section'
import SectionedView from '../SectionedView/SectionedView'
import Board from './Board'

interface Props {
  /**
   * The initial data of the game to display.
   * Will be updatde using the real time API.
   */
  data: LiveGame
}

/**
 * A view to display a live game and update the game state in real time.
 * Allows the user to connect to the game as a player, if the
 * game supports human input and has free slots.
 */
export default function LiveGameView(props: Props) {
  const { data } = props
  const game = useLiveGame(data)
  const player = usePlayerClient()

  const canConnect = (data: Player) =>
    game.isActive &&
    data.type === 'human' &&
    (data.id === player.id || !data.connected) &&
    (data.id === player.id || !player.isInitialized)

  //* UI

  const PlayerState = ({ player }: { player: Player }) => {
    const color = player.connected ? 'green' : 'red'
    const label = player.connected ? 'connected' : 'disconnected'

    return <StateDot color={color} label={label} />
  }

  const GameState = () => {
    const color = player.isInitialized ? 'green' : game.isActive ? 'yellow' : 'red'
    const label = player.isInitialized ? 'connected' : game.isActive ? 'spectating' : 'inactive'

    return <StateDot color={color} label={label} />
  }

  const GameLabel = () => {
    let label = 'Watching Game'

    if (player.isInitialized && player.shouldMove) {
      label = `It's your turn! ${capitalize(game.game.board.next)} to move.`
    }

    if (player.isInitialized && !player.shouldMove) {
      label = 'Waiting for opponent...'
    }

    if (!game.isActive) {
      label = 'Game Over!'

      if (game.game.winner === 'draw') {
        label += ` Draw by ${game.game.reason}.`
      } else {
        label += ` ${capitalize(game.game.winner ?? 'none')} wins by ${game.game.reason}.`
      }
    }

    return (
      <h2
        className={classNames('w-full px-6 py-8 text-center font-mono text-2xl font-medium', {
          'bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text text-transparent':
            player.shouldMove,
        })}
      >
        {label}
      </h2>
    )
  }

  //* Render

  return (
    <SectionedView>
      <Section title="Game" action={<GameState />}>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <GameLabel />
          <Board
            game={game}
            player={player}
            shouldMove={player.shouldMove}
            isActive={game.isActive}
          />
        </div>
      </Section>
      <Section title="White" action={<PlayerState player={game.players.white} />}>
        <PlayerCard
          player={game.players.white}
          isConnected={player.isInitialized}
          canConnect={canConnect(game.players.white)}
          onJoin={() => player.checkIn(game.players.white.id)}
          onLeave={() => player.exit()}
        />
      </Section>
      <Section title="Black" action={<PlayerState player={game.players.black} />}>
        <PlayerCard
          player={game.players.black}
          isConnected={player.isInitialized}
          canConnect={canConnect(game.players.black)}
          onJoin={() => player.checkIn(game.players.black.id)}
          onLeave={() => player.exit()}
        />
      </Section>
      <Section title="Events">
        <LiveGameEventsView events={game.events} />
      </Section>
    </SectionedView>
  )
}
