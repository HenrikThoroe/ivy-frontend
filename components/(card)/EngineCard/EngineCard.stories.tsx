import { EngineConfig } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import EngineCard from './EngineCard'

const meta: Meta<typeof EngineCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Engine',
  component: EngineCard,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

const sample: EngineConfig = {
  name: 'Stockfish',
  variations: [
    {
      version: {
        major: 1,
        minor: 0,
        patch: 0,
      },
      flavours: [
        {
          arch: 'amd64',
          os: 'linux',
          capabilities: [],
          id: '1',
        },
        {
          arch: 'arm64',
          os: 'linux',
          capabilities: [],
          id: '2',
        },
        {
          arch: 'arm64',
          os: 'linux',
          capabilities: ['ASIMD', 'FMA'],
          id: '3',
        },
      ],
    },
    {
      version: {
        major: 2,
        minor: 0,
        patch: 1,
      },
      flavours: [
        {
          arch: 'amd64',
          os: 'windows',
          capabilities: ['AVX2', 'AVX512F', 'SSE4_1', 'SSE4_2'],
          id: '4',
        },
        {
          arch: 'arm64',
          os: 'linux',
          capabilities: [],
          id: '5',
        },
        {
          arch: 'arm64',
          os: 'darwin',
          capabilities: ['ASIMD', 'FMA'],
          id: '6',
        },
      ],
    },
  ],
}

type Story = StoryObj<typeof EngineCard>

export const Plain: Story = {
  args: {
    engine: sample,
    variant: 'primary',
  },
}

export const GlassVariant: Story = {
  args: {
    engine: sample,
    variant: 'glass',
  },
}

export const ContrastVariant: Story = {
  args: {
    engine: sample,
    variant: 'contrast',
  },
}

export const WithLongName: Story = {
  args: {
    engine: {
      ...sample,
      name: 'Way-Too-Long-Engine-Name-That-Should-Overflow-The-Parent-Container',
    },
    variant: 'primary',
  },
}

export const WithShortName: Story = {
  args: {
    engine: { ...sample, name: 'A' },
    variant: 'primary',
  },
}

export const WithEmptyEngine: Story = {
  args: {
    engine: { name: 'Empty', variations: [] },
    variant: 'primary',
  },
}

export default meta
