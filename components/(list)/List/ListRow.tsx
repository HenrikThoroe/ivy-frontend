import classNames from 'classnames'
import React from 'react'
import { LayoutVariant, translateLayoutVariant } from './translateLayoutVariant'

interface Props {
  variant: LayoutVariant
  children: React.ReactNode
}

/**
 * A row element for a `List`.
 */
export default function ListRow(props: Props) {
  return (
    <div
      className={classNames(
        'grid w-full items-center justify-start gap-x-6 rounded-md px-2 py-4 even:bg-primary-accent',
        translateLayoutVariant(props.variant)
      )}
    >
      {React.Children.map(props.children, (child) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{child}</div>
      ))}
    </div>
  )
}
