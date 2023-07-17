import classNames from 'classnames'
import Image from 'next/image'
import RookDarkSVG from '../Icon/ChessFigures/rook-dark.svg'
import RookLightSVG from '../Icon/ChessFigures/rook-light.svg'
import PawnDarkSVG from '../Icon/ChessFigures/pawn-dark.svg'
import PawnLightSVG from '../Icon/ChessFigures/pawn-light.svg'
import KnightDarkSVG from '../Icon/ChessFigures/knight-dark.svg'
import KnightLightSVG from '../Icon/ChessFigures/knight-light.svg'
import BishopDarkSVG from '../Icon/ChessFigures/bishop-dark.svg'
import BishopLightSVG from '../Icon/ChessFigures/bishop-light.svg'
import QueenDarkSVG from '../Icon/ChessFigures/queen-dark.svg'
import QueenLightSVG from '../Icon/ChessFigures/queen-light.svg'
import KingDarkSVG from '../Icon/ChessFigures/king-dark.svg'
import KingLightSVG from '../Icon/ChessFigures/king-light.svg'
import { PieceType, Color, decode, Position } from '@ivy-chess/model'

interface Props {
  fen: string
}

const pieceSrc = (piece: PieceType, color: Color) => {
  switch (piece) {
    case 'pawn':
      return color === 'white' ? PawnLightSVG : PawnDarkSVG
    case 'rook':
      return color === 'white' ? RookLightSVG : RookDarkSVG
    case 'knight':
      return color === 'white' ? KnightLightSVG : KnightDarkSVG
    case 'bishop':
      return color === 'white' ? BishopLightSVG : BishopDarkSVG
    case 'queen':
      return color === 'white' ? QueenLightSVG : QueenDarkSVG
    case 'king':
      return color === 'white' ? KingLightSVG : KingDarkSVG
  }
}

function Tile({ position }: { position: Position }) {
  return (
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
      {position.piece && (
        <Image
          src={pieceSrc(position.piece.type, position.piece.color)}
          alt={position.piece.type}
          width={50}
          height={50}
        />
      )}
    </div>
  )
}

export default function ChessBoard(props: Props) {
  const { fen } = props
  const board = decode(fen)

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
