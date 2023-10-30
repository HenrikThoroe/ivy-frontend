import type { Meta, StoryObj } from '@storybook/react'
import TabView from './TabView'

const meta: Meta<typeof TabView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Tabs',
  component: TabView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof TabView>

export const Plain: Story = {
  args: {
    tabs: [
      {
        label: 'Tab 1',
        component: <div>Tab 1</div>,
      },
      {
        label: 'Tab 2',
        component: <div>Tab 2</div>,
      },
      {
        label: 'Tab 3',
        component: <div>Tab 3</div>,
      },
    ],
  },
}

export default meta
