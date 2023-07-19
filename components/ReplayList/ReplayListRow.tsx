import { Replay, EngineVersion, Color } from '@ivy-chess/model'
import ListAction from '../List/ListAction'
import ListActions from '../List/ListActions'
import ListRow from '../List/ListRow'

interface Props {
  replay: Replay
}

function formatEngine(name: string, version: EngineVersion) {
  return `${name} ${version.major}.${version.minor}.${version.patch}`
}

function formatWinner(winner: Color | 'draw') {
  if (winner === 'draw') {
    return '1 : 1'
  } else if (winner === 'white') {
    return '2 : 0'
  } else {
    return '0 : 2'
  }
}

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
