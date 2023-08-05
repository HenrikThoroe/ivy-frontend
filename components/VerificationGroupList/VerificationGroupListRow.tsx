import { EngineInstance, VerificationGroup } from '@ivy-chess/model'
import ListRow from '../List/ListRow'
import ListActions from '../List/ListActions'
import ListAction from '../List/ListAction'

interface Props {
  group: VerificationGroup
}

function formatEngine(engine: EngineInstance) {
  return `${engine.name} ${engine.version.major}.${engine.version.minor}.${engine.version.patch}`
}

export default function VerificationGroupListRow(props: Props) {
  return (
    <ListRow variant="custom-5">
      <span>{props.group.name}</span>
      <span>{formatEngine(props.group.base)}</span>
      <ListActions>
        <ListAction icon="delete" variant="action" style="danger" />
        <ListAction
          icon="visibility"
          variant="link"
          style="primary"
          href={`/stats/compare/${props.group.id}`}
        />
      </ListActions>
    </ListRow>
  )
}
