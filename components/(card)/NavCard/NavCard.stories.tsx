import type { Meta, StoryObj } from '@storybook/react'
import NavCard from './NavCard'

const meta: Meta<typeof NavCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Navigation',
  component: NavCard,
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

type Story = StoryObj<typeof NavCard>

export const Plain: Story = {
  args: {
    label: 'Hi Mom!',
    href: '#',
    description: 'Description for the navigation card. This is a test.',
  },
}

export default meta
