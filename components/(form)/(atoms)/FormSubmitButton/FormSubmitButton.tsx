import classNames from 'classnames'

interface Props {
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean

  /**
   * The button's label.
   */
  children: React.ReactNode
}

/**
 * Submit button for form components.
 * Has a default top margin.
 */
export default function FormSubmitButton(props: Props) {
  return (
    <button
      className={classNames(
        'mt-10 w-full rounded-lg bg-action-primary px-6 py-3 font-semibold tracking-wide text-on-secondary',
        'hover:bg-action-primary-active disabled:bg-gray-600'
      )}
      type="submit"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
