import Icon from '../Icon/Icon'
import { EngineTestConfig } from '@ivy-chess/model'

interface Props {
  engine: EngineTestConfig
  alias: number | string
  onDelete?: () => void
}

export default function EngineConfigCard(props: Props) {
  const Section = (props: { label: string; values: string[] }) => (
    <div className="flex flex-col gap-2">
      <span className="text-base font-medium text-on-primary">{props.label}</span>
      <ul className="pl-2 text-base font-normal text-on-primary">
        {props.values.map((value) => (
          <li>• {value}</li>
        ))}
      </ul>
    </div>
  )

  const DeleteButton = () => (
    <button
      onClick={props.onDelete}
      className="absolute right-0 top-0 flex items-center justify-center rounded-full p-2 text-action-destructive hover:text-action-destructive-active"
    >
      <Icon name="delete" />
    </button>
  )

  return (
    <div className="relative flex w-max min-w-[20rem] flex-col gap-4 rounded-lg border-2 px-6 py-4">
      {props.onDelete && <DeleteButton />}
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <span className="text-base font-bold text-on-primary">{props.engine.name}</span>
        <span className="text-base font-light text-on-primary">
          {[
            props.engine.version.major,
            props.engine.version.minor,
            props.engine.version.patch,
          ].join('.')}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <span className="text-base font-medium text-on-primary">Alias:</span>
        <span className="text-base font-normal text-on-primary">
          {typeof props.alias === 'number' ? `Node ${props.alias}` : props.alias}
        </span>
      </div>
      <Section
        label="Time Control"
        values={[`${props.engine.timeControl.value} (${props.engine.timeControl.type})`]}
      />
      <Section
        label="Options"
        values={[
          `${props.engine.options.threads} Thread${props.engine.options.threads > 1 ? 's' : ''}`,
          `${props.engine.options.hash} MB Hash`,
        ]}
      />
    </div>
  )
}
