import { Replay } from '@ivy-chess/model'
import List from '../List/List'
import ReplayListRow from './ReplayListRow'
import ReplayListTools from './ReplayListTools'

interface Props {
  /**
   * The list of replays to display.
   *
   * @see {@link Replay}
   */
  replays: Replay[]
}

/**
 * A {@link List list} of {@link Replay replays}.
 *
 * Replays are displayed in a table with the following columns:
 *  - Date
 *  - Contestants
 *  - Result
 *
 * Replays can be filtered by various metrics using a popover menu.
 * Each replay can be viewed in detail by clicking the "View" button.
 */
export default function ReplayList(props: Props) {
  return (
    <List
      variant="custom-4"
      head={['Date', 'Contestants', 'Result', <ReplayListTools key="replay-list-tools" />]}
    >
      {props.replays.map((replay) => (
        <ReplayListRow replay={replay} key={`replay-row-${replay.id}`} />
      ))}
    </List>
  )
}
