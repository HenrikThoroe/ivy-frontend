import classNames from 'classnames'

export type LayoutVariant = 'custom-1' | 'custom-2'

interface Props {
  variant: LayoutVariant
  head: React.ReactNode[]
  children: React.ReactNode
}

export default function List(props: Props) {
  return (
    <div className="flex flex-col text-on-primary">
      <div
        className={classNames('grid w-full justify-start gap-x-6 px-2 py-4 font-semibold', {
          'grid-cols-custom-1': props.variant === 'custom-1',
          'grid-cols-custom-2': props.variant === 'custom-2',
        })}
      >
        {props.head.map((head) => (
          <span>{head}</span>
        ))}
      </div>
      {props.children}
    </div>
  )
}
