'use client'

import Icon from '@/components/Icon/Icon'

interface Props<T> {
  /**
   * The label of the list.
   * Should describe the category of the managed
   * items.
   */
  label: string

  /**
   * The list of items currently displayed.
   * The state of this list is managed by the parent.
   */
  items: T[]

  /**
   * Called when the user clicks the add button.
   */
  onAdd: () => void

  /**
   * Called for the given item when the user
   * clicks the remove button.
   *
   * To distinguish between items, the parent should
   * be able to compare them by reference or value if unique.
   */
  onRemove: (item: T) => void

  /**
   * Formats the given item for display.
   *
   * The returned JSX should be short, distinguisable
   * and not too complex.
   */
  format: (item: T) => React.ReactNode
}

/**
 * A styled, type-safe list input field.
 *
 * The state of the list is managed by the parent.
 * The `ListInput` will use callbacks to request removal
 * of items and to add new items.
 *
 * A `ListInput` is best used for multi-value selections,
 * when each selection requires some complexity to fetch / create / etc,
 * that is not suitable for a simple checkbox-style input.
 *
 * For example a user might create multiple items for a shopping cart.
 * Those items require the user each time to interact with the app and cannot be
 * provided as a simple list of checkboxes.
 */
export default function ListInput<T>(props: Props<T>) {
  const { label, items, onAdd, onRemove, format } = props

  //* UI

  const Item = ({ item }: { item: T }) => (
    <li className="flex flex-row items-center justify-between">
      <div className="text-base font-light">{format(item)}</div>
      <button
        type="button"
        onClick={() => onRemove(item)}
        className="font-base flex items-center justify-center rounded-lg bg-action-destructive p-1 text-on-secondary opacity-80 hover:bg-action-destructive-active hover:opacity-100"
      >
        <Icon name="remove" />
      </button>
    </li>
  )

  const AddButton = () => (
    <button
      type="button"
      onClick={onAdd}
      className="font-base flex items-center justify-center rounded-lg bg-action-primary p-1 text-on-secondary hover:bg-action-primary-active"
    >
      <Icon name="add" />
    </button>
  )

  //* Render

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row items-center justify-between border-b-2 pb-2">
        <span className="text-base">{label}</span>
        <AddButton />
      </div>
      <ul className="flex flex-col gap-2 pl-2">
        {items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  )
}
