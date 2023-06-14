interface Props {
  disabled?: boolean
  children: React.ReactNode
}

export default function FormSubmitButton(props: Props) {
  return (
    <button
      className="mt-10 w-full rounded-full bg-action-primary px-6 py-3 font-semibold text-on-secondary hover:bg-action-primary-active disabled:bg-gray-600"
      type="submit"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
