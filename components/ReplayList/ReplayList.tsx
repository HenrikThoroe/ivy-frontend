import { Replay } from '@ivy-chess/model'
import List from '../List/List'
import ReplayListRow from './ReplayListRow'
import ReplayListTools from './ReplayListTools'

interface Props {
  replays: Replay[]
}

export default function ReplayList(props: Props) {
  return (
    <List variant="custom-4" head={['Date', 'Contestants', 'Result', <ReplayListTools />]}>
      {props.replays.map((replay) => (
        <ReplayListRow replay={replay} />
      ))}
    </List>
  )
}
