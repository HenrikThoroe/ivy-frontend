import { TestSuite } from '@/lib/data/Test'
import EnginesCard from './EnginesCard'
import TestSuiteMeta from './TestSuiteMeta'

interface Props {
  suite: TestSuite
}

export default function TestSuiteInfo(props: Props) {
  const { suite } = props

  return (
    <div className="flex flex-col gap-y-12 py-4">
      <h1 className="text-2xl font-bold text-on-primary">{suite.name}</h1>
      <TestSuiteMeta suite={suite} />
      <EnginesCard engine1={suite.engines[0]} engine2={suite.engines[1]} />
    </div>
  )
}
