import { HTMLInputTypeAttribute } from 'react'

interface Props {
  placeholder: string
  type: HTMLInputTypeAttribute
  autocheck?: boolean
  required?: boolean
  pattern?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string | number
}

export default function TextInput(props: Props) {
  return (
    <input
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      type={props.type}
      className="form-input w-full rounded-lg border-2 border-gray-300 bg-primary text-base invalid:border-action-invalid focus:border-action-primary-active focus:ring-0"
      autoCorrect={props.autocheck ? 'on' : 'off'}
      autoComplete={props.autocheck ? 'on' : 'off'}
      autoCapitalize={props.autocheck ? 'on' : 'off'}
      spellCheck={props.autocheck ? 'true' : 'false'}
      placeholder={props.placeholder}
      required={props.required}
      pattern={props.pattern}
    />
  )
}
