interface Props {
  label: string
}

export default function FormSeparator(props: Props) {
  return (
    <span className="w-full border-b-2 border-on-primary-light pb-3 pt-5 text-base text-on-primary-light">
      {props.label}
    </span>
  )
}
