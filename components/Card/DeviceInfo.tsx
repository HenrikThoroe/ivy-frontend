import classNames from 'classnames'

interface Props {
  label: string
  value: string
  size?: 'md' | 'lg'
  children: React.ReactNode
}

export default function DeviceInfoCard(props: Props) {
  return (
    <div
      className={classNames(
        'flex flex-col items-start justify-start gap-5 rounded-lg bg-primary p-4 shadow-defined',
        {
          'h-[24rem] w-[27rem]': props.size === 'md' || !props.size,
          'h-[24rem] w-[38rem]': props.size === 'lg',
        }
      )}
    >
      <div className="flex flex-col gap-2 text-on-primary">
        <span className="font-sm text-base font-light">{props.label}</span>
        <span className="text-base font-semibold">{props.value}</span>
      </div>
      {props.children}
    </div>
  )
}
