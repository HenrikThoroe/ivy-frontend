import { Replay } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import ReplayList from './ReplayList'

const meta: Meta<typeof ReplayList> = {
  tags: ['autodocs'],
  title: 'Components/Lists/Replay List',
  component: ReplayList,
}

type Story = StoryObj<typeof ReplayList>

const engines = {
  black: {
    name: 'Foo',
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
    options: {
      hash: 128,
      threads: 4,
    },
    timeControl: {
      type: 'movetime' as const,
      value: 100,
    },
  },
  white: {
    name: 'Bar',
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
    options: {
      hash: 128,
      threads: 4,
    },
    timeControl: {
      type: 'movetime' as const,
      value: 100,
    },
  },
}

const sample: Replay[] = [
  {
    engines,
    date: new Date(),
    driver: {
      hardware: {},
      id: '1',
      name: 'Driver 1',
    },
    id: '1',
    result: {
      reason: '3-fold-repetition',
      winner: 'white',
    },
    history: [],
  },
  {
    engines,
    date: new Date(),
    driver: {
      hardware: {},
      id: '1',
      name: 'Driver 1',
    },
    id: '1',
    result: {
      reason: '3-fold-repetition',
      winner: 'white',
    },
    history: [],
  },
  {
    engines,
    date: new Date(),
    driver: {
      hardware: {},
      id: '1',
      name: 'Driver 1',
    },
    id: '1',
    result: {
      reason: '3-fold-repetition',
      winner: 'draw',
    },
    history: [],
  },
  {
    engines,
    date: new Date(),
    driver: {
      hardware: {},
      id: '1',
      name: 'Driver 1',
    },
    id: '1',
    result: {
      reason: '3-fold-repetition',
      winner: 'black',
    },
    history: [],
  },
]

export const Primary: Story = {
  args: {
    replays: sample,
  },
}

export default meta
