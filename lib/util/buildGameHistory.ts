import { Move, MoveInfo, create, encode, fenEncode, move, register } from '@ivy-chess/model'

/**
 * Converts a list of moves into a list of move infos.
 * The returned list can be used to replay the game.
 *
 * @param moves The moves to convert.
 * @returns The move infos.
 */
export function buildReplayHistory(moves: Move[]): MoveInfo[] {
  try {
    const game = create({ timeout: Infinity, timeback: 0 })
    const history: MoveInfo[] = []

    register(game)
    register(game)

    for (const mv of moves) {
      move(game, fenEncode.encodeMove(mv))
      history.push({
        move: mv,
        details: {},
        fen: encode(game.board),
      })
    }

    return history
  } catch {
    return []
  }
}
