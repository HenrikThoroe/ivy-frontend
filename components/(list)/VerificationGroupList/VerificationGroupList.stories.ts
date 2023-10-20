import { EngineTestConfig, VerificationGroup } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import VerificationGroupList from './VerificationGroupList'

const meta: Meta<typeof VerificationGroupList> = {
  tags: ['autodocs'],
  title: 'Components/Lists/Verification Group List',
  component: VerificationGroupList,
}

type Story = StoryObj<typeof VerificationGroupList>

const engine: EngineTestConfig = {
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
}

const samples: VerificationGroup[] = [
  {
    id: '1',
    name: 'Group 1',
    threshold: 1,
    base: engine,
    nodes: [engine],
  },
  {
    id: '2',
    name: 'Group 2',
    threshold: 1,
    base: engine,
    nodes: [engine],
  },
  {
    id: '3',
    name: 'Group 3',
    threshold: 1,
    base: engine,
    nodes: [engine],
  },
  {
    id: '4',
    name: 'Group 4',
    threshold: 1,
    base: engine,
    nodes: [engine],
  },
]

export const Primary: Story = {
  args: {
    groups: samples,
  },
}

export default meta
