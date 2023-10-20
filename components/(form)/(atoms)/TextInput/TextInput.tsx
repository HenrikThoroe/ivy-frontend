'use client'

import Icon from '@/components/Icon/Icon'
import classNames from 'classnames'
import { HTMLInputTypeAttribute, useRef } from 'react'

interface Props {
  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Input type
   */
  type: HTMLInputTypeAttribute

  /**
   * If `true`, spellcheck, autocomplete, autocorrect, and autocapitalize will be enabled
   */
  autocheck?: boolean

  /**
   * Whether the field is required
   */
  required?: boolean

  /**
   * Pattern to validate against
   */
  pattern?: string

  /**
   * On change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

  /**
   * Default value of the input
   */
  defaultValue?: string | number

  /**
   * If `true`, a clear button will be shown.
   * The clear action will be handled like changing
   * the value to an empty string and forwarded to the
   * `onChange` handler.
   */
  clear?: boolean
}

/**
 * A styled text input field.
 */
export default function TextInput(props: Props) {
  const ref = useRef<HTMLInputElement | null>(null)

  //* Event Handler

  const handleClear = () => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    const event = new Event('input', { bubbles: true })
    const input = ref.current

    if (input && setter) {
      setter.call(input, '')
      input.dispatchEvent(event)
    }
  }

  //* UI

  const ClearButton = () => (
    <button
      className="absolute right-3 text-action-destructive hover:text-action-destructive-active"
      onClick={handleClear}
    >
      <Icon name="delete" />
    </button>
  )

  //* Render

  return (
    <div className="relative flex items-center justify-center">
      <input
        ref={ref}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        type={props.type}
        className={classNames(
          'form-input w-full rounded-lg border-2 border-gray-300 bg-primary text-base',
          'invalid:border-action-invalid focus:border-action-primary-active focus:ring-0',
          {
            'pr-10': props.clear,
          }
        )}
        autoCorrect={props.autocheck ? 'on' : 'off'}
        autoComplete={props.autocheck ? 'on' : 'off'}
        autoCapitalize={props.autocheck ? 'on' : 'off'}
        spellCheck={props.autocheck ? 'true' : 'false'}
        placeholder={props.placeholder}
        required={props.required}
        pattern={props.pattern}
      />
      {props.clear && <ClearButton />}
    </div>
  )
}
