import type { Meta, StoryFn } from '@storybook/react'
import Section from './Section'
import SectionedView from './SectionedView'

const meta: Meta<typeof SectionedView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Sections',
  component: SectionedView,
}

type Story = StoryFn<typeof SectionedView>

export const Plain: Story = () => {
  return (
    <SectionedView>
      <Section title="Foo">
        <span>Some Content...</span>
      </Section>
      <Section title="Bar">
        <span>Some Content...</span>
      </Section>
      <Section title="Baz">
        <span>Some Content...</span>
      </Section>
    </SectionedView>
  )
}

export const WithAction: Story = () => {
  return (
    <SectionedView>
      <Section
        title="Foo"
        action={<button className="rounded-md bg-slate-500 p-2 text-on-secondary">Action</button>}
      >
        <span>Some Content...</span>
      </Section>
      <Section
        title="Bar"
        action={
          <button className="rounded-md bg-red-800 p-2 text-on-secondary">Other Action</button>
        }
      >
        <span>Some Content...</span>
      </Section>
      <Section title="Baz">
        <span>Some Content...</span>
      </Section>
    </SectionedView>
  )
}

export default meta
