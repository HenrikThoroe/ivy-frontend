'use client'

import Icon from '../Icon/Icon'
import { useSelectedLayoutSegments } from 'next/navigation'
import SidebarButton from './SidebarButton'

export default function SidebarActions() {
  const segments = useSelectedLayoutSegments()

  return (
    <div className="flex flex-col gap-y-[1.875rem]">
      <SidebarButton
        icon={<Icon name="storage" />}
        text="Engines"
        href="/engines"
        active={segments[0] === 'engines'}
      />
      <SidebarButton
        icon={<Icon name="desktop" />}
        text="Devices"
        href="/devices"
        active={segments[0] === 'devices'}
      />
      <SidebarButton
        icon={<Icon name="play" />}
        text="Training"
        href="/training"
        active={segments[0] === 'training'}
      />
      <SidebarButton
        icon={<Icon name="replay" />}
        text="Replays"
        href="/replays"
        active={segments[0] === 'replays'}
      />
      <SidebarButton
        icon={<Icon name="stats" />}
        text="Statistics"
        href="/stats"
        active={segments[0] === 'stats'}
      />
    </div>
  )
}
