import { EngineHelper } from '@/lib/data/EngineHelper'
import { resize } from '@/lib/util/array'
import { EngineConfig } from '@ivy-chess/model'
import classNames from 'classnames'

interface Props {
  /**
   * The engine configuration to display.
   */
  engine: EngineConfig

  /**
   * The variant of the card.
   */
  variant: 'primary' | 'contrast' | 'glass'
}

/**
 * A card that displays meta data about an engine.
 * The card presents the name, supported architectures and operating systems
 * and the number of executables.
 *
 * The element is clickable by reacting to hover events.
 * The height is fixed, but the width is flexible with a maximum width of 100%.
 *
 * Supported variants are:
 * - `primary`: A card with a white background and black text.
 * - `contrast`: A card with a black background and white text.
 * - `glass`: A card with a glass-like, colorful background and black text.
 */
export default function EngineCard(props: Props) {
  const helper = new EngineHelper(props.engine)

  //* UI

  const Enumeration = ({ label, values }: { label: string; values: string[] }) => {
    return (
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-light">{label}</span>
        <div className="flex flex-col gap-1">
          {resize(values, 3, '').map((value) => (
            <span
              className="line-clamp-1 h-4 text-xs font-medium"
              key={`engine-card-${label}-${value}`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const Counter = ({ value }: { value: number }) => {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-3xl font-semibold">{value}</span>
        <span className="text-base font-normal">Executables</span>
      </div>
    )
  }

  //* Render

  return (
    <div
      className={classNames('h-max w-max max-w-full rounded-md', {
        'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500': props.variant === 'glass',
      })}
    >
      <section
        className={classNames(
          'relative flex w-full cursor-pointer flex-col gap-5 rounded-md border border-transparent px-10 py-5 shadow-card',
          'hover:border-primary-accent-border hover:shadow-none',
          {
            'bg-sky-950 text-white': props.variant === 'contrast',
            'border bg-white/60 backdrop-blur-3xl': props.variant === 'glass',
          }
        )}
      >
        <div className="flex flex-row items-center gap-11">
          <h2 className="min-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap text-center text-4xl font-extralight tracking-wide">
            {props.engine.name}
          </h2>
          <Counter value={helper.executables.length} />
        </div>
        <div className="flex flex-row items-start justify-center gap-7">
          <Enumeration label="Architecture" values={helper.arch} />
          <Enumeration label="Operating System" values={helper.os} />
        </div>
      </section>
    </div>
  )
}
