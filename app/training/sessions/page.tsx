import NoContent from '@/components/NoContent/NoContent'
import TestSessionsList from '@/components/TestSessionsList/TestSessionsList'
import { TestSessionClient } from '@/lib/api/clients/TestSessionClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Test Sessions',
  description: 'List of active test sessions',
}

export default async function Suites() {
  const client = new TestSessionClient()
  const sessions = await client.unsafeSessions()

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
