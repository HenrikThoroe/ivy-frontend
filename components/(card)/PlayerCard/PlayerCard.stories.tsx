import type { Meta, StoryObj } from '@storybook/react'
import PlayerCard from './PlayerCard'

const meta: Meta<typeof PlayerCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Player',
  component: PlayerCard,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          height: '20rem',
          padding: '2rem',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof PlayerCard>

export const HumanDisconnected: Story = {
  args: {
    isConnected: false,
    canConnect: true,
    player: {
      id: '1234',
      color: 'white',
      connected: true,
      type: 'human',
    },
  },
}

export const HumanConnected: Story = {
  args: {
    isConnected: true,
    canConnect: true,
    player: {
      id: '1234',
      color: 'white',
      connected: true,
      type: 'human',
    },
  },
}

export const HumanDisplayOnly: Story = {
  args: {
    isConnected: true,
    canConnect: false,
    player: {
      id: '1234-5678-9012-3456',
      color: 'white',
      connected: true,
      type: 'human',
    },
  },
}

export const Engine: Story = {
  args: {
    isConnected: false,
    canConnect: false,
    player: {
      id: '1234-5678-9012-3456',
      color: 'white',
      connected: true,
      type: 'engine',
    },
  },
}

export default meta
