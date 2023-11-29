import {
  Move,
  create,
  decode,
  encode,
  fenEncode,
  isValidMove,
  moves,
  move as performMove,
  register,
} from '@ivy-chess/model'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useState } from 'react'
import InteractiveBoard from './InteractiveBoard'

const meta: Meta<typeof InteractiveBoard> = {
  tags: ['autodocs'],
  title: 'Components/Board/Interactive',
  component: InteractiveBoard,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof InteractiveBoard>

export const WithGameMock: StoryFn<typeof InteractiveBoard> = () => {
  const [history, setHistory] = useState<string[]>([])
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

  const handleMove = async (move: Move) => {
    const game = create({ timeback: 0, timeout: Infinity })
    const fen = fenEncode.encodeMove(move)

    register(game)
    register(game)
    history.forEach((fen) => performMove(game, fen))
    performMove(game, fen)
    setHistory([...history, fen])
    setFen(encode(game.board))
  }

  return <InteractiveBoard position={fen} onMove={handleMove} enabled />
}

export const Enabled: Story = {
  args: {
    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    onMove: () => {},
    enabled: true,
  },
}

export const Disabled: Story = {
  args: {
    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    onMove: () => {},
    enabled: false,
  },
}

export const WithPromotionGameMock: StoryFn<typeof InteractiveBoard> = () => {
  const start = '7k/1P6/8/8/8/8/6p1/K7 w - - 0 1'
  const [history, setHistory] = useState<string[]>([])
  const [fen, setFen] = useState(start)

  const handleMove = async (move: Move) => {
    const game = create({ timeback: 0, timeout: Infinity })
    const fen = fenEncode.encodeMove(move)

    game.board = decode(start)
    register(game)
    register(game)
    history.forEach((fen) => performMove(game, fen))
    performMove(game, fen)
    setHistory([...history, fen])
    setFen(encode(game.board))
  }

  return <InteractiveBoard position={fen} onMove={handleMove} enabled />
}

export const WithTimeoutMock: StoryFn<typeof InteractiveBoard> = () => {
  const [history, setHistory] = useState<string[]>([])
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [enabled, setEnabled] = useState(true)

  const handleMove = async (move: Move) => {
    console.log(history)
    const game = create({ timeback: 0, timeout: Infinity })
    const fen = fenEncode.encodeMove(move)

    setEnabled(false)

    register(game)
    register(game)
    history.forEach((fen) => performMove(game, fen))
    performMove(game, fen)
    setFen(encode(game.board))

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const positions = game.board.positions
      .map((p, i) => [p, i] as const)
      .filter((position) => position[0].piece && position[0].piece.color === game.board.next)

    const available: Move[] = positions
      .map((p) => p[1])
      .map((i) =>
        moves(game.board, i)
          .filter((t) => isValidMove(game.board, i, t))
          .map((t) => ({ source: i, target: t }))
      )
      .flat()

    const rand = available[Math.floor(Math.random() * available.length)]

    performMove(game, fenEncode.encodeMove(rand))
    setHistory([...history, fen, fenEncode.encodeMove(rand)])
    setFen(encode(game.board))
    setEnabled(true)
  }

  return <InteractiveBoard position={fen} onMove={handleMove} enabled={enabled} />
}

export default meta
