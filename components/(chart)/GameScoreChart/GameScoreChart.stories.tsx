import type { Meta, StoryObj } from '@storybook/react'
import stats from '../../../assets/data/sample_replay_stats.json'
import checkmate from '../../../assets/data/sample_replay_stats_checkmate.json'
import GameScoreChart from './GameScoreChart'

const meta: Meta<typeof GameScoreChart> = {
  tags: ['autodocs'],
  title: 'Components/Chart/Game Score',
  component: GameScoreChart,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof GameScoreChart>

export const Plain: Story = {
  args: {
    stats: stats as any,
  },
}

export const Checkmate: Story = {
  args: {
    stats: checkmate as any,
  },
}

export default meta
