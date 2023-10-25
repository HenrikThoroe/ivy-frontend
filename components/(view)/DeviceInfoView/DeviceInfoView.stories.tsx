import type { Meta, StoryObj } from '@storybook/react'
import DeviceInfoView from './DeviceInfoView'

const meta: Meta<typeof DeviceInfoView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Device Info',
  component: DeviceInfoView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof DeviceInfoView>

export const Plain: Story = {
  args: {
    devices: 102,
    cores: 1024,
    threads: 2048,
    memory: 4096978237823,
  },
}

export default meta
