import type { Meta, StoryObj } from '@storybook/react'
import Navbar from './Navbar'

const content = (length: number) => Array.from({ length }, () => 'Hi, Mom!').join(' ')

const meta: Meta<typeof Navbar> = {
  tags: ['autodocs'],
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  decorators: [
    (Story) => (
      <div className="h-[50vh] w-full overflow-y-scroll">
        <div className="flex w-full flex-col items-start justify-start bg-primary p-2">
          <Story />
          <div className="h-full w-full p-14 pb-48">
            <h1 className="text-2xl font-medium text-on-primary">{content(1)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(2)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(3)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(4)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(5)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(6)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(7)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(8)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(7)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(6)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(5)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(4)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(3)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(2)}</h1>
            <h1 className="text-2xl font-medium text-on-primary">{content(1)}</h1>
          </div>
        </div>
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Navbar>

export const Primary: Story = {
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

export const WithNestedRoute: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['devices', 'workstation', 'specs'],
        pathname: '/devices/workstation/specs',
      },
    },
  },
  args: {},
}

export default meta
