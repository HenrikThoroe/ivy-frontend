import CreateSessionForm from '@/components/(form)/CreateSessionForm/CreateSessionForm'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Add Test Session',
  description: 'Add a new test session',
}

export default async function CreateSession() {
  const client = new TestSuiteClient(serverStrategy())
  const ids = await client.unsafeSuites()
  const suites = await Promise.all(ids.map((id) => client.unsafeSuite(id)))

  return <CreateSessionForm suites={suites} />
}
