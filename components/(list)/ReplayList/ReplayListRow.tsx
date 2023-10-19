import { Replay } from '@ivy-chess/model'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'
import { formatEngine, formatWinner } from './format'

interface Props {
  /**
   * The replay to display.
   */
  replay: Replay
}

/**
 * The {@link ListRow row} for a {@link Replay replay}.
 */
export default function ReplayListRow(props: Props) {
  const { replay } = props
  const { white, black } = replay.engines

  return (
    <ListRow variant="custom-4">
      <span>{replay.date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>
      <div className="flex flex-row gap-2">
        <span className="">{formatEngine(white.name, white.version)}</span>
        <span className="self-end align-bottom text-sm font-bold">vs.</span>
        <span className="">{formatEngine(black.name, black.version)}</span>
      </div>
      <span>{formatWinner(replay.result.winner)}</span>
      <ListActions>
        <ListAction
          variant="link"
          style="primary"
          icon="visibility"
          href={`/replays/${replay.id}`}
        />
      </ListActions>
    </ListRow>
  )
}
