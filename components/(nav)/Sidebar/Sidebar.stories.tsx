import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  tags: ['autodocs'],
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <div className="flex h-screen w-full flex-row items-start justify-start border bg-primary p-2">
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {},
}

export const WithActiveRoute: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['devices'],
        pathname: '/devices',
      },
    },
  },
  args: {},
}

export default meta
