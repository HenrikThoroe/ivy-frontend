import NoContent from '@/components/NoContent/NoContent'
import TestSessionsList from '@/components/TestSessionsList/TestSessionsList'
import { TestSession, fetchTestSessions } from '@/lib/data/Test'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Test Sessions',
  description: 'List of active test sessions',
}

export default async function Suites() {
  const sessions: TestSession[] = await fetchTestSessions()

  if (sessions.length < 1) {
    return (
      <NoContent
        title="No Sessions Available"
        message="Currently no test sessions are running. Please create a new session to start testing."
        action={{
          href: '/training/sessions/create',
          label: 'Create Session',
          icon: 'add',
        }}
      />
    )
  }

  return <TestSessionsList sessions={sessions} />
}
