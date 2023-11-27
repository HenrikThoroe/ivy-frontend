import classNames from 'classnames'

interface Props {
  /**
   * The color of the dot.
   */
  color: 'red' | 'green' | 'yellow'

  /**
   * The label of the dot.
   * Use a short expressive word or phrase.
   * The expressed state should be undestandable without the label.
   */
  label: string

  /**
   * The side on which the dot is placed.
   *
   * @default 'left'
   */
  direction?: 'left' | 'right'
}

/**
 * A dot that represents a state.
 * The dot is colored and labeled.
 */
export default function StateDot(props: Props) {
  const { color, label, direction } = props

  return (
    <div className="flex items-center">
      {direction !== 'left' && <span className="pr-4 text-base font-medium">{label}</span>}
      <div
        className={classNames(
          'relative h-3 w-3 rounded-full p-1',
          'after:absolute after:-left-1 after:-top-1 after:h-5 after:w-5 after:rounded-full after:border-2',
          {
            'bg-red-500 after:border-red-500': color === 'red',
            'bg-green-500 after:border-green-500': color === 'green',
            'bg-yellow-500 after:border-yellow-500': color === 'yellow',
          }
        )}
      />
      {direction === 'left' && <span className="pl-4 text-base font-medium">{label}</span>}
    </div>
  )
}
