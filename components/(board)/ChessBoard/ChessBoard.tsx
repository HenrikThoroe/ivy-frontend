import { Position, decode } from '@ivy-chess/model'
import classNames from 'classnames'
import Piece from './Piece'

interface Props {
  /**
   * The FEN as the description of the
   * position displayed on the board.
   */
  fen: string
}

/**
 * Static chess board component.
 *
 * Construct a view of a chess board from a FEN string.
 * Can be rendered server side.
 */
export default function ChessBoard(props: Props) {
  const { fen } = props
  const board = decode(fen)

  //* UI

  const Tile = ({ position }: { position: Position }) => (
    <div
      className={classNames(`relative flex h-20 w-20 items-center justify-center bg-gray-500`, {
        'bg-slate-300 text-on-primary': position.color === 'white',
        'bg-slate-600 text-on-secondary': position.color === 'black',
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

  //* Render

  return (
    <div className="h-fit w-fit">
      <div className="grid grid-cols-chess-board grid-rows-chess-board">
        {Array.from({ length: 64 }, (_, idx) => (
          <Tile position={board.positions[idx]} />
        ))}
      </div>
    </div>
  )
}
