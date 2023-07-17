import { UCILog, UCIMessage } from '@ivy-chess/model'
import Icon from '../Icon/Icon'

interface Props {
  log: UCILog
}

function InputLine(props: { value: string }) {
  return (
    <div className="flex flex-row items-start justify-start gap-2 font-bold text-[#8f949e]">
      <span>{'>'}</span>
      <span>{props.value}</span>
    </div>
  )
}

function OutputLine(props: { value: string }) {
  return <span className="h-min w-full overflow-visible text-[#dedfe1]">{props.value}</span>
}

function OutputGroup(props: { messages: string[]; idx: number }) {
  return (
    <div className="flex flex-col gap-3">
      <input id={`collapsible-${props.idx}`} className="peer hidden" type="checkbox" />
      <label htmlFor={`collapsible-${props.idx}`} className="group cursor-pointer">
        <div className="flex w-full flex-row justify-between gap-2">
          <OutputLine value={props.messages[0]} />
          <div className="peer-checked:group-[]:hidden">
            <Icon name="add" />
          </div>
          <div className="hidden peer-checked:group-[]:block">
            <Icon name="remove" />
          </div>
        </div>
      </label>
      <div className="max-h-0 overflow-hidden peer-checked:max-h-min">
        <div className="flex flex-col gap-3">
          {props.messages.slice(1).map((msg) => (
            <OutputLine value={msg} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LogDisplay(props: Props) {
  const group = () => {
    const groups: UCIMessage[][] = []

    for (const msg of props.log.messages) {
      if (groups.length === 0) {
        groups.push([msg])
      } else {
        const last = groups[groups.length - 1]

        if (last[0].type === msg.type && msg.type === 'recv') {
          last.push(msg)
        } else {
          groups.push([msg])
        }
      }
    }

    return groups
  }

  const buildContent = () => {
    return group().map((group, idx) => {
      if (group.length === 1 && group[0].type === 'send') {
        return <InputLine value={group[0].value} />
      } else if (group.length === 1 && group[0].type === 'recv') {
        return <OutputLine value={group[0].value} />
      } else {
        return <OutputGroup messages={group.map((msg) => msg.value)} idx={idx} />
      }
    })
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-[#1d2025] p-8 font-mono text-[#dedfe1]">
      {buildContent()}
    </div>
  )
}
