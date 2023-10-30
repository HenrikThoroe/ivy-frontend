import { Color, PieceType } from '@ivy-chess/model'
import Image from 'next/image'
import BishopDarkSVG from '../../(media)/(figures)/bishop-dark.svg'
import BishopLightSVG from '../../(media)/(figures)/bishop-light.svg'
import KingDarkSVG from '../../(media)/(figures)/king-dark.svg'
import KingLightSVG from '../../(media)/(figures)/king-light.svg'
import KnightDarkSVG from '../../(media)/(figures)/knight-dark.svg'
import KnightLightSVG from '../../(media)/(figures)/knight-light.svg'
import PawnDarkSVG from '../../(media)/(figures)/pawn-dark.svg'
import PawnLightSVG from '../../(media)/(figures)/pawn-light.svg'
import QueenDarkSVG from '../../(media)/(figures)/queen-dark.svg'
import QueenLightSVG from '../../(media)/(figures)/queen-light.svg'
import RookDarkSVG from '../../(media)/(figures)/rook-dark.svg'
import RookLightSVG from '../../(media)/(figures)/rook-light.svg'

export default function Piece({ piece, color }: { piece: PieceType; color: Color }) {
  const src = () => {
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

  return <Image src={src()} alt={piece} width={50} height={50} />
}
