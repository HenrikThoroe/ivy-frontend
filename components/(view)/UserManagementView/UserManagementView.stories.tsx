import type { Meta, StoryObj } from '@storybook/react'
import UserManagementView from './UserManagementView'

const meta: Meta<typeof UserManagementView> = {
  tags: ['autodocs'],
  title: 'Components/Views/User Management',
  component: UserManagementView,
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

type Story = StoryObj<typeof UserManagementView>

export const Plain: Story = {
  args: {},
}

export default meta
