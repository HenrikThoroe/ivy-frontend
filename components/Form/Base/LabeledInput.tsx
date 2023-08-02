interface Props {
  label: string
  children: React.ReactNode
  required?: boolean
}

export default function LabeledInput(props: Props) {
  return (
    <div className="flex w-full flex-col items-baseline gap-3 text-on-primary ">
      <div className="flex flex-row gap-1">
        <span className="text-base font-medium">{props.label}</span>
        {props.required && <span className="text-action-invalid">*</span>}
      </div>
      <div className="w-full pl-2">{props.children}</div>
    </div>
  )
}
