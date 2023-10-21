import { EngineConfig } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import Form from '../../(atoms)/Form/Form'
import EngineConfigForm from './EngineConfigForm'

const meta: Meta<typeof EngineConfigForm> = {
  tags: ['autodocs'],
  title: 'Components/Form/Compositions/Engine Test Config Form',
  component: EngineConfigForm,
  decorators: [
    (Story) => (
      <Form>
        <Story />
      </Form>
    ),
  ],
}

type Story = StoryObj<typeof EngineConfigForm>

const sample: EngineConfig = {
  name: 'Test 1',
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

export const Primary: Story = {
  args: {
    configs: [sample, { ...sample, name: 'Test 2' }],
  },
}

export default meta
