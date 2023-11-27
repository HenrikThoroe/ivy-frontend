import type { Meta, StoryObj } from '@storybook/react'
import CreateGameForm from './CreateGameForm'

const meta: Meta<typeof CreateGameForm> = {
  tags: ['autodocs'],
  title: 'Components/Form/Create Game',
  component: CreateGameForm,
}

type Story = StoryObj<typeof CreateGameForm>

export const Primary: Story = {
  args: {},
}

export default meta
