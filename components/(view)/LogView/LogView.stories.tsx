import { shared } from '@ivy-chess/api-schema'
import type { Meta, StoryObj } from '@storybook/react'
import logs from '../../../assets/data/sample_replay_logs.json'
import LogView from './LogView'

const meta: Meta<typeof LogView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Logs',
  component: LogView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof LogView>

export const Plain: Story = {
  args: {
    logs: shared.replay.replayLogSchema.parse(logs).white,
  },
}

export default meta
