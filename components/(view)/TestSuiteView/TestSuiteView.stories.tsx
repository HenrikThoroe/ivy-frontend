import { EngineTestConfig, TestSuite } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import TestSuiteView from './TestSuiteView'

const meta: Meta<typeof TestSuiteView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Test Suite Info',
  component: TestSuiteView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

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
      major: 2,
      minor: 3,
      patch: 1,
    },
    options: {
      hash: 7176,
      threads: 32,
    },
    timeControl: {
      type: 'movetime' as const,
      value: 10000,
    },
  },
]

const sample: TestSuite = {
  engines,
  id: '1',
  iterations: 92998282,
  name: 'Test Case 1',
}

type Story = StoryObj<typeof TestSuiteView>

export const Plain: Story = {
  args: {
    suite: sample,
  },
}

export default meta
