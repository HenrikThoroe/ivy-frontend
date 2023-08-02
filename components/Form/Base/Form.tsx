interface Props {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function Form(props: Props) {
  return (
    <form
      className="flex w-[30rem] flex-col items-center justify-center gap-10 py-8"
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  )
}
