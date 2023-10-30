import { shared } from '@ivy-chess/api-schema'
import type { Meta, StoryObj } from '@storybook/react'
import replay from '../../../assets/data/sample_replay.json'
import ReplayBoard from './ReplayBoard'

const meta: Meta<typeof ReplayBoard> = {
  tags: ['autodocs'],
  title: 'Components/Board/Replay',
  component: ReplayBoard,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof ReplayBoard>

export const Plain: Story = {
  args: {
    moves: shared.replay.replaySchema.parse(replay).history,
  },
}

export default meta
