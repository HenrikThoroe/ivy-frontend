import type { Meta, StoryObj } from '@storybook/react'
import UserInfoCard from './UserInfoCard'

const meta: Meta<typeof UserInfoCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/User',
  component: UserInfoCard,
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

type Story = StoryObj<typeof UserInfoCard>

export const Plain: Story = {
  args: {
    name: 'Username',
    email: 'test@example.com',
    role: 'Visitor',
  },
}

export default meta
