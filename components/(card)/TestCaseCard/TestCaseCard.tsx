import classNames from 'classnames'

interface Props {
  /**
   * Number of test suites available.
   */
  suites: number
}

/**
 * An interactive card that refers to the test case list and
 * displays the number of available test cases.
 */
export default function TestCaseCard({ suites }: Props) {
  return (
    <section
      className={classNames(
        'flex w-max max-w-full cursor-pointer flex-row items-center justify-center gap-8 rounded-md p-16 shadow-card',
        'hover:border hover:border-primary-accent-border hover:shadow-none'
      )}
    >
      <div className="flex w-max flex-col items-center justify-center gap-4">
        <span className="text-xl font-bold text-on-primary-light">Test Cases</span>
        <span className="bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text text-5xl font-extrabold text-transparent">
          {suites}
        </span>
      </div>
      <div>
        <p className="max-w-sm font-medium text-on-primary">
          The place where you can find all available test cases, that define test scenarios to train
          engines. To execute a test case, create and run a test session.
        </p>
      </div>
    </section>
  )
}
