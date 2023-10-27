import { TestSuite } from '@ivy-chess/model'
import EngineTestConfigCard from '../../(card)/EngineTestConfigCard/EngineTestConfigCard'

interface Props {
  /**
   * The test suite to display.
   */
  suite: TestSuite
}

/**
 * A view to show information about a test suite.
 */
export default function TestSuiteView(props: Props) {
  const { suite } = props
  const formatter = Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    notation: 'compact',
  })

  //* UI

  const Entry = ({ label, value }: { label: string; value: string }) => (
    <div className="flex w-full flex-row gap-x-2">
      <span className="w-40 text-base text-on-primary-light">{label}</span>
      <span className="text-base font-medium text-on-primary">{value}</span>
    </div>
  )

  //* Render

  return (
    <article className="flex flex-col gap-20 p-12">
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold text-on-primary-light">Test Case</h2>
        <div className="flex w-full flex-col gap-4">
          <Entry label="Name" value={suite.name} />
          <Entry label="ID" value={suite.id} />
          <Entry label="Iterations" value={formatter.format(suite.iterations)} />
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold text-on-primary-light">Competing Engines</h2>
        <div className="flex w-full flex-row items-center justify-start gap-10">
          <EngineTestConfigCard engine={suite.engines[0]} />
          <EngineTestConfigCard engine={suite.engines[1]} />
        </div>
      </section>
    </article>
  )
}
