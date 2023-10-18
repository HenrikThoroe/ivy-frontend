import TextCard from '@/components/Card/Text'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Training',
  description: 'Overview of training tools',
}

export default async function Training() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 py-10 lg:flex-row">
      <TextCard
        icon="assignment"
        title="Test Suites"
        description="The place where you can find all available test suites, that define test scenarios to train engines. To execute a test suite, create and run a test session."
        href="/training/suites"
      />
      <TextCard
        icon="play"
        title="Test Sessions"
        description="The place where you can find all available test sessions and create new ones. Test sessions play games between your engines to collect data or train them. Sessions select a bunch of the connected clients to run the selected engines. You can choose one of your test suites to define which engine to use and the desired time control."
        href="/training/sessions"
      />
    </div>
  )
}
