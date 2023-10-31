import { formatMemSize } from '@/lib/util/format'
import { EngineTestConfig, encodeVersion } from '@ivy-chess/model'
import classNames from 'classnames'

interface Props {
  /**
   * Engine test configuration
   */
  engine: EngineTestConfig

  /**
   * The size of the hero text aka the engine name.
   *
   * @default "lg"
   */
  textSize?: 'md' | 'lg'
}

/**
 * A card to display information about an engine test configuration.
 */
export default function EngineTestConfigCard({ engine, textSize }: Props) {
  //* UI

  const Entry = ({ label, value }: { label: string; value: string }) => {
    return (
      <div className="flex w-full flex-col gap-2">
        <span className="text-sm font-medium text-on-primary-light">{label}</span>
        <span className="pl-2 text-base font-bold text-on-primary">{value}</span>
      </div>
    )
  }
  //* Render

  return (
    <section className="flex w-max min-w-[20rem] flex-col items-center justify-center gap-8 rounded-md px-8 py-6 shadow-card">
      <span
        className={classNames(
          'bg-gradient-to-br from-indigo-300 to-sky-600 bg-clip-text font-extrabold text-transparent',
          {
            'text-4xl': textSize === 'lg' || !textSize,
            'text-2xl': textSize === 'md',
          }
        )}
      >
        {engine.name}
      </span>
      <div className="flex w-full flex-col gap-6">
        <Entry label="Version" value={encodeVersion(engine.version, false)} />
        <Entry label="Threads" value={engine.options.threads.toString()} />
        <Entry label="Hash Size" value={formatMemSize(engine.options.hash * 1000 * 1000, 0)} />
        <Entry label="Time Control" value={engine.timeControl.type} />
        <Entry label="Control Value" value={engine.timeControl.value.toString()} />
      </div>
    </section>
  )
}
