import { UCILog } from '@ivy-chess/model'
import { InputLine, OutputGroup, OutputLine } from './Content'
import { groupLogMessages } from './group'

interface Props {
  /**
   * The log to display.
   */
  logs: UCILog
}

/**
 * A view for displaying UCI logs.
 *
 * Has a maximum height of `40rem` or `80vh`.
 * Consecutive output lines are grouped together and are collapsible for
 * better readability.
 */
export default function LogView(props: Props) {
  return (
    <section className="scrollbar flex h-[40rem] max-h-[80vh] flex-col gap-3 overflow-y-scroll rounded-lg bg-[#1d2025] p-8 font-mono text-[#dedfe1]">
      {groupLogMessages(props.logs).map((group, idx) => {
        if (group.length === 1 && group[0].type === 'send') {
          return <InputLine value={group[0].value} />
        } else if (group.length === 1 && group[0].type === 'recv') {
          return <OutputLine value={group[0].value} />
        } else {
          return <OutputGroup messages={group.map((msg) => msg.value)} idx={idx} />
        }
      })}
    </section>
  )
}
