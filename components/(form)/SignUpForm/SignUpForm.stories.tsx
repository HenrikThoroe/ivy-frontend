import type { Meta, StoryObj } from '@storybook/react'
import SignUpForm from './SignUpForm'

const meta: Meta<typeof SignUpForm> = {
  tags: ['autodocs'],
  title: 'Components/Form/Sign Up',
  component: SignUpForm,
}

type Story = StoryObj<typeof SignUpForm>

export const Primary: Story = {
  args: {},
}

export default meta
