import Icon from '@/components/(media)/Icon/Icon'

/**
 * A single line formatted to be identified as an input in
 * a CLI interface.
 */
export function InputLine(props: { value: string }) {
  return (
    <div className="flex flex-row items-start justify-start gap-2 font-bold text-[#8f949e]">
      <span>{'>'}</span>
      <span>{props.value}</span>
    </div>
  )
}

/**
 * A single line formatted to be identified as an output in
 * a CLI interface.
 */
export function OutputLine(props: { value: string }) {
  return <span className="h-min w-full overflow-visible text-[#dedfe1]">{props.value}</span>
}

/**
 * A group of output lines that can be collapsed and expanded.
 *
 * Collapsed by default.
 */
export function OutputGroup(props: { messages: string[]; idx: number }) {
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
          {props.messages.slice(1).map((msg, idx) => (
            <OutputLine key={`output-group-line-${idx}`} value={msg} />
          ))}
        </div>
      </div>
    </div>
  )
}
