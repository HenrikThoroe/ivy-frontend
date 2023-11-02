import type { Meta, StoryObj } from '@storybook/react'
import SignInForm from './SignInForm'

const meta: Meta<typeof SignInForm> = {
  tags: ['autodocs'],
  title: 'Components/Form/Sign In',
  component: SignInForm,
}

type Story = StoryObj<typeof SignInForm>

export const Primary: Story = {
  args: {},
}

export default meta
