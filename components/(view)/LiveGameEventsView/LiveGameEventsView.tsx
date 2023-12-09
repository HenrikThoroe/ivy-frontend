import { LiveGameEvent } from '@ivy-chess/model'
import classNames from 'classnames'

interface Props {
  /**
   * The list of events to display.
   */
  events: LiveGameEvent[]
}

/**
 * A list-like vertical view of events of a live game.
 * Each event is displayed in its own row.
 */
export default function LiveGameEventsView(props: Props) {
  const { events } = props
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  //* UI

  const EventView = (event: LiveGameEvent) => (
    <div className="flex flex-row items-center justify-between gap-4 rounded-full px-6 py-4 odd:bg-primary-accent">
      <span
        className={classNames('w-40 font-mono text-base font-medium', {
          'text-red-700': event.type === 'disconnect',
          'text-green-700': event.type === 'connect',
          'text-yellow-700': event.type === 'message',
          'text-purple-700': event.type === 'create',
        })}
      >
        @{event.type}
      </span>
      <span className="w-full font-mono text-base">{event.message}</span>
      <span className="w-28 break-keep text-sm font-medium">
        {dateFormatter.format(event.timestamp)}
      </span>
    </div>
  )

  //* Render

  return (
    <section className="flex flex-col gap-4">
      {events.map((event, idx) => (
        <EventView {...event} key={`event-${idx}`} />
      ))}
    </section>
  )
}
