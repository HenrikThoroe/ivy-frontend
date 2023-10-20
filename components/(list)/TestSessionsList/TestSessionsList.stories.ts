import { TestSession } from '@/lib/api/clients/TestSessionClient'
import { EngineTestConfig, TestSuite } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import TestSessionsList from './TestSessionsList'

const meta: Meta<typeof TestSessionsList> = {
  tags: ['autodocs'],
  title: 'Components/Lists/Test Session List',
  component: TestSessionsList,
}

type Story = StoryObj<typeof TestSessionsList>

const engines: [EngineTestConfig, EngineTestConfig] = [
  {
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
  {
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
]

const suite: TestSuite = {
  engines,
  id: '1',
  iterations: 100,
  name: 'Sample Test Case',
}

const samples: TestSession[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((i) => ({
  id: `${i}`,
  remaining: i,
  suite,
}))

export const Primary: Story = {
  args: {
    sessions: samples,
  },
}

export default meta
