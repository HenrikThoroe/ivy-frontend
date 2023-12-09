import type { Meta, StoryObj } from '@storybook/react'
import LiveGameEventsView from './LiveGameEventsView'

const meta: Meta<typeof LiveGameEventsView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Game Events',
  component: LiveGameEventsView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof LiveGameEventsView>

export const Plain: Story = {
  args: {
    events: [
      { type: 'create', message: 'Game created', timestamp: Date.now() },
      {
        type: 'connect',
        message: 'Client with id "0000-0000-00-0000" connected',
        timestamp: Date.now() + 1000,
      },
      {
        type: 'connect',
        message: 'Client with id "0000-0000-00-0000" connected',
        timestamp: Date.now() + 2000,
      },
      {
        type: 'message',
        message: 'Client with id "0000-0000-00-0000" sent message "Hello World"',
        timestamp: Date.now() + 3000,
      },
      {
        type: 'message',
        message:
          'Client with id "0000-0000-00-0000" sent message "Way too long message to be displayed in one line"',
        timestamp: Date.now() + 4000,
      },
      {
        type: 'message',
        message: 'Client with id "0000-0000-00-0000" sent message "Hello World"',
        timestamp: Date.now() + 5000,
      },
      {
        type: 'disconnect',
        message: 'Client with id "0000-0000-00-0000" disconnected ',
        timestamp: Date.now() + 6000,
      },
    ],
  },
}

export default meta
