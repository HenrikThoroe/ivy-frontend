import { shared } from '@ivy-chess/api-schema'
import type { Meta, StoryObj } from '@storybook/react'
import replay from '../../../assets/data/sample_replay.json'
import logs from '../../../assets/data/sample_replay_logs.json'
import stats from '../../../assets/data/sample_replay_stats.json'
import ReplayView from './ReplayView'

const meta: Meta<typeof ReplayView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Replay Info',
  component: ReplayView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof ReplayView>

export const Plain: Story = {
  args: {
    replay: shared.replay.replaySchema.parse(replay),
    stats: shared.replay.replayStatsSchema.parse(stats),
    logs: shared.replay.replayLogSchema.parse(logs),
  },
}

export const NoLogs: Story = {
  args: {
    replay: shared.replay.replaySchema.parse(replay),
    stats: shared.replay.replayStatsSchema.parse(stats),
  },
}

export default meta
