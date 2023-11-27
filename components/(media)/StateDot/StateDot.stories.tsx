import type { Meta, StoryObj } from '@storybook/react'
import StateDot from './StateDot'

const meta: Meta<typeof StateDot> = {
  tags: ['autodocs'],
  title: 'Components/Media/State Dot',
  component: StateDot,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          padding: '2rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof StateDot>

export const Green: Story = {
  args: {
    color: 'green',
    label: 'Online',
    direction: 'left',
  },
}

export const Yellow: Story = {
  args: {
    color: 'yellow',
    label: 'Waiting',
    direction: 'left',
  },
}

export const Red: Story = {
  args: {
    color: 'red',
    label: 'Offline',
    direction: 'left',
  },
}

export const Reversed: Story = {
  args: {
    color: 'green',
    label: 'Online',
    direction: 'right',
  },
}

export default meta
