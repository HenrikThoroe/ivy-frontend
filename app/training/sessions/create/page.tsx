import CreateSessionForm from '@/components/CreateSessionForm/CreateSessionForm'
import { fetchTestSuite, fetchTestSuites } from '@/lib/data/Test'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Create Test Session',
  description: 'Create a new test session',
}

export default async function CreateSession() {
  const ids = await fetchTestSuites()
  const suites = await Promise.all(ids.map((id) => fetchTestSuite(id)))

  return <CreateSessionForm suites={suites} />
}
