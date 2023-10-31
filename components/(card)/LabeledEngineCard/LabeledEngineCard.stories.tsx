import { EngineTestConfig } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import LabeledEngineCard from './LabeledEngineCard'

const meta: Meta<typeof LabeledEngineCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Labeled Engine Test Config',
  component: LabeledEngineCard,
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

type Story = StoryObj<typeof LabeledEngineCard>

export const Plain: Story = {
  args: {
    config: engine,
    label: 'Foo',
    onRemove: undefined,
  },
}

export const WithRemoveButton: Story = {
  args: {
    config: engine,
    label: 'Foo',
    onRemove: () => {},
  },
}

export default meta
