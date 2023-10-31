import { EngineTestConfig } from '@ivy-chess/model'
import type { Meta, StoryObj } from '@storybook/react'
import EngineGalleryView from './EngineGalleryView'

const meta: Meta<typeof EngineGalleryView> = {
  tags: ['autodocs'],
  title: 'Components/Views/Engine Gallery',
  component: EngineGalleryView,
}

const engine: EngineTestConfig = {
  name: 'Bar',
  version: {
    major: 2,
    minor: 3,
    patch: 1,
  },
  options: {
    hash: 7176,
    threads: 32,
  },
  timeControl: {
    type: 'movetime' as const,
    value: 10000,
  },
}

type Story = StoryObj<typeof EngineGalleryView>

export const MultipleNodes: Story = {
  args: {
    base: engine,
    nodes: [engine, engine, engine],
  },
}

export const BaseOnly: Story = {
  args: {
    base: engine,
    nodes: [],
  },
}

export const OneNode: Story = {
  args: {
    base: engine,
    nodes: [engine],
  },
}

export default meta
