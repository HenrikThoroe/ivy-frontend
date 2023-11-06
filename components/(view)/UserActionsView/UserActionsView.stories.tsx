import type { Meta, StoryObj } from '@storybook/react'
import UserActionsView from './UserActionsView'

const meta: Meta<typeof UserActionsView> = {
  tags: ['autodocs'],
  title: 'Components/Views/User Actions',
  component: UserActionsView,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          height: '20rem',
          padding: '2rem',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof UserActionsView>

export const Plain: Story = {
  args: {},
}

export default meta
