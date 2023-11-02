import TestCaseCard from '@/components/(card)/TestCaseCard/TestCaseCard'
import TestSessionsList from '@/components/(list)/TestSessionsList/TestSessionsList'
import NoContentView from '@/components/(view)/NoContentView/NoContentView'
import { isContributor } from '@/lib/api/auth/access/roles'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { TestSessionClient } from '@/lib/api/clients/TestSessionClient'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ivy - Training',
  description: 'Overview of training tools',
}

export default async function Training() {
  const sessionClient = new TestSessionClient(serverStrategy())
  const suitesClient = new TestSuiteClient(serverStrategy())
  const suites = await suitesClient.unsafeSuites()
  const sessions = await sessionClient.unsafeSessions()
  const editor = await isContributor(serverStrategy())

  //* UI

  const SessionPlaceholder = () => (
    <NoContentView
      title="No Sessions Available"
      message="Currently no test sessions are running. Please create a new session to start testing."
      action={{
        href: '/training/add',
        label: 'Create Session',
        icon: 'add',
      }}
    />
  )

  //* Render

  return (
    <div className="flex flex-col">
      <section className="flex min-h-[30rem] w-full flex-row items-center justify-center py-10">
        <Link href="/training/suites">
          <TestCaseCard suites={suites.length} />
        </Link>
      </section>

      {editor && (
        <section>
          {sessions.length > 0 ? <TestSessionsList sessions={sessions} /> : <SessionPlaceholder />}
        </section>
      )}
    </div>
  )
}
