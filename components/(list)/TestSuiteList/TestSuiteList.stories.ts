import { EngineTestConfig, TestSuite } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import TestSuiteList from './TestSuiteList'

const meta: Meta<typeof TestSuiteList> = {
  tags: ['autodocs'],
  title: 'Components/Lists/Test Suite List',
  component: TestSuiteList,
}

type Story = StoryObj<typeof TestSuiteList>

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

const samples: TestSuite[] = [
  {
    engines,
    id: '1',
    iterations: 1,
    name: 'Test Case 1',
  },
  {
    engines,
    id: '2',
    iterations: 9992,
    name: 'Test Case 2',
  },
  {
    engines,
    id: '3',
    iterations: 542615465,
    name: 'Test Case 3',
  },
  {
    engines,
    id: '4',
    iterations: 201,
    name: 'Way too long name for a single test case that should be truncated',
  },
]

export const Primary: Story = {
  args: {
    suites: samples,
  },
}

export default meta
