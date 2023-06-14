interface Props<T extends string> {
  options: Option<T>[]
  onSelect?: (value: T) => void
  defaultValue?: T
}

export interface Option<T extends string> {
  value: T
  label: string
}

export default function SelectInput<T extends string>(props: Props<T>) {
  return (
    <select
      onChange={(e) => props.onSelect && props.onSelect(e.target.value as T)}
      className="form-input w-full rounded-lg border-2 border-gray-300 bg-primary text-base focus:border-action-primary-active focus:ring-0"
    >
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.value === props.defaultValue}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
