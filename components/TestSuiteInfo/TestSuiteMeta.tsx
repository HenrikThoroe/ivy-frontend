import { TestSuite } from '@ivy-chess/model'

interface Props {
  suite: TestSuite
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-row gap-x-2">
      <span className="w-40 text-base text-on-primary-light">{label}</span>
      <span className="text-base font-medium text-on-primary">{value}</span>
    </div>
  )
}

export default function TestSuiteMeta(props: Props) {
  const { suite } = props

  return (
    <div className="flex w-full flex-col gap-y-4">
      <Row label="ID" value={suite.id} />
      <Row label="Iterations" value={suite.iterations.toString()} />
    </div>
  )
}
