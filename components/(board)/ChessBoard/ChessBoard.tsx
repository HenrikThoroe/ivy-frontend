'use client'

import { Position, decode, isValidMove, moves } from '@ivy-chess/model'
import { useMemo, useState } from 'react'
import Tile from './Tile'

interface Props {
  /**
   * The FEN as the description of the
   * position displayed on the board.
   */
  fen: string

  /**
   * Called when a piece is selected.
   */
  onSelectPiece?: (index: number) => void

  /**
   * Called when a target is selected for the last selected piece.
   */
  onSelectTarget?: (index: number) => void
}

/**
 * Chess board component.
 *
 * Construct a view of a chess board from a FEN string.
 * When given the `onSelectPiece` callback, the board will
 * allow the user to select a piece. When given the
 * `onSelectTarget` callback, the board will allow the user
 * to select a target for the last selected piece.
 */
export default function ChessBoard(props: Props) {
  const { fen, onSelectPiece, onSelectTarget } = props
  const board = useMemo(() => decode(fen), [fen])
  const [selected, setSelected] = useState<Position | undefined>(undefined)

  const index = (position: Position) => board.positions.indexOf(position)

  const isSelected = (position: Position) =>
    selected?.column === position.column && selected?.row === position.row

  const targets = useMemo(() => {
    if (!selected) return []
    const source = index(selected)
    return moves(board, source).filter((target) => isValidMove(board, source, target))
  }, [fen, selected])

  const canBeSelected = (position: Position) => {
    if (onSelectPiece === undefined) {
      return false
    }

    if (position.piece && position.piece.color === board.next) {
      return true
    }

    if (onSelectTarget && targets.includes(board.positions.indexOf(position))) {
      return true
    }

    return false
  }

  //* Event Handler

  const handleTileClick = (position: Position) => {
    if (onSelectPiece && position.piece && position.piece.color === board.next) {
      setSelected(position)
      onSelectPiece(index(position))
      return
    }

    if (onSelectTarget && targets.includes(board.positions.indexOf(position))) {
      setSelected(undefined)
      onSelectTarget(index(position))
      return
    }
  }

  //* Render

  return (
    <div className="h-fit w-fit">
      <div className="grid grid-cols-chess-board grid-rows-chess-board">
        {board.positions.map((position, index) => (
          <Tile
            position={position}
            canBeSelected={canBeSelected(position)}
            onSelect={handleTileClick}
            selected={isSelected(position)}
            key={`chess-board-tile-${index}`}
            highlight={onSelectTarget ? targets.includes(index) : false}
          />
        ))}
      </div>
    </div>
  )
}
