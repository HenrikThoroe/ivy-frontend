import type { Meta, StoryObj } from '@storybook/react'
import ChessBoard from './ChessBoard'

const meta: Meta<typeof ChessBoard> = {
  tags: ['autodocs'],
  title: 'Components/Board/Chess',
  component: ChessBoard,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof ChessBoard>

export const Start: Story = {
  args: {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  },
}

export const MidGame: Story = {
  args: {
    fen: '1br5/6p1/1R2pk1p/1np1p3/1P2P3/3N2PP/1B3P2/5K2 b - - 0 42',
  },
}

export default meta
