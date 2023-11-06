import { UserData } from '@/lib/api/clients/AuthClient'
import type { Meta, StoryObj } from '@storybook/react'
import UserList from './UserList'

const meta: Meta<typeof UserList> = {
  tags: ['autodocs'],
  title: 'Components/Lists/User List',
  component: UserList,
}

type Story = StoryObj<typeof UserList>

const users: UserData[] = [
  { name: 'John Doe', email: 'john.doe@example.com', role: 'manager', id: '1' },
  { name: 'J. Doe', email: 'john.doe@example.com', role: 'manager', id: '2' },
  { name: 'John D.', email: 'john.doe@example.com', role: 'contributor', id: '3' },
  { name: 'Mr. Doe', email: 'john.doe@example.com', role: 'contributor', id: '4' },
  { name: 'J. D.', email: 'john.doe@example.com', role: 'contributor', id: '5' },
  { name: 'JD', email: 'john.doe@example.com', role: 'visitor', id: '6' },
  { name: 'Johny', email: 'john.doe@example.com', role: 'visitor', id: '7' },
  { name: 'D', email: 'john.doe@example.com', role: 'visitor', id: '8' },
]

export const Primary: Story = {
  args: {
    users,
    onDelete: () => {},
    onUpdate: () => {},
  },
}

export default meta
