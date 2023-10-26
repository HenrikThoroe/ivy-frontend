import type { Meta, StoryObj } from '@storybook/react'
import NoContentView from './NoContentView'

const meta: Meta<typeof NoContentView> = {
  tags: ['autodocs'],
  title: 'Components/Views/No Content',
  component: NoContentView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof NoContentView>

export const Plain: Story = {
  args: {
    title: 'No Content',
    message: 'There is no content to display.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No Content',
    message: 'There is no content to display.',
    action: {
      href: '#',
      label: 'Add Content',
      icon: 'add',
    },
  },
}

export default meta
