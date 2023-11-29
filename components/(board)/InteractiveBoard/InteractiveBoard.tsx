'use client'

import Modal from '@/components/(modal)/Modal/Modal'
import { Move, Piece, PieceType } from '@ivy-chess/model'
import { useEffect, useState } from 'react'
import ChessBoard from '../ChessBoard/ChessBoard'
import { default as ChessPiece } from '../ChessBoard/Piece'

interface Props {
  /**
   * Whether the board is enabled for interaction.
   */
  enabled: boolean

  /**
   * Called when the user selects a move.
   */
  onMove: (move: Move) => void

  /**
   * The FEN of the current board position.
   * Should be updated after each move.
   * To prevent visible lag, the position should be updated
   * right after a move is made and possibly reverted if the move is invalid.
   */
  position: string
}

/**
 * Interactive chess board component.
 *
 * Wrapper for `ChessBoard` that abstracts the piece and target selection to
 * move selection. When the move requires a promotion, a modal will be shown
 * to allow the user to select the promotion piece. The resulting move
 * will be passed to the `onMove` callback.
 */
export default function InteractiveBoard(props: Props) {
  const { enabled, onMove, position } = props
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [target, setTarget] = useState<number | undefined>(undefined)
  const [piece, setPiece] = useState<Piece | undefined>(undefined)
  const [promptPromotion, setPromptPromotion] = useState(false)

  //* Event Handler

  const handleMove = (move: Move) => {
    setSelected(undefined)
    setTarget(undefined)
    onMove(move)
  }

  useEffect(() => {
    if (selected === undefined || target === undefined || !enabled) {
      return
    }

    if (piece && piece.type === 'pawn' && (target < 8 || target > 55)) {
      setPromptPromotion(true)
      return
    }

    handleMove({ source: selected, target })
  }, [target, selected])

  const handlePromotion = (type: PieceType) => {
    if (selected === undefined || target === undefined || !enabled) {
      return
    }

    if (!piece || !target) {
      throw new Error('No piece selected')
    }

    setPromptPromotion(false)
    handleMove({ target, source: selected, promotion: { type, color: piece.color } })
  }

  const handlePieceSelect = (index: number, piece: Piece) => {
    if (!enabled) return

    setSelected(index)
    setPiece(piece)
  }

  //* UI

  const PromotionButton = ({ type }: { type: PieceType }) => (
    <button className="rounded-lg border p-2 shadow-md" onClick={() => handlePromotion(type)}>
      <ChessPiece color={piece?.color ?? 'black'} piece={type} />
    </button>
  )

  //* Render

  return (
    <>
      <Modal open={promptPromotion} onClose={() => setPromptPromotion(false)}>
        <div className="flex flex-row items-center justify-center gap-4 px-6 py-12">
          <PromotionButton type="queen" />
          <PromotionButton type="rook" />
          <PromotionButton type="bishop" />
          <PromotionButton type="knight" />
        </div>
      </Modal>
      <ChessBoard
        fen={position}
        onSelectPiece={!enabled ? undefined : handlePieceSelect}
        onSelectTarget={!enabled ? undefined : setTarget}
      />
    </>
  )
}
