import type { Meta, StoryObj } from '@storybook/react'
import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  tags: ['autodocs'],
  title: 'Components/Media/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          padding: '2rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Logo>

export const Plain: Story = {
  args: {},
}

export default meta
