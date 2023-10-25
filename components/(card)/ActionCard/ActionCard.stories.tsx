import type { Meta, StoryObj } from '@storybook/react'
import ActionCard from './ActionCard'

const meta: Meta<typeof ActionCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Action',
  component: ActionCard,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof ActionCard>

export const Plain: Story = {
  args: {
    icon: 'upload',
    title: 'Upload',
    href: '#',
  },
}

export default meta
