interface Props {
  children: React.ReactNode
}

export default function ListActions(props: Props) {
  return (
    <div className="flex flex-row items-center justify-center gap-0 px-4">{props.children}</div>
  )
}
