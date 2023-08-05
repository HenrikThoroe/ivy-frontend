'use client'

import Icon from '@/components/Icon/Icon'

interface Props<T> {
  label: string
  items: T[]
  onAdd: () => void
  onRemove: (item: T) => void
  format: (item: T) => React.ReactNode
}

export default function ListInput<T>(props: Props<T>) {
  const { label, items, onAdd, onRemove, format } = props

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row items-center justify-between border-b-2 pb-2">
        <span className="text-base">{label}</span>
        <button
          type="button"
          onClick={onAdd}
          className="font-base flex items-center justify-center rounded-lg bg-action-primary p-1 text-on-secondary hover:bg-action-primary-active"
        >
          <Icon name="add" />
        </button>
      </div>
      <ul className="flex flex-col gap-2 pl-2">
        {items.map((item) => (
          <li className="flex flex-row items-center justify-between">
            <div className="text-base font-light">{format(item)}</div>
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="font-base flex items-center justify-center rounded-lg bg-action-destructive p-1 text-on-secondary hover:bg-action-destructive-active"
            >
              <Icon name="remove" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
