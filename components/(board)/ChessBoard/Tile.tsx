'use client'

import { Position } from '@ivy-chess/model'
import classNames from 'classnames'
import { memo } from 'react'
import Piece from './Piece'

interface Props {
  /**
   * The position which the tile represents.
   */
  position: Position

  /**
   * Whether the tile is selected.
   * Only one tile should be selected at the same time.
   */
  selected: boolean

  /**
   * Called when the tile is clicked and `canBeSelected` is true.
   */
  onSelect: (position: Position) => void

  /**
   * Whether the tile should react to `onClick` events.
   */
  canBeSelected: boolean

  /**
   * Whether the tile should be highlighted.
   * A highlighted tile most commonly indicates a valid move target.
   */
  highlight: boolean
}

const compareProps = (prev: Props, next: Props) =>
  prev.position.column === next.position.column &&
  prev.position.row === next.position.row &&
  prev.position.color === next.position.color &&
  prev.position.piece === next.position.piece &&
  prev.selected === next.selected &&
  prev.canBeSelected === next.canBeSelected &&
  prev.highlight === next.highlight

/**
 * A tile on the chess board.
 *
 * The tile is a square (5rem x 5rem). If the position has a piece,
 * the tile will render a `Piece` component.
 *
 * If the tile is on the bottom or left edge of the board, it will
 * render the row or column number respectively.
 *
 * The tile can be configured to react to `onClick` events. If the
 * tile is clicked, the `onSelect` callback will be called with the
 * position of the tile.
 *
 * The component uses `memo` to prevent unnecessary re-renders.
 */
export default memo(function Tile(props: Props) {
  const { position, selected, onSelect, canBeSelected, highlight } = props

  return (
    <div
      onClick={() => canBeSelected && onSelect(position)}
      className={classNames(`relative flex h-20 w-20 items-center justify-center bg-gray-500`, {
        'bg-slate-300 text-on-primary': position.color === 'white',
        'bg-slate-600 text-on-secondary': position.color === 'black',
        'hover:cursor-pointer': canBeSelected,
        'after:absolute after:h-16 after:w-16 after:rounded-full after:border-4 after:border-opacity-80':
          selected || highlight,
        'after:border-action-primary-active': selected,
        'after:border-white': highlight,
      })}
    >
      {position.column === 1 && (
        <span className="absolute left-1 top-1 text-sm">{position.row}</span>
      )}
      {position.row === 1 && (
        <span className="absolute bottom-1 right-1 text-sm">
          {String.fromCharCode(96 + position.column)}
        </span>
      )}
      {position.piece && <Piece piece={position.piece.type} color={position.piece.color} />}
    </div>
  )
}, compareProps)
