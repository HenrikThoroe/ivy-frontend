'use client'

import classNames from 'classnames'
import { useState } from 'react'

interface Tab {
  label: string
  component: React.ReactNode
}

interface Props {
  /**
   * A list of tabs to choose from.
   *
   * Should not be empty.
   */
  tabs: Tab[]
}

/**
 * A client side tab view component.
 *
 * Takes a list of tabs, each with a label and a component, and
 * allows the user to select which component to view.
 *
 * Displays a tab bar at the top, and the selected component below.
 */
export default function TabView(props: Props) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-max flex-row justify-center gap-2 rounded-full p-2 shadow-inner-card">
        {props.tabs.map((tab, idx) => (
          <button
            onClick={() => setSelected(idx)}
            className={classNames('min-w-[10rem] rounded-full py-1 text-sm font-medium', {
              'bg-slate-200 shadow-sm': selected === idx,
            })}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden">
        {props.tabs[selected].component}
      </div>
    </div>
  )
}
