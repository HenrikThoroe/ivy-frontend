import { LiveGame, create } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import GamesList from './GamesList'

const meta: Meta<typeof GamesList> = {
  tags: ['autodocs'],
  title: 'Components/Lists/Games List',
  component: GamesList,
}

type Story = StoryObj<typeof GamesList>

const sample: LiveGame = {
  id: 'sample-uuid-string',
  players: {
    white: {
      color: 'white',
      connected: true,
      id: 'sample-uuid-string',
      type: 'human',
    },
    black: {
      color: 'black',
      connected: true,
      id: 'sample-uuid-string',
      type: 'human',
    },
  },
  events: [],
  isActive: true,
  game: create({ timeback: 0, timeout: 0 }),
}

export const Primary: Story = {
  args: {
    games: [sample, { ...sample, isActive: false }],
  },
}

export default meta
