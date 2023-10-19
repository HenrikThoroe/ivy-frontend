import { Color, EngineVersion } from '@ivy-chess/model'
import moment from 'moment'

/**
 * Format an engine name and version into a string.
 *
 * @param name The engine name.
 * @param version The engine version.
 * @returns The formatted engine name and version.
 */
export function formatEngine(name: string, version: EngineVersion) {
  return `${name} ${version.major}.${version.minor}.${version.patch}`
}

/**
 * Format a winner of a chess game into a string.
 * The string will be formatted as follows:
 * - `1 : 1` for a draw
 * - `2 : 0` for a white win
 * - `0 : 2` for a black win
 *
 * @param winner The winner of the game.
 * @returns The formatted winner.
 */
export function formatWinner(winner: Color | 'draw') {
  if (winner === 'draw') {
    return '1 : 1'
  } else if (winner === 'white') {
    return '2 : 0'
  } else {
    return '0 : 2'
  }
}

/**
 * Format a date into a string.
 * The string will be formatted as `YYYY-MM-DD`.
 *
 * @param date The date to format.
 * @returns The formatted date or `undefined`, if the date is `undefined`.
 */
export function formatDate(date?: Date) {
  if (!date) {
    return undefined
  }

  return moment(date).format('YYYY-MM-DD')
}
