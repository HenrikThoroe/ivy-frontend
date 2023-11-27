import type { Meta, StoryObj } from '@storybook/react'
import PlayerConfigForm from './PlayerConfigForm'

const meta: Meta<typeof PlayerConfigForm> = {
  tags: ['autodocs'],
  title: 'Components/Form/Compositions/Player Config Form',
  component: PlayerConfigForm,
}

type Story = StoryObj<typeof PlayerConfigForm>

export const Primary: Story = {
  args: {
    default: { type: 'human' },
    onChange: () => {},
  },
}

export default meta
