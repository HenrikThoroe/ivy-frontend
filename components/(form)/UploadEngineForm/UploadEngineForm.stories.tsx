import type { Meta, StoryObj } from '@storybook/react'
import UploadEngineForm from './UploadEngineForm'

const meta: Meta<typeof UploadEngineForm> = {
  tags: ['autodocs'],
  title: 'Components/Form/Upload Engine Form',
  component: UploadEngineForm,
}

type Story = StoryObj<typeof UploadEngineForm>

export const Primary: Story = {
  args: {},
}

export default meta
