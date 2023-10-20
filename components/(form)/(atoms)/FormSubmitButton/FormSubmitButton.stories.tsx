import type { Meta, StoryObj } from '@storybook/react'
import FormSubmitButton from './FormSubmitButton'

const meta: Meta<typeof FormSubmitButton> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/Submit Button',
  component: FormSubmitButton,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '20rem' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

type Story = StoryObj<typeof FormSubmitButton>

export const Plain: Story = {
  args: {
    children: 'Submit',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
  },
}

export default meta
