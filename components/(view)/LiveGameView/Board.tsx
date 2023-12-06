import InteractiveBoard from '@/components/(board)/InteractiveBoard/InteractiveBoard'
import ReplayBoard from '@/components/(board)/ReplayBoard/ReplayBoard'
import { PlayerClient } from '@/lib/live/PlayerClient'
import { buildReplayHistory } from '@/lib/util/buildGameHistory'
import { LiveGame, encode } from '@ivy-chess/model'
import { memo } from 'react'

interface Props {
  /**
   * The live game to display.
   */
  game: LiveGame

  /**
   * The player client to use for interaction.
   */
  player: PlayerClient

  /**
   * Whether the player should be able to make moves.
   */
  shouldMove: boolean

  /**
   * Whether the game is active.
   */
  isActive: boolean
}

const compare = (prev: Props, next: Props) =>
  encode(prev.game.game.board) === encode(next.game.game.board) &&
  prev.isActive === next.isActive &&
  prev.shouldMove === next.shouldMove

/**
 * Memorized chess board for a live game.
 *
 * If the game is active, an interactive board is displayed,
 * which allows the user to make moves if they are the current player.
 * When the game is inactive, a replay board is displayed.
 */
export default memo(function Board(props: Props) {
  if (props.isActive) {
    return (
      <InteractiveBoard
        enabled={props.shouldMove}
        onMove={props.player.move}
        position={encode(props.game.game.board)}
      />
    )
  }

  return <ReplayBoard moves={buildReplayHistory(props.game.game.history)} />
}, compare)
