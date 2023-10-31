import { EngineTestConfig } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import EngineTestConfigCard from './EngineTestConfigCard'

const meta: Meta<typeof EngineTestConfigCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Engine Test Config',
  component: EngineTestConfigCard,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

const engine: EngineTestConfig = {
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
}

type Story = StoryObj<typeof EngineTestConfigCard>

export const Plain: Story = {
  args: {
    engine,
  },
}

export const SmallerText: Story = {
  args: {
    engine,
    textSize: 'md',
  },
}

export default meta
