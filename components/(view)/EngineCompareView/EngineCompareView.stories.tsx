import {
  EngineConfig,
  EngineTestConfig,
  VerificationGroup,
  VerificationResult,
} from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import EngineCompareView from './EngineCompareView'

const meta: Meta<typeof EngineCompareView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Compare Engines',
  component: EngineCompareView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

const engineConfig: EngineConfig = {
  name: 'Foo',
  variations: [
    {
      version: { major: 1, minor: 0, patch: 0 },
      flavours: [
        {
          id: '000000-0000-0000-0000-000000000000',
          arch: 'x86_64',
          os: 'linux',
          capabilities: ['AVX2'],
        },
      ],
    },
  ],
}

const base: EngineTestConfig = {
  name: 'Foo',
  version: { major: 1, minor: 0, patch: 0 },
  timeControl: { type: 'movetime', value: 200 },
  options: { hash: 512, threads: 6 },
}

const node: EngineTestConfig = {
  name: 'Bar',
  version: { major: 1, minor: 0, patch: 1 },
  timeControl: { type: 'movetime', value: 200 },
  options: { hash: 512, threads: 6 },
}

const group: VerificationGroup = {
  name: 'Group',
  base,
  threshold: 10,
  nodes: [node],
  id: '000000-0000-0000-0000-000000000000',
}

const result: VerificationResult = {
  group: '',
  results: [
    {
      node,
      performance: {
        accumulated: {
          total: 100,
          wins: 50,
          draws: 25,
          defeats: 25,
          winRatio: 0.5,
          win2DefeatRatio: 2,
        },
        white: {
          total: 100,
          wins: 50,
          draws: 25,
          defeats: 25,
          winRatio: 0.5,
          win2DefeatRatio: 2,
        },
        black: {
          total: 100,
          wins: 50,
          draws: 25,
          defeats: 25,
          winRatio: 0.5,
          win2DefeatRatio: 2,
        },
      },
    },
  ],
}

type Story = StoryObj<typeof EngineCompareView>

export const SingleNode: Story = {
  args: {
    group,
    result,
    configs: [engineConfig],
  },
}

export const MultiNode: Story = {
  args: {
    group: { ...group, nodes: [node, node, node] },
    result: { ...result, results: [result.results[0], result.results[0], result.results[0]] },
    configs: [engineConfig],
  },
}

export const WithoutResult: Story = {
  args: {
    group,
    configs: [engineConfig],
  },
}

export default meta
