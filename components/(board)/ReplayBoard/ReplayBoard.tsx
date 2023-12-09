'use client'

import { formatMove } from '@/lib/util/format'
import { MoveInfo } from '@ivy-chess/model'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Icon from '../../(media)/Icon/Icon'
import Modal from '../../(modal)/Modal/Modal'
import ChessBoard from '../ChessBoard/ChessBoard'
import MoveDetails from './MoveDetails'

interface Props {
  /**
   * The moves of the game.
   * Including information about each move.
   */
  moves: MoveInfo[]

  /**
   * The index of the initial move.
   * When updated the board will reset to the given move.
   *
   * @default 0
   */
  start?: number

  /**
   * The fen of the initial position.
   * When not given, the standard start position is used.
   */
  startFen?: string
}

const standardFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

/**
 * A client side chess board component that allows for replaying a game.
 */
export default function ReplayBoard(props: Props) {
  const [idx, setIdx] = useState(props.start ?? 0)
  const [showInfo, setShowInfo] = useState(false)
  const positions = props.moves.length + 1
  const next = () => setIdx((idx + 1) % positions)
  const prev = () => setIdx((idx - 1 + positions) % positions)

  //* Event Handler

  useEffect(() => {
    if (props.start) {
      setIdx(props.start)
    }
  }, [props.start])

  //* UI

  const NavButton = (props: { children: React.ReactNode; onClick: () => void }) => (
    <button
      onClick={props.onClick}
      className="flex w-36 flex-row justify-center gap-2 rounded-lg bg-action-primary px-4 py-2 text-base text-on-secondary hover:bg-action-primary-active"
    >
      {props.children}
    </button>
  )

  const MoveCounter = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-sm">
          {idx} / {positions - 1}
        </span>
        <span className="text-bold">{idx > 0 ? formatMove(props.moves[idx - 1].move) : '-'}</span>
      </div>
      <button
        disabled={idx === 0}
        onClick={() => setShowInfo(true)}
        className={classNames(
          'h-10 w-10 rounded-full border-2 bg-opacity-80 p-1 text-on-primary',
          'hover:bg-action-primary-active hover:text-on-secondary disabled:bg-gray-400 disabled:text-gray-600'
        )}
      >
        <Icon name="query-stats" />
      </button>
    </div>
  )

  //* Render

  return (
    <>
      <Modal open={showInfo} onClose={() => setShowInfo(false)}>
        {idx > 0 && (
          <MoveDetails
            color={(idx - 1) % 2 === 0 ? 'white' : 'black'}
            move={props.moves[idx - 1]}
          />
        )}
      </Modal>
      <div className="flex w-fit flex-col gap-4">
        <ChessBoard fen={idx === 0 ? props.startFen ?? standardFen : props.moves[idx - 1].fen} />
        <div className="flex flex-row items-start justify-between">
          <NavButton onClick={prev}>
            <Icon name="prev" />
            <span>Prev</span>
          </NavButton>
          <MoveCounter />
          <NavButton onClick={next}>
            <span>Next</span>
            <Icon name="next" />
          </NavButton>
        </div>
      </div>
    </>
  )
}
