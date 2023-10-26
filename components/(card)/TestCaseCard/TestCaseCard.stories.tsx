import type { Meta, StoryObj } from '@storybook/react'
import TestCaseCard from './TestCaseCard'

const meta: Meta<typeof TestCaseCard> = {
  tags: ['autodocs'],
  title: 'Components/Card/Test Case',
  component: TestCaseCard,
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

type Story = StoryObj<typeof TestCaseCard>

export const Plain: Story = {
  args: {
    suites: 42,
  },
}

export default meta
