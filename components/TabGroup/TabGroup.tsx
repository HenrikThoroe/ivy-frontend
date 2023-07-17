'use client'

import classNames from 'classnames'
import { useState } from 'react'

interface Tab {
  label: string
  component: React.ReactNode
}

interface Props {
  tabs: Tab[]
}

export default function TabGroup(props: Props) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-row justify-center">
        {props.tabs.map((tab, idx) => (
          <button
            onClick={() => setSelected(idx)}
            className={classNames(
              'min-w-[10rem] border-y-2 p-4 text-base text-on-primary first:rounded-l-lg first:border-l-2 last:rounded-r-lg last:border-r-2',
              {
                '!border-0 bg-action-primary-active font-bold text-on-secondary': selected === idx,
              }
            )}
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
