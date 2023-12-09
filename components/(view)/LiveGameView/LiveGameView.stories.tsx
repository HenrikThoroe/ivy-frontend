import { create } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import LiveGameView from './LiveGameView'

const meta: Meta<typeof LiveGameView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Live Game',
  component: LiveGameView,
}

type Story = StoryObj<typeof LiveGameView>

export const Spectating: Story = {
  args: {
    data: {
      id: '0000-0000-00-0000',
      isActive: true,
      players: {
        white: {
          color: 'white',
          id: '0000-0000-00-0000',
          type: 'human',
          connected: false,
        },
        black: {
          color: 'black',
          id: '0000-0000-00-0001',
          type: 'human',
          connected: false,
        },
      },
      events: [{ type: 'create', message: 'Game created', timestamp: Date.now() }],
      game: create({ timeback: 0, timeout: Infinity }),
    },
  },
}

export const Connected: Story = {
  args: {
    data: {
      id: '0000-0000-00-0000',
      isActive: true,
      players: {
        white: {
          color: 'white',
          id: '0000-0000-00-0000',
          type: 'human',
          connected: true,
        },
        black: {
          color: 'black',
          id: '0000-0000-00-0001',
          type: 'human',
          connected: false,
        },
      },
      events: [
        { type: 'create', message: 'Game created', timestamp: Date.now() },
        {
          type: 'connect',
          message: 'Client with id "0000-0000-00-0000" connected',
          timestamp: Date.now() + 1000,
        },
      ],
      game: create({ timeback: 0, timeout: Infinity }),
    },
  },
}

export default meta
