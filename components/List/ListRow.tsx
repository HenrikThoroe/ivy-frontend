import React from 'react'
import { LayoutVariant } from './List'
import classNames from 'classnames'

interface Props {
  variant: LayoutVariant
  children: React.ReactNode
}

export default function ListRow(props: Props) {
  return (
    <div
      className={classNames(
        'grid w-full items-center justify-start gap-x-6 rounded-md px-2 py-4 even:bg-primary-accent',
        {
          'grid-cols-custom-1': props.variant === 'custom-1',
          'grid-cols-custom-2': props.variant === 'custom-2',
          'grid-cols-custom-3': props.variant === 'custom-3',
          'grid-cols-custom-4': props.variant === 'custom-4',
          'grid-cols-custom-5': props.variant === 'custom-5',
        }
      )}
    >
      {React.Children.map(props.children, (child) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{child}</div>
      ))}
    </div>
  )
}
