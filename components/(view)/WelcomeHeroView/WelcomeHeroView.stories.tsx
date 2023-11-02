import type { Meta, StoryObj } from '@storybook/react'
import WelcomeHeroView from './WelcomeHeroView'

const meta: Meta<typeof WelcomeHeroView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Welcome',
  component: WelcomeHeroView,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof WelcomeHeroView>

export const Plain: Story = {
  args: {
    prompt: 'Hi Mom! Look, I am on the internet!',
  },
}

export default meta
